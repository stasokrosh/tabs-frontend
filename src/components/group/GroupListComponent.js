import React, { Component } from 'react'
import './GroupListComponent.css'
import GroupListItemComponent from './GroupListItemComponent';
import { getGroupsRequest } from '../../api/group-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';
import NavComponent from '../common/NavComponent';

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
        if (this.state.loading)
            return <LoadingComponent />
        else if (this.state.error)
            return <ErrorComponent text={this.state.error} />
        else
            return (
                <div className='PageContainer'>
                    <NavComponent App={this.props.App} />
                    <h1 className='ListTitle'>Groups:</h1>
                    <ul className='ItemList'>
                        {this.state.groups.map(group =>
                            <li key={group.name} className='ListItemContainer'>
                                <GroupListItemComponent group={group} App={this.props.App} history={this.props.history} delete={this.deleteGroup}/>
                                <hr className='ListSeparator' />
                            </li>
                        )}
                    </ul>
                </div>
            )
    }
}

export default GroupListComponent;