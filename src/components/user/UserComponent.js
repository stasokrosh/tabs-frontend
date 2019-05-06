import React, { Component } from 'react'
import './UserComponent.css'
import PageContainerComponent from '../common/PageContainerComponent';
import TabListItemComponent from '../tab/TabListItemComponent';
import GroupListItemComponent from '../group/GroupListItemComponent';

const USER_LISTS = {
    TAB: "TAB",
    GROUP: "GROUP"
}

class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'test user',
                tabs: [
                    { name: 'Test tab', favouritesCount: 2, group: 'Test group', creator: 'Test creator' },
                    { name: 'Test tab', favouritesCount: 2, group: 'Test group', creator: 'Test creator' },
                    { name: 'Test tab', favouritesCount: 2, group: 'Test group', creator: 'Test creator' }
                ],
                groups: [
                    { name: 'Test group', usersCount: 2, creator: 'Test creator' }
                ],
                favouritesCount: 2,
                groupsCount: 2
            },
            selectedList: USER_LISTS.GROUP
        }
    }

    render() {
        return (
            <PageContainerComponent>
                <div className='UserInfo'>
                    <p>{this.state.user.name}</p>
                </div>
                <div className='UserLinksContainer'>
                    <div className='UserLinks'>
                        <button className='UserLinkItem'>{this.state.user.favouritesCount}<br />Favourites</button>
                        <button className='UserLinkItem'>{this.state.user.groupsCount}<br />Groups</button>
                    </div>
                </div>
                <div className='UserListsHeader'>
                    <button>Created Tabs {this.state.user.tabs.length}</button>
                    <button>Created Groups {this.state.user.groups.length}</button>
                </div>
                <ul className='UserList'>
                {
                    this.state.selectedList === USER_LISTS.TAB ?
                    (
                        
                            this.state.user.tabs.map(tab => 
                            <li className='UserListItemContainer'><TabListItemComponent tab={tab} /></li>)
                    )
                    :
                    (
                            this.state.user.groups.map(group => 
                            <li className='UserListItemContainer'><GroupListItemComponent group={group}/></li>)
                    )
                }
                </ul>
            </PageContainerComponent>
        )
    }
}

export default UserComponent;