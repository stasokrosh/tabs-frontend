import React, { Component } from 'react'
import './GroupInfoComponent.css'
import TabListItemComponent from '../tab/TabListItemComponent';
import UserListItemComponent from '../user/UserListItemComponent';
import { Link } from 'react-router-dom'
import { getSingleUserPath } from '../../util/navigation';
import { getGroupRequest } from '../../api/group-api';
import { getTabsByGroupRequest } from '../../api/tab-api';
import { getUsersByGroupRequest } from '../../api/user-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';
import TabCreateComponent from '../tab/TabCreateComponent';

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
    }

    switchList(list) {
        let state = this.state;
        state.selectedList = list;
        this.setState(state);
    }

    async componentDidMount() {
        let name = this.props.match.params.name;
        let token = this.props.App.auth.token;
        await this.load(name, token);
    }

    async componentWillReceiveProps(props) {
        let name = props.match.params.name;
        let token = props.App.auth.token;
        let group = this.state.group;
        if (group.name && group.name !== name)
            await this.load(name, token);
    }

    async load(name, token) {
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

    ownGroup() {
        return this.props.App.auth.isAuthorised && this.props.App.auth.user.name === this.state.group.creator;
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
                            <button className="GroupParticipate">EnterGroup</button>
                        </div>
                        <div className="GroupInfo">
                            <table className="GroupInfoTable">
                                <tbody>
                                    <tr>
                                        <td>Name:</td><td><input className='GroupName' name='name' value={group.name} /></td>
                                    </tr>
                                    <tr>
                                        <td>Creator:</td><td><Link className='GroupCreator' to={getSingleUserPath(group.creator)}>{group.creator}</Link></td>
                                    </tr>
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
                            && <li className='GroupListItemContainer'><TabCreateComponent /></li>
                        }
                        {
                            this.state.selectedList === GROUP_LISTS.TAB ?
                                (
                                    tabs.length > 0 ?
                                        tabs.map(tab =>
                                            <li className='GroupListItemContainer'><TabListItemComponent tab={tab} App={this.props.App} history={this.props.history} /></li>)
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