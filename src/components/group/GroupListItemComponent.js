import React from 'react'
import './GroupListItemComponent.css'

function GroupListItemComponent(props) {
    return (
        <div className = 'GroupListItem'>
            <button className = 'GroupListItemName'>{props.group.name}</button>
            <div className = 'GroupListItemInfo'>
                <button className = 'GroupListItemUsers'>{props.group.usersCount}</button>
                <button className = 'GroupListItemCreator'>{props.group.creator}</button>
            </div>
        </div>
    )
}

export default GroupListItemComponent;