import React, { Component } from 'react'
import './GroupInfoComponent.css'
import TabListItemComponent from '../tab/TabListItemComponent';
import UserListItemComponent from '../user/UserListItemComponent';
import { Link } from 'react-router-dom'
import { getSingleUserPath, NavigateGroupList } from '../../util/navigation';
import { getGroupRequest, updateGroupRequest, removeGroupRequest } from '../../api/group-api';
import { getTabsByGroupRequest, postTabRequest, removeTabRequest } from '../../api/tab-api';
import { getUsersByGroupRequest } from '../../api/user-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';
import TabCreateComponent from '../tab/TabCreateComponent';
import ParticipationButtonComponent from '../common/ParticipationButtonComponent';

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
    }

    switchList(list) {
        let state = this.state;
        state.selectedList = list;
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
        let state = {};
        state.loading = false;
        let res = await getGroupRequest(name, token);
        if (!res.success) {
            this.setState({ error: res.message });
            return;
        }
        state.group = res.body;
        res = await getTabsByGroupRequest(name, token);
        if (!res.success) {
            this.setState({ error: res.message });
            return;
        }
        state.tabs = res.body;
        res = await getUsersByGroupRequest(name, token);
        if (!res.success) {
            this.setState({ error: res.message });
            return;
        }
        state.users = res.body;
        this.setState(state);
    }

    async createTab(tab) {
        await postTabRequest(tab, this.props.App.auth.token);
        await this.reload();
    }

    async changeAccess() {
        await updateGroupRequest(this.state.group.name, this.props.App.auth.token, { public: !this.state.group.public });
        let group = this.state.group;
        group.public = !group.public;
        this.setState({ group });
    }

    async deleteTab(id) {
        await removeTabRequest(id, this.props.App.auth.token);
        await this.reload();
    }

    async enterGroup(checked) {
        if (checked)
            await this.props.App.auth.removeGroup(this.state.group.name);
        else
            await this.props.App.auth.removeGroup(this.state.group.name);
        this.forceUpdate();
    }

    ownGroup() {
        return this.props.App.auth.isAuthorised && this.props.App.auth.user.name === this.state.group.creator;
    }

    partOfGroup() {
        return this.props.App.auth.isAuthorised && this.props.App.auth.user.groups.indexOf(this.state.group.name) !== -1;
    }

    async deleteGroup() {
        await removeGroupRequest(this.state.group.name, this.props.App.auth.token);
        NavigateGroupList(this.props.history);
    }

    render() {
        let group = this.state.group;
        let tabs = this.state.tabs;
        let users = this.state.users;
        if (this.state.loading)
            return <LoadingComponent />
        else if (this.state.error)
            return <ErrorComponent text={this.state.error} />
        else
            return (
                <div className='PageContainer'>
                    <div className='GroupInfoContainer'>
                        <div className='GroupImageContainer'>
                            <img className='GroupImage' src={process.env.PUBLIC_URL + '/images/no-image.png'} alt='' />
                            {
                                this.ownGroup() ?
                                <button className="GroupDeleteButton" onClick={this.deleteGroup}>Delete</button>
                                : <ParticipationButtonComponent checked={this.partOfGroup()} onClick={this.enterGroup} />
                            }
                        </div>
                        <div className="GroupInfo">
                            <div className='GroupNameContainer'><p>{this.state.group.name}</p></div>
                            <table className="GroupInfoTable">
                                <tbody>
                                    <tr>
                                        <td>Creator:</td><td><Link className='GroupCreator' to={getSingleUserPath(group.creator)}>{group.creator}</Link></td>
                                    </tr>
                                    {this.ownGroup &&
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
                    <div className='GroupListsHeader'>
                        <button onClick={() => { this.switchList(GROUP_LISTS.TAB) }}>Tabs {tabs.length}</button>
                        <button onClick={() => { this.switchList(GROUP_LISTS.USER) }}>Users {users.length}</button>
                    </div>
                    <ul className='GroupList'>
                        {
                            this.ownGroup() && this.state.selectedList === GROUP_LISTS.TAB
                            && <li className='GroupListItemContainer'><TabCreateComponent createTab={this.createTab} /></li>
                        }
                        {
                            this.state.selectedList === GROUP_LISTS.TAB ?
                                (
                                    tabs.length > 0 ?
                                        tabs.map(tab =>
                                            <li className='GroupListItemContainer'>
                                                <TabListItemComponent tab={tab} App={this.props.App} history={this.props.history} />
                                                {this.ownGroup && <button className='GroupTabDeleteButton' onClick={() => this.deleteTab(tab.id)}>Delete</button>}
                                            </li>)
                                        : <li className='GroupListItemContainerEmpty'>No tabs</li>
                                )
                                :
                                (
                                    tabs.length > 0 ?
                                        users.map(user =>
                                            <li className='GroupListItemContainer'><UserListItemComponent user={user} /></li>)
                                        : <li className='GroupListItemContainerEmpty'>No users</li>
                                )
                        }
                    </ul>
                </div>
            )
    }
}

export default GroupInfoComponent;