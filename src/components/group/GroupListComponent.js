import React, { Component } from 'react'
import './GroupListComponent.css'
import GroupListItemComponent from './GroupListItemComponent';
import { getGroupsRequest } from '../../api/group-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';
import NavComponent from '../common/NavComponent';
import FooterComponent from '../common/FooterComponent';

class GroupListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            groups: []
        };
        this.deleteGroup = this.deleteGroup.bind(this);
    }

    async componentDidMount() {
        let state = { loading: false };
        let res = await getGroupsRequest(this.props.App.auth.token);
        if (res.success) {
            state.groups = res.body;
        } else {
            state.error = res.message;
        }
        this.setState(state);
    }

    deleteGroup(name) {
        let index = this.state.groups.findIndex(el => el.name === name);
        if (index !== -1) {
            this.state.groups.splice(index, 1);
            this.forceUpdate()
        }
    }

    render() {
        return (
            <div className='PageContainer'>
                <NavComponent App={this.props.App} history={this.props.history}/>
                {this.state.loading ?
                    <LoadingComponent />
                    : this.state.error ?
                        <ErrorComponent text={this.state.error} />
                        :
                        <div>
                            <h1 className='ListTitle'>Groups:</h1>
                            <div className='ItemListContainer'>
                                <div className='ItemListContainerInner'>
                                    <ul className='ItemList'>
                                        {this.state.groups.map(group =>
                                            <li key={group.name} className='ListItemContainer'>
                                                <GroupListItemComponent group={group} App={this.props.App} history={this.props.history} delete={this.deleteGroup} />
                                                <hr className='ListSeparator' />
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                }
                <FooterComponent/>
            </div>
        )

    }
}

export default GroupListComponent;