import React, { Component } from 'react'
import './UserInfoComponent.css'
import TabListItemComponent from '../tab/TabListItemComponent';
import GroupListItemComponent from '../group/GroupListItemComponent';
import { getUserRequest } from '../../api/user-api';
import ErrorComponent from '../common/ErrorComponent';
import LoadingComponent from '../common/LoadingComponent';
import { getTabsByUserRequest } from '../../api/tab-api';
import { getGroupsByUserRequest } from '../../api/group-api';
import TabCreateComponent from '../tab/TabCreateComponent';
import GroupCreateComponent from '../group/GroupCreateComponent';

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
    }

    async componentDidMount() {
        let name = this.props.match.params.name;
        let token = this.props.App.auth.token;
        await this.load(name, token);
    }

    async componentWillReceiveProps(props) {
        let name = props.match.params.name;
        let token = props.App.auth.token;
        let user = this.state.user;
        if (user.name && user.name !== name)
            await this.load(name, token);
    }

    async load(name, token) {
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
                            <img className='UserImage' src={process.env.PUBLIC_URL + '/images/no-image.png'} alt='' />
                        </div>
                        <div className="UserInfo">
                            <table className="UserInfoTable">
                                <tbody>
                                    <tr>
                                        <td>Name:</td><td><input type='text' value={this.state.user.name} /></td>
                                    </tr>
                                </tbody>
                            </table>
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
                                <li className='UserListItemContainer'><TabCreateComponent/></li>
                            ) : (
                                <li className='UserListItemContainer'><GroupCreateComponent/></li>
                            ))
                        }
                        {this.state.selectedList === USER_LISTS.TAB ?
                            (
                                tabs.length > 0 ? tabs.map(tab =>
                                    <li className='UserListItemContainer'><TabListItemComponent tab={tab} App={this.props.App} history={this.props.history} /></li>)
                                    : <li className='UserListItemContainerEmpty'>No tabs</li>
                            ) : (
                                groups.length > 0 ? groups.map(group =>
                                    <li className='UserListItemContainer'><GroupListItemComponent group={group} App={this.props.App} history={this.props.history} /></li>)
                                    : <li className='UserListItemContainerEmpty'>No groups</li>
                            )
                        }
                    </ul>
                </div>
            )
    }
}

export default UserInfoComponent;