import React, { Component } from 'react'
import './TabListComponent.css'
import TabListItemComponent from './TabListItemComponent';
import { getTabsRequest } from '../../api/tab-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';

class TabListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tabs: []
        };
    }

    async componentDidMount() {
        let state = { loading: false };
        let res = await getTabsRequest(this.props.App.auth.token);
        if (res.success) {
            state.tabs = res.body;
        } else {
            state.error = res.message;
        }
        this.setState(state);
    }

    render() {
        if (this.state.loading)
            return <LoadingComponent />
        else if (this.state.error)
            return <ErrorComponent text={this.state.error} />
        else 
            return (
            <div className='PageContainer'>
                <ul className='TabList'>
                    {this.state.tabs.map(tab =>
                        <li key={tab.id}><TabListItemComponent tab={tab} App={this.props.App} history={this.props.history} /></li>
                    )}
                </ul>
            </div>
        )
    }
}

export default TabListComponent;