import React from 'react'
import './UserListItemComponent.css'

function UserListItemComponent(props) {
    return (
        <div className = 'UserListItem'>
            <button className = 'UserListItemName'>{props.user.name}</button>
            <div className = 'UserListItemInfo'>
                <button className = 'UserListItemTabs'>{props.user.tabsCount}</button>
            </div>
        </div>
    )
}

export default UserListItemComponent;