import React from 'react'
import './UserListItemComponent.css'

function GroupListItemComponent(props) {
    return (
        <div className = 'UserListItem'>
            <button className = 'UserListItemName'>{props.user.name}</button>
            <div className = 'UserListItemInfo'>
                <button className = 'UserListItemTabs'>{props.user.tabsCount}</button>
            </div>
        </div>
    )
}

export default GroupListItemComponent;