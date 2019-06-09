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
import FooterComponent from '../common/FooterComponent';
import {Link} from 'react-router-dom'
import { getFavouriteTabsPath, getParticipantGroupsPath } from '../../util/navigation';

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
        this.deleteTab = this.deleteTab.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
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
            state.error = res.message;
            this.setState(state);
            return;
        }
        state.user = res.body;
        res = await getTabsByUserRequest(name, token);
        if (!res.success) {
            state.error = res.message;
            this.setState(state);
            return;
        }
        state.tabs = res.body;
        res = await getGroupsByUserRequest(name, token);
        if (!res.success) {
            state.error = res.message;
            this.setState(state);
            return;
        }
        state.groups = res.body;
        this.setState(state);
    }

    switchList(list) {
        let state = this.state;
        state.selectedList = list;
        state.creating = false;
        this.setState(state);
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
        let res = await postGroupRequest(group, this.props.App.auth.token);
        if (!res.success)
            return res;
        await this.reload();
        return res;
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
        let auth = this.props.App.auth;
        let selfAccount = auth.selfAccount(user.name);
        return (
            <div className='PageContainer'>
                <NavComponent App={this.props.App} history={this.props.history} />
                {this.state.loading ?
                    <LoadingComponent />
                    : this.state.error ?
                        <ErrorComponent text={this.state.error} />
                        : <div>
                            <div className='UserInfoContainer'>
                                <div className='UserImageContainer'>
                                    <div className='UserImage'>
                                        {
                                            selfAccount ? <ImageDropComponent id={user.image} folder='users' imageChanged={this.imageChanged} />
                                                : <ImageComponent id={user.image} />
                                        }
                                    </div>
                                </div>
                                <div className="UserInfo">
                                    <h3 className='UserInfoName'>{this.state.user.name}</h3>
                                    <div className='UserLinksContainer'>
                                        <div className='UserLinks'>
                                            <Link to={getFavouriteTabsPath(user.name)}><button className='UserLinkItem'>{user.favouriteTabs.length}<br />Favourites</button></Link>
                                            <Link to={getParticipantGroupsPath(user.name)}><button className='UserLinkItem'>{user.groups.length}<br />Groups</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='ListsHeader'>
                                <button className={'ListHeaderItem' + ((this.state.selectedList === USER_LISTS.TAB) ? ' Active' : '')} onClick={() => { this.switchList(USER_LISTS.TAB) }}>
                                    Created Tabs {tabs.length}
                                </button>
                                <button className={'ListHeaderItem' + ((this.state.selectedList === USER_LISTS.GROUP) ? ' Active' : '')} onClick={() => { this.switchList(USER_LISTS.GROUP) }}>
                                    Created Groups {groups.length}
                                </button>
                                {selfAccount && !this.state.creating &&
                                    <button className='ListHeaderItem Submit' onClick={this.createButton}>Create</button>}
                            </div>
                            <div className='ItemListContainer User'>
                                <ul className='ItemList'>
                                    {selfAccount && this.state.creating && (this.state.selectedList === USER_LISTS.TAB ?
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
                                                <li className='ListItemContainer User' key={tab.id}>
                                                    <TabListItemComponent tab={tab} App={this.props.App} history={this.props.history} delete={this.deleteTab} />
                                                    <hr className='ListSeparator' />
                                                </li>)
                                                : <li className='ListItemContainerEmpty'>No tabs</li>
                                        ) : (
                                            groups.length > 0 ? groups.map(group =>
                                                <li className='ListItemContainer' key={group.name}>
                                                    <GroupListItemComponent group={group} App={this.props.App} history={this.props.history} delete={this.deleteGroup} />
                                                    <hr className='ListSeparator' />
                                                </li>)
                                                : <li className='ListItemContainerEmpty'>No groups</li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                }
                <FooterComponent />
            </div>
        )
    }
}

export default UserInfoComponent;