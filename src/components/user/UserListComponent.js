import React, { Component } from 'react'
import './UserListComponent.css'
import UserListItemComponent from './UserListItemComponent';
import { getUsersRequest } from '../../api/user-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';
import NavComponent from '../common/NavComponent';
import FooterComponent from '../common/FooterComponent';
import { getTabRequest, updateTabRequest } from '../../api/tab-api';
import { Link } from 'react-router-dom'
import { getSingleTabPath } from '../../util/navigation';

export const USER_LIST_TYPES = {
    RIGHTS: "RIGHTS"
}

export const USER_TAB_RIGHTS = {
    WRITE: "write",
    READ: "read"
}

class AddRightsUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creating: false
        }
        this.addButtonClick = this.addButtonClick.bind(this);
        this.submitUserAdd = this.submitUserAdd.bind(this);
        this.changeRightsClick = this.changeRightsClick.bind(this);
        this.cancelButtonClick = this.cancelButtonClick.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
    }

    getFreeUsers() {
        return this.props.users ? this.props.users.filter(el => this.props.tab.users.findIndex(elem => elem.name === el.name) === -1
            && el.name !== this.props.tab.creator) : [];
    }

    addButtonClick() {
        this.setState({
            creating: true,
            name: this.getFreeUsers()[0].name,
            rights: USER_TAB_RIGHTS.READ
        })
    }

    async submitUserAdd() {
        await this.props.submit({ name: this.state.name, rights: this.state.rights });
        this.setState({ creating: false });
    }

    changeRightsClick() {
        let rights = "";
        if (this.state.rights === USER_TAB_RIGHTS.WRITE)
            rights = USER_TAB_RIGHTS.READ;
        else
            rights = USER_TAB_RIGHTS.WRITE;
        this.setState({ rights });
    }

    changeUserName(e) {
        this.setState({ name: e.target.value });
    }

    cancelButtonClick() {
        this.setState({
            creating: false
        })
    }

    render() {
        let freeUsers = this.getFreeUsers();
        if (freeUsers.length === 0)
            return "";
        if (this.state.creating) {
            return (
                <div className="AddUserPanel">
                    <div className="AddUserInfoPanel">
                        <select value={this.state.name} onChange={this.changeUserName}>
                            {
                                freeUsers.map(user =>
                                    <option key={user.name} value={user.name}>
                                        {user.name}
                                    </option>)
                            }
                        </select>
                        <button onClick={this.changeRightsClick}>{this.state.rights === USER_TAB_RIGHTS.WRITE ? "write" : "read"}</button>
                    </div>
                    <button className="Cancel" onClick={this.cancelButtonClick}>Cancel</button>
                    <button className="Submit" onClick={this.submitUserAdd}>Ok</button>
                </div>
            )
        } else {
            return <button onClick={this.addButtonClick}>Add</button>;
        }
    }
}

class UserListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: []
        };
        this.deleteRightsUser = this.deleteRightsUser.bind(this);
        this.changeRightsUser = this.changeRightsUser.bind(this);
        this.addRightsUser = this.addRightsUser.bind(this);
    }

    componentDidMount() {
        this.reload();
    }

    componentWillReceiveProps() {
        this.reload();
    }

    async reload() {
        let state = { loading: false };
        let res = await getUsersRequest(this.props.App.auth.token);
        if (res.success) {
            state.users = res.body;
        } else {
            state.error = res.message;
        }
        if (this.props.type === USER_LIST_TYPES.RIGHTS) {
            res = await getTabRequest(this.props.match.params.id, this.props.App.auth.token);
            if (res.success) {
                state.tab = res.body;
            } else {
                state.error = res.message;
            }
        }
        this.setState(state);
    }

    async deleteRightsUser(userName) {
        let tab = this.state.tab;
        let index = tab.users.findIndex(e => e.name === userName);
        tab.users.splice(index, 1);
        await updateTabRequest(tab.id, this.props.App.auth.token, tab);
        this.setState({ tab });
    }

    async changeRightsUser(userName, rights) {
        let tab = this.state.tab;
        let index = tab.users.findIndex(e => e.name === userName);
        tab.users[index].rights = rights === USER_TAB_RIGHTS.WRITE ? USER_TAB_RIGHTS.READ : USER_TAB_RIGHTS.WRITE;
        await updateTabRequest(tab.id, this.props.App.auth.token, tab);
        this.setState({ tab });
    }

    async addRightsUser(user) {
        let tab = this.state.tab;
        tab.users.push(user);
        await updateTabRequest(tab.id, this.props.App.auth.token, tab);
        this.setState({ tab });
    }

    render() {
        return (
            <div className='PageContainer'>
                <NavComponent App={this.props.App} history={this.props.history} />
                {
                    this.state.loading ?
                        <LoadingComponent /> :
                        this.state.error ?
                            <ErrorComponent text={this.state.error} />
                            :
                            <div>
                                {!this.props.type ?
                                    <h1 className='ListTitle'>Users:</h1>
                                    : <h2 className='ListTitle'>User rights for <Link to={getSingleTabPath(this.state.tab.id)}>{this.state.tab.name}</Link>:</h2>}
                                <div className='ItemListContainer'>
                                    <ul className='ItemList'>
                                        {this.props.type === USER_LIST_TYPES.RIGHTS ?
                                            this.state.users.map(user => {
                                                let index = this.state.tab.users.findIndex(el => el.name === user.name);
                                                if (index !== -1) {
                                                    return (<li key={user.name} className='ListItemContainer'>
                                                        <UserListItemComponent user={user} editRights={true} rights={this.state.tab.users[index].rights}
                                                            onDelete={this.deleteRightsUser} onChange={this.changeRightsUser} />
                                                        <hr className='ListSeparator' />
                                                    </li>)
                                                }
                                                return "";
                                            }) :
                                            this.state.users.map(user =>
                                                <li key={user.name} className='ListItemContainer'>
                                                    <UserListItemComponent user={user} />
                                                    <hr className='ListSeparator' />
                                                </li>)}
                                        {this.props.type === USER_LIST_TYPES.RIGHTS &&
                                            <li className='ListItemContainer'><AddRightsUserComponent users={this.state.users} tab={this.state.tab}
                                                submit={this.addRightsUser} /></li>}
                                    </ul>
                                </div>
                            </div>}
                <FooterComponent />
            </div>
        )
    }
}

export default UserListComponent;