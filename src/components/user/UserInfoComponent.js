import React, { Component } from 'react'
import './UserInfoComponent.css'
import TabListItemComponent from '../tab/TabListItemComponent';
import GroupListItemComponent from '../group/GroupListItemComponent';
import { getUserRequest } from '../../api/user-api';
import ErrorComponent from '../common/ErrorComponent';
import LoadingComponent from '../common/LoadingComponent';
import { getTabsByUserRequest, postTabRequest, removeTabRequest } from '../../api/tab-api';
import { getGroupsByUserRequest, postGroupRequest, removeGroupRequest } from '../../api/group-api';
import TabCreateComponent from '../tab/TabCreateComponent';
import GroupCreateComponent from '../group/GroupCreateComponent';
import ImageDropComponent from '../common/ImageDropComponent';

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
        let state = {};
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

    async createTab(tab) {
        await postTabRequest(tab, this.props.App.auth.token);
        await this.reload();
    }

    async createGroup(group) {
        await postGroupRequest(group, this.props.App.auth.token);
        await this.reload();
    }

    async deleteTab(id) {
        await removeTabRequest(id, this.props.App.auth.token);
        await this.reload();
    }

    async deleteGroup(name) {
        await removeGroupRequest(name, this.props.App.auth.token);
        await this.reload();
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
                    <div className='UserInfoContainer'>
                        <div className='UserImageContainer'>
                            <div className='UserImage'>
                                <ImageDropComponent id={user.image} folder='users' imageChanged={this.imageChanged}/>
                            </div>
                        </div>
                        <div className="UserInfo">
                            <div className='UserNameContainer'><p>{this.state.user.name}</p></div>
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
                    </div>
                    <ul className='UserList'>
                        {this.selfAccount() && (this.state.selectedList === USER_LISTS.TAB ?
                            (
                                <li className='UserListItemContainer'><TabCreateComponent createTab={this.createTab} /></li>
                            ) : (
                                <li className='UserListItemContainer'><GroupCreateComponent createGroup={this.createGroup} /></li>
                            ))
                        }
                        {this.state.selectedList === USER_LISTS.TAB ?
                            (
                                tabs.length > 0 ? tabs.map(tab =>
                                    <li className='UserListItemContainer'>
                                        <TabListItemComponent tab={tab} App={this.props.App} history={this.props.history} />
                                        {this.selfAccount() && <button className='UserTabDeleteButton' onClick={() => this.deleteTab(tab.id)}>Delete</button>}
                                    </li>)
                                    : <li className='UserListItemContainerEmpty'>No tabs</li>
                            ) : (
                                groups.length > 0 ? groups.map(group =>
                                    <li className='UserListItemContainer'>
                                        <GroupListItemComponent group={group} App={this.props.App} history={this.props.history} />
                                        {this.selfAccount() && <button className='UserTabDeleteButton' onClick={() => this.deleteGroup(group.name)}>Delete</button>}
                                    </li>)
                                    : <li className='UserListItemContainerEmpty'>No groups</li>
                            )
                        }
                    </ul>
                </div>
            )
    }
}

export default UserInfoComponent;