import React, { Component } from 'react'
import './GroupComponent.css'
import PageContainerComponent from '../common/PageContainerComponent';
import TabListItemComponent from '../tab/TabListItemComponent';
import UserListItemComponent from '../user/UserListItemComponent';

const GROUP_LISTS = {
    USER : 'USER',
    TAB : 'TAB'
}

class GroupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: {
                name: 'test group',
                creator: 'test creator',
                tabs: [
                    { name: 'Test tab', favouritesCount: 2, group: 'Test group', creator: 'Test creator' },
                    { name: 'Test tab', favouritesCount: 2, group: 'Test group', creator: 'Test creator' },
                    { name: 'Test tab', favouritesCount: 2, group: 'Test group', creator: 'Test creator' }
                ],
                users: [
                    { name: 'Test group' }
                ],
                selectedList: GROUP_LISTS.TAB
            }
        }
    }


    render() {
        return (
            <PageContainerComponent>
            <div className='GroupInfo'>
                <p className='GroupName'>{this.state.group.name}</p>
                <p className='GroupCreator'>{this.state.group.creator}</p>
            </div>
            <div className='GroupListsHeader'>
                    <button>Tabs {this.state.user.tabs.length}</button>
                    <button>Users {this.state.user.users.length}</button>
                </div>
                <ul className='GroupList'>
                {
                    this.state.selectedList === GROUP_LISTS.TAB ?
                    (
                        
                            this.state.group.tabs.map(tab => 
                            <li className='GroupListItemContainer'><TabListItemComponent tab={tab}/></li>)
                    )
                    :
                    (
                            this.state.group.users.map(user => 
                            <li className='GroupListItemContainer'><UserListItemComponent user={user}/></li>)
                    )
                }
                </ul>
            </PageContainerComponent>
        )
    }
}

export default GroupComponent;