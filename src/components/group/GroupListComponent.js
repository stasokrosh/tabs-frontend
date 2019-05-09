import React, { Component } from 'react'
import './GroupListComponent.css'
import GroupListItemComponent from './GroupListItemComponent';
import { getGroupsRequest } from '../../api/group-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';

class GroupListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            groups: []
        };
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

    render() {
        if (this.state.loading)
            return <LoadingComponent />
        else if (this.state.error)
            return <ErrorComponent text={this.state.error} />
        else
            return (
                <div className='PageContainer'>
                    <ul className='GroupList'>
                        {this.state.groups.map(group =>
                            <li key={group.name}><GroupListItemComponent group={group} App={this.props.App} history={this.props.history} /></li>
                        )}
                    </ul>
                </div>
            )
    }
}

export default GroupListComponent;