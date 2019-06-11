import React from 'react'
import './UserListItemComponent.css'
import { Link } from 'react-router-dom'
import { getSingleUserPath } from '../../util/navigation';
import ImageComponent from '../common/ImageComponent';
import { USER_TAB_RIGHTS } from './UserListComponent';

function UserListItemComponent(props) {
    let user = props.user;
    return (
        <div className='ListItem User'>
            <ImageComponent id={user.image} />
            <div className="UserListItemInfo">
                <Link className='UserListItemName' to={getSingleUserPath(user.name)}>{user.name}</Link>
                {props.editRights && <button onClick={() => props.onChange(user.name, props.rights)}>
                {props.rights === USER_TAB_RIGHTS.READ ? "Read" : "Write"}
                </button>}
                {props.editRights && <button className="Cancel" onClick={() => { props.onDelete(user.name) }}>Delete</button>}
            </div>
        </div>
    )
}

export default UserListItemComponent;