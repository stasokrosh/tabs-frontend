import React from 'react'
import './UserListItemComponent.css'
import { Link } from 'react-router-dom'
import { getSingleUserPath } from '../../util/navigation';
import ImageComponent from '../common/ImageComponent';

function UserListItemComponent(props) {
    let user = props.user;
    return (
        <div className = 'ListItem User'>
            <ImageComponent id={user.image}/>
            <Link className = 'UserListItemName' to={getSingleUserPath(user.name)}>{user.name}</Link>
        </div>
    )
}

export default UserListItemComponent;