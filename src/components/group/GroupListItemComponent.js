import React, { Component } from 'react'
import './GroupListItemComponent.css'
import { Link } from 'react-router-dom'
import { getSingleUserPath, NavigateSignIn, getSingleGroupPath } from '../../util/navigation';
import ParticipationButtonComponent from '../common/ParticipationButtonComponent';
import ImageComponent from '../common/ImageComponent';
import { removeGroupRequest } from '../../api/group-api';

class GroupListItemComponent extends Component {
    constructor(props) {
        super(props);
        this.handleParticipateClick = this.handleParticipateClick.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
    }

    async handleParticipateClick(checked, name) {
        let auth = this.props.App.auth;
        if (auth.isAuthorised) {
            if (checked)
                await auth.removeGroup(name);
            else
                await auth.addGroup(name);
            this.forceUpdate();
        } else {
            NavigateSignIn(this.props.history);
        }
    }

    async deleteGroup() {
        await removeGroupRequest(this.props.group.name, this.props.App.auth.token);
        if (this.props.delete)
            this.props.delete(this.props.group.name);
    }   

    ownGroup() {
        return this.props.App.auth.isAuthorised && this.props.group.creator === this.props.App.auth.user.name;
    }

    render() {
        let auth = this.props.App.auth;
        let group = this.props.group;
        return (
            <div className='ListItem Group'>
                <ImageComponent id={group.image} />
                <div className='GroupListItemNameContainer'>
                    <Link className='GroupListItemName' to={getSingleGroupPath(group.name)}>{group.name}</Link>
                    {
                        this.ownGroup() ? <button onClick={this.deleteGroup}>Delete</button>
                        : <ParticipationButtonComponent checked={auth.user && auth.user.groups.indexOf(group.name) !== -1} name={group.name} onClick={this.handleParticipateClick} />
                    }
                </div>
                <Link className='GroupListItemCreator' to={getSingleUserPath(group.creator)}>{group.creator}</Link>
            </div>
        )
    }
}

export default GroupListItemComponent;