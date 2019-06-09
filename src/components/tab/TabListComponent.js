import React, { Component } from 'react'
import './TabListComponent.css'
import TabListItemComponent from './TabListItemComponent';
import { getTabsRequest, getFavouriteTabsByUserRequest } from '../../api/tab-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';
import NavComponent from '../common/NavComponent';
import FooterComponent from '../common/FooterComponent';
import { Link } from 'react-router-dom';
import { getSingleUserPath } from '../../util/navigation';

export const TAB_LIST_TYPES = {
    FAVOURITE: 'FAVOURITE'
}

class TabListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tabs: []
        };
        this.deleteTab = this.deleteTab.bind(this);
    }

    componentDidMount() {
        this.reload(this.props);
    }

    componentWillReceiveProps(props) {
        this.reload(props);
    }

    async reload(props) {
        let state = { loading: false };
        let res = await this.getTabs(props);
        if (res.success) {
            state.tabs = res.body;
        } else {
            state.error = res.message;
        }
        this.setState(state);
    }

    async getTabs(props) {
        if (!props.type)
            return await getTabsRequest(this.props.App.auth.token);
        if (props.type === TAB_LIST_TYPES.FAVOURITE)
            return await getFavouriteTabsByUserRequest(this.props.match.params.name, this.props.App.auth.token);
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
                <NavComponent App={this.props.App} history={this.props.history} />
                {
                    this.state.loading ?
                        <LoadingComponent />
                        : this.state.error ? <ErrorComponent text={this.state.error} /> :
                            <div>
                                {!this.props.type ? <h1 className='ListTitle'>Tabs:</h1> :
                                    <h2 className='ListTitle'>Favourite tabs of <Link to={getSingleUserPath(this.props.match.params.name)}>
                                        {this.props.match.params.name}</Link>:</h2>
                                }
                                <div className='ItemListContainer'>
                                    <ul className='ItemList'>
                                        {this.state.tabs.map(tab =>
                                            <li key={tab.id} className='ListItemContainer'>
                                                <TabListItemComponent tab={tab} App={this.props.App} history={this.props.history} delete={this.deleteTab} />
                                                <hr className='ListSeparator' />
                                            </li>
                                        )}
                                        {
                                            !this.state.tabs.length && <li className='ListItemContainerEmpty'>No tabs</li>
                                        }
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