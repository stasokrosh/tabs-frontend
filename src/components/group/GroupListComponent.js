import React, { Component } from 'react'
import './GroupListComponent.css'
import GroupListItemComponent from './GroupListItemComponent';
import { getGroupsRequest, getGroupsByMemberRequest } from '../../api/group-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';
import NavComponent from '../common/NavComponent';
import FooterComponent from '../common/FooterComponent';
import { Link } from 'react-router-dom';
import { getSingleUserPath } from '../../util/navigation';

export const GROUP_LIST_TYPES = {
    PARTICIPANT: 'PARTICIPANT'
}

class GroupListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            groups: []
        };
        this.deleteGroup = this.deleteGroup.bind(this);
    }

    componentDidMount() {
        this.reload(this.props);
    }

    componentWillReceiveProps(props) {
        this.reload(props);
    }

    async reload(props) {
        let state = { loading: false };
        let res = await this.getGroups(props);
        if (res.success) {
            state.groups = res.body;
        } else {
            state.error = res.message;
        }
        this.setState(state);
    }

    async getGroups(props) {
        if (!props.type)
            return await getGroupsRequest(props.App.auth.token);
        if (props.type === GROUP_LIST_TYPES.PARTICIPANT)
            return await getGroupsByMemberRequest(props.match.params.name, props.App.auth.token);
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
                <NavComponent App={this.props.App} history={this.props.history} />
                {this.state.loading ?
                    <LoadingComponent />
                    : this.state.error ?
                        <ErrorComponent text={this.state.error} />
                        :
                        <div>
                            {
                                this.props.type === GROUP_LIST_TYPES.PARTICIPANT ?
                                    <h2 className='ListTitle'>
                                        Groups, where <Link to={getSingleUserPath(this.props.match.params.name)}>{this.props.match.params.name}</Link> participate in:
                                    </h2>
                                    : <h1 className='ListTitle'>Groups:</h1>
                            }
                            <div className='ItemListContainer'>
                                <div className='ItemListContainerInner'>
                                    <ul className='ItemList'>
                                        {this.state.groups.map(group =>
                                            <li key={group.name} className='ListItemContainer'>
                                                <GroupListItemComponent group={group} App={this.props.App} history={this.props.history} delete={this.deleteGroup} />
                                                <hr className='ListSeparator' />
                                            </li>
                                        )}
                                        {!this.state.groups.length &&
                                            <li className='ListItemContainerEmpty'>
                                                No groups
                                            </li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                }
                <FooterComponent />
            </div>
        )

    }
}

export default GroupListComponent;