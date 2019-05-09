import React, { Component } from 'react'
import './UserInfoComponent.css'
import TabListItemComponent from '../tab/TabListItemComponent';
import GroupListItemComponent from '../group/GroupListItemComponent';
import { getUserRequest } from '../../api/user-api';
import ErrorComponent from '../common/ErrorComponent';
import LoadingComponent from '../common/LoadingComponent';

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
            selectedList: USER_LISTS.GROUP
        }
        this.switchList = this.switchList.bind(this);
    }

    async componentDidMount() {
        let name = this.props.match.params.name;
        let token = this.props.App.auth.token;
        let state = this.state;
        state.loading = false;
        await getUserRequest(name, token);
    }

    switchList(list) {
        let state = this.state;
        state.selectedList = list;
        this.setState(state);
    }

    render() {
        if (this.state.loading)
            return <LoadingComponent/>
        else if(this.state.error) 
            return <ErrorComponent text={this.state.error}/>
        else 
            return (
                <div className='PageContainer'>
                    <div className='UserInfo'>
                        <p>{this.state.user.name}</p>
                    </div>
                    <div className='UserLinksContainer'>
                        <div className='UserLinks'>
                            <button className='UserLinkItem'>{this.state.user.favouriteTabs.length}<br />Favourites</button>
                            <button className='UserLinkItem'>{this.state.user.groups.length}<br />Groups</button>
                        </div>
                    </div>
                    <div className='UserListsHeader'>
                        <button onClick={()=>{this.switchList(USER_LISTS.TAB)}}>Created Tabs {this.state.tabs.length}</button>
                        <button onClick={()=>{this.switchList(USER_LISTS.GROUP)}}>Created Groups {this.state.groups.length}</button>
                    </div>
                    <ul className='UserList'>
                        {this.state.selectedList === USER_LISTS.TAB ?
                            (
                                this.state.tabs.map(tab =>
                                    <li className='UserListItemContainer'><TabListItemComponent tab={tab} /></li>)
                            ) : (
                                this.state.groups.map(group =>
                                    <li className='UserListItemContainer'><GroupListItemComponent group={group} /></li>)
                            )}
                    </ul>
                </div>
            )
    }
}

export default UserInfoComponent;