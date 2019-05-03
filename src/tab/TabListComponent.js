import React, { Component } from 'react'
import './TabListComponent.css'
import PageContainerComponent from '../common/PageContainerComponent';
import TabListItemComponent from './TabListItemComponent';

class TabListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                { name: 'Test tab', favouritesCount: 2, group: 'Test group', creator: 'Test creator' },
                { name: 'Test tab', favouritesCount: 2, group: 'Test group', creator: 'Test creator' },
                { name: 'Test tab', favouritesCount: 2, group: 'Test group', creator: 'Test creator' }
            ]
        };
    }

    render() {
        return (
            <PageContainerComponent>
                <ul className='TabList'>
                    {this.state.tabs.map(tab => <li><TabListItemComponent tab={tab} /></li>)}
                </ul>
            </PageContainerComponent>
        )
    }
}

export default TabListComponent;