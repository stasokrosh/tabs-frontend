import React, { Component } from 'react'
import './GroupListComponent.css'
import PageContainerComponent from '../common/PageContainerComponent';
import GroupListItemComponent from './GroupListItemComponent';

class GroupListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [
                { name: 'Test group', usersCount: 2, creator: 'Test creator' }
            ]
        };
    }

    render() {
        return (
            <PageContainerComponent>
                <ul className='GroupList'>
                    {this.state.groups.map(group => <li><GroupListItemComponent group={group} /></li>)}
                </ul>
            </PageContainerComponent>
        )
    }
}

export default GroupListComponent;