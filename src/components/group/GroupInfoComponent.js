import React, { Component } from 'react'
import './GroupInfoComponent.css'
import TabListItemComponent from '../tab/TabListItemComponent';
import UserListItemComponent from '../user/UserListItemComponent';
import { Link } from 'react-router-dom'
import { getSingleUserPath, NavigateGroupList, NavigateSignIn } from '../../util/navigation';
import { getGroupRequest, updateGroupRequest, removeGroupRequest } from '../../api/group-api';
import { getTabsByGroupRequest, postTabRequest } from '../../api/tab-api';
import { getUsersByGroupRequest } from '../../api/user-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';
import TabCreateComponent from '../tab/TabCreateComponent';
import ParticipationButtonComponent from '../common/ParticipationButtonComponent';
import ImageDropComponent from '../common/ImageDropComponent';
import ImageComponent from '../common/ImageComponent';
import NavComponent from '../common/NavComponent';
import FooterComponent from '../common/FooterComponent';

const GROUP_LISTS = {
    USER: 'USER',
    TAB: 'TAB'
}

class GroupInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            group: {},
            tabs: [],
            users: [],
            selectedList: GROUP_LISTS.TAB
        }
        this.switchList = this.switchList.bind(this);
        this.createTab = this.createTab.bind(this);
        this.changeAccess = this.changeAccess.bind(this);
        this.enterGroup = this.enterGroup.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.createButton = this.createButton.bind(this);
        this.cancelCreate = this.cancelCreate.bind(this);
        this.imageChanged = this.imageChanged.bind(this);
        this.deleteTab = this.deleteTab.bind(this);
    }

    switchList(list) {
        let state = this.state;
        state.selectedList = list;
        state.creating = false;
        this.setState(state);
    }

    async componentDidMount() {
        await this.reload();
    }

    async componentWillReceiveProps(props) {
        let name = props.match.params.name;
        let group = this.state.group;
        if (group.name && group.name !== name)
            await this.reload();
    }

    async reload() {
        let name = this.props.match.params.name;
        let token = this.props.App.auth.token;
        let state = { creating: false };
        state.loading = false;
        let res = await getGroupRequest(name, token);
        if (!res.success) {
            state.error = res.message;
            this.setState(state);
            return;
        }
        state.group = res.body;
        res = await getTabsByGroupRequest(name, token);
        if (!res.success) {
            state.error = res.message;
            this.setState(state);
            return;
        }
        state.tabs = res.body;
        res = await getUsersByGroupRequest(name, token);
        if (!res.success) {
            state.error = res.message;
            this.setState(state);
            return;
        }
        state.users = res.body;
        this.setState(state);
    }

    createButton() {
        this.setState({ creating: true });
    }

    cancelCreate() {
        this.setState({ creating: false });
    }

    async createTab(tab) {
        tab.group = this.state.group.name;
        await postTabRequest(tab, this.props.App.auth.token);
        await this.reload();
    }

    async changeAccess() {
        await updateGroupRequest(this.state.group.name, this.props.App.auth.token, { public: !this.state.group.public });
        let group = this.state.group;
        group.public = !group.public;
        this.setState({ group });
    }

    deleteTab(id) {
        let index = this.state.tabs.findIndex(el => el.id === id);
        if (index !== -1) {
            this.state.tabs.splice(index, 1);
            this.forceUpdate()
        }
    }

    async enterGroup(checked) {
        if (!this.props.App.auth.isAuthorised) {
            NavigateSignIn(this.props.history);
        } else {
            if (checked)
                await this.props.App.auth.removeGroup(this.state.group.name);
            else
                await this.props.App.auth.addGroup(this.state.group.name);
            this.forceUpdate();
        }
    }

    async deleteGroup() {
        await removeGroupRequest(this.state.group.name, this.props.App.auth.token);
        NavigateGroupList(this.props.history);
    }

    async imageChanged(res) {
        await updateGroupRequest(this.state.group.name, this.props.App.auth.token, { image: res.public_id });
        await this.reload();
    }

    render() {
        let group = this.state.group;
        let tabs = this.state.tabs;
        let users = this.state.users;
        let auth = this.props.App.auth;
        let isCreator = auth.isGroupCreator(group);
        return (
            <div className='PageContainer'>
                <NavComponent App={this.props.App} history={this.props.history}/>
                {
                    this.state.loading ?
                        <LoadingComponent />
                        : this.state.error ?
                            <ErrorComponent text={this.state.error} />
                            :
                            <div>
                                <div className='GroupInfoContainer'>
                                    <div className='GroupImageContainer'>
                                        <div className='GroupImage'>
                                            {
                                                isCreator ? <ImageDropComponent id={group.image} folder='users' imageChanged={this.imageChanged} />
                                                    : <ImageComponent id={group.image} />
                                            }
                                        </div>
                                        <div className='GroupImageButton'>
                                            {
                                                (isCreator || this.props.App.auth.isAdmin) ?
                                                    <button className='Cancel' onClick={this.deleteGroup}>Delete</button>
                                                    : <ParticipationButtonComponent checked={auth.isParticipateInGroup(group.name)} onClick={this.enterGroup} />
                                            }
                                        </div>
                                    </div>
                                    <div className='GroupInfo'>
                                        <h3 className='GroupInfoName'>{this.state.group.name}</h3>
                                        <div className='GroupInfoTableContainer'>
                                            <table className='GroupInfoTable'>
                                                <tbody>
                                                    <tr>
                                                        <td>Creator:</td><td><Link className='GroupCreator' to={getSingleUserPath(group.creator)}>{group.creator}</Link></td>
                                                    </tr>
                                                    {isCreator &&
                                                        <tr>
                                                            <td>Access:</td>
                                                            <td>
                                                                <button className='GroupAccessButton' onClick={this.changeAccess}>
                                                                    {this.state.group.public ? 'public' : 'private'}
                                                                </button>
                                                            </td>
                                                        </tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className='ListsHeader'>
                                    <button className={'ListHeaderItem' + ((this.state.selectedList === GROUP_LISTS.TAB) ? ' Active' : '')} onClick={() => { this.switchList(GROUP_LISTS.TAB) }}>
                                        Tabs {tabs.length}
                                    </button>
                                    <button className={'ListHeaderItem' + ((this.state.selectedList === GROUP_LISTS.USER) ? ' Active' : '')} onClick={() => { this.switchList(GROUP_LISTS.USER) }}>
                                        Users {users.length}
                                    </button>
                                    {isCreator && this.state.selectedList === GROUP_LISTS.TAB && !this.state.creating
                                        && <button className='ListHeaderItem Submit' onClick={this.createButton}>
                                            Create
                                            </button>}
                                </div>
                                <div className='ItemListContainer Group'>
                                    <ul className='ItemList'>
                                        {
                                            isCreator && this.state.selectedList === GROUP_LISTS.TAB && this.state.creating
                                            && <li className='ListItemContainer'>
                                                <TabCreateComponent createTab={this.createTab} cancel={this.cancelCreate} />
                                            </li>
                                        }
                                        {
                                            this.state.selectedList === GROUP_LISTS.TAB ?
                                                (
                                                    tabs.length > 0 ?
                                                        tabs.map(tab =>
                                                            <li className='ListItemContainer' key={tab.id}>
                                                                <TabListItemComponent tab={tab} App={this.props.App} history={this.props.history} delete={this.deleteTab} />
                                                                <hr className='ListSeparator' />
                                                            </li>)
                                                        : <li className='ListItemContainerEmpty'>No tabs</li>
                                                )
                                                :
                                                (
                                                    users.length > 0 ?
                                                        users.map(user =>
                                                            <li className='ListItemContainer' key={user.name}>
                                                                <UserListItemComponent user={user} />
                                                                <hr className='ListSeparator' />
                                                            </li>)
                                                        : <li className='ListItemContainerEmpty'>No users</li>
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

export default GroupInfoComponent;