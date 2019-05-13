import React, { Component } from 'react'
import './UserInfoComponent.css'
import TabListItemComponent from '../tab/TabListItemComponent';
import GroupListItemComponent from '../group/GroupListItemComponent';
import { getUserRequest } from '../../api/user-api';
import ErrorComponent from '../common/ErrorComponent';
import LoadingComponent from '../common/LoadingComponent';
import { getTabsByUserRequest, postTabRequest } from '../../api/tab-api';
import { getGroupsByUserRequest, postGroupRequest } from '../../api/group-api';
import TabCreateComponent from '../tab/TabCreateComponent';
import GroupCreateComponent from '../group/GroupCreateComponent';
import ImageDropComponent from '../common/ImageDropComponent';
import ImageComponent from '../common/ImageComponent';
import NavComponent from '../common/NavComponent';

const USER_LISTS = {
    TAB: "TAB",
    GROUP: "GROUP"
}

class UserInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
            tabs: [],
            groups: [],
            selectedList: USER_LISTS.TAB
        }
        this.switchList = this.switchList.bind(this);
        this.createTab = this.createTab.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.imageChanged = this.imageChanged.bind(this);
        this.createButton = this.createButton.bind(this);
        this.cancelCreate = this.cancelCreate.bind(this);
    }

    async componentDidMount() {
        await this.reload();
    }

    async componentWillReceiveProps(props) {
        let name = props.match.params.name;
        let user = this.state.user;
        if (user.name && user.name !== name)
            await this.reload();
    }

    async reload() {
        let name = this.props.match.params.name;
        let token = this.props.App.auth.token;
        let state = { creating: false };
        state.loading = false;
        let res = await getUserRequest(name, token);
        if (!res.success) {
            this.setState({ error: res.message });
            return;
        }
        state.user = res.body;
        res = await getTabsByUserRequest(name, token);
        if (!res.success) {
            this.setState({ error: res.message });
            return;
        }
        state.tabs = res.body;
        res = await getGroupsByUserRequest(name, token);
        if (!res.success) {
            this.setState({ error: res.message });
            return;
        }
        state.groups = res.body;
        this.setState(state);
    }

    switchList(list) {
        let state = this.state;
        state.selectedList = list;
        this.setState(state);
    }

    selfAccount() {
        return this.props.App.auth.isAuthorised && this.props.App.auth.user.name === this.props.match.params.name;
    }

    createButton() {
        this.setState({ creating: true });
    }

    cancelCreate() {
        this.setState({ creating: false });
    }

    async createTab(tab) {
        await postTabRequest(tab, this.props.App.auth.token);
        await this.reload();
    }

    async createGroup(group) {
        await postGroupRequest(group, this.props.App.auth.token);
        await this.reload();
    }

    deleteTab(id) {
        let index = this.state.tabs.findIndex(el => el.id === id);
        if (index !== -1) {
            this.state.tabs.splice(index, 1);
            this.forceUpdate()
        }
    }

    deleteGroup(name) {
        let index = this.state.groups.findIndex(el => el.name === name);
        if (index !== -1) {
            this.state.groups.splice(index, 1);
            this.forceUpdate()
        }
    }

    async imageChanged(res) {
        await this.props.App.auth.changeImage(res.public_id);
        await this.reload();
    }

    render() {
        let user = this.state.user;
        let tabs = this.state.tabs;
        let groups = this.state.groups;

        if (this.state.loading)
            return <LoadingComponent />
        else if (this.state.error)
            return <ErrorComponent text={this.state.error} />
        else
            return (
                <div className='PageContainer'>
                    <NavComponent App={this.props.App} />
                    <div className='UserInfoContainer'>
                        <div className='UserImageContainer'>
                            <div className='UserImage'>
                                {
                                    this.selfAccount() ? <ImageDropComponent id={user.image} folder='users' imageChanged={this.imageChanged} />
                                        : <ImageComponent id={user.image} />
                                }
                            </div>
                        </div>
                        <div className="UserInfo">
                            <h3 className='UserInfoName'>{this.state.user.name}</h3>
                            <div className='UserLinksContainer'>
                                <div className='UserLinks'>
                                    <button className='UserLinkItem'>{user.favouriteTabs.length}<br />Favourites</button>
                                    <button className='UserLinkItem'>{user.groups.length}<br />Groups</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='UserListsHeader'>
                        <button onClick={() => { this.switchList(USER_LISTS.TAB) }}>Created Tabs {tabs.length}</button>
                        <button onClick={() => { this.switchList(USER_LISTS.GROUP) }}>Created Groups {groups.length}</button>
                        {this.selfAccount() && !this.state.creating && <button onClick={this.createButton}>Create</button>}
                    </div>
                    <ul className='ItemList'>
                        {this.selfAccount() && this.state.creating && (this.state.selectedList === USER_LISTS.TAB ?
                            (
                                <li className='ListItemContainer'>
                                    <TabCreateComponent createTab={this.createTab} cancel={this.cancelCreate} />
                                </li>
                            ) : (
                                <li className='ListItemContainer'>
                                    <GroupCreateComponent createGroup={this.createGroup} cancel={this.cancelCreate} />
                                </li>
                            ))
                        }
                        {this.state.selectedList === USER_LISTS.TAB ?
                            (
                                tabs.length > 0 ? tabs.map(tab =>
                                    <li className='ListItemContainer User'>
                                        <TabListItemComponent tab={tab} App={this.props.App} history={this.props.history} delete={this.deleteTab}/>
                                        <hr className='ListSeparator' />
                                    </li>)
                                    : <li className='ListItemContainerEmpty'>No tabs</li>
                            ) : (
                                groups.length > 0 ? groups.map(group =>
                                    <li className='ListItemContainer'>
                                        <GroupListItemComponent group={group} App={this.props.App} history={this.props.history} delete={this.deleteGroup}/>
                                        <hr className='ListSeparator' />
                                    </li>)
                                    : <li className='ListItemContainerEmpty'>No groups</li>
                            )
                        }
                    </ul>
                </div>
            )
    }
}

export default UserInfoComponent;