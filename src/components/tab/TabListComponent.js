import React, { Component } from 'react'
import './TabListComponent.css'
import TabListItemComponent from './TabListItemComponent';
import { getTabsRequest } from '../../api/tab-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';
import NavComponent from '../common/NavComponent';
import FooterComponent from '../common/FooterComponent';

class TabListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tabs: []
        };
        this.deleteTab = this.deleteTab.bind();
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

    deleteTab(id) {
        let index = this.state.tabs.findIndex(el => el.id === id);
        if (index !== -1) {
            this.state.tabs.splice(index, 1);
            this.forceUpdate()
        }
    }

    render() {
        return (
            <div className='PageContainer'>
                <NavComponent App={this.props.App} history={this.props.history}/>
                {
                    this.state.loading ?
                        <LoadingComponent />
                        : this.state.error ? <ErrorComponent text={this.state.error} /> :
                            <div>
                                <h1 className='ListTitle'>Tabs:</h1>
                                <div className='ItemListContainer'>
                                    <ul className='ItemList'>
                                        {this.state.tabs.map(tab =>
                                            <li key={tab.id} className='ListItemContainer'>
                                                <TabListItemComponent tab={tab} App={this.props.App} history={this.props.history} delete={this.deleteTab} />
                                                <hr className='ListSeparator' />
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                }
                <FooterComponent />
            </div>
        )

    }
}

export default TabListComponent;