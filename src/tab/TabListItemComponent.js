import React from 'react'
import './TabListItemComponent.css'

function TabListItemComponent(props) {
    return (
        <div className = 'TabListItem'>
            <button className = 'TabListItemName'>{props.tab.name}</button>
            <div className = 'TabListItemNameInfo'>
                <button className = 'TabListItemFavourites'>{props.tab.favouritesCount}</button>
                <button className = 'TabListItemCreator'>{props.tab.creator}</button>
                <button className = 'TabListItemGroup'>{props.tab.group}</button>
            </div>
        </div>
    )
}

export default TabListItemComponent;