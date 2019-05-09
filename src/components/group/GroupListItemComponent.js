import React, { Component } from 'react'
import './GroupListItemComponent.css'
import { Link } from 'react-router-dom'
import { getSingleUserPath, NavigateSignIn } from '../../util/navigation';
import ParticipationButtonComponent from '../common/ParticipationButtonComponent';

class GroupListItemComponent extends Component {
    constructor(props) {
        super(props);
        this.handleParticipateClick = this.handleParticipateClick.bind(this);
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

    render() {
        let auth = this.props.App.auth;
        let group = this.props.group;
        return (
            <div className='GroupListItem'>
                <Link className='GroupListItemName' to={getSingleUserPath(group.name)}>{group.name}</Link>
                <div className='GroupListItemInfo'>
                    <ParticipationButtonComponent checked={auth.user && auth.user.groups.indexOf(group.name) !== -1} name={group.name} onClick={this.handleParticipateClick}/>
                    <div className='GroupListItemLinks'>
                        <Link className='GroupListItemCreator' to={getSingleUserPath(group.creator)}>{group.creator}</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupListItemComponent;