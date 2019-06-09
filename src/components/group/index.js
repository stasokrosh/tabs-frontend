import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import * as Navigation from '../../util/navigation'
import GroupInfoComponent from './GroupInfoComponent'
import GroupListComponent, { GROUP_LIST_TYPES } from './GroupListComponent'

class GroupComponent extends Component {
    constructor(props) {
        super(props);
        props.App.update();
    }
    
    render() {
            return (
                <div>
                    <Switch>
                        <Route path={Navigation.APP_PAGES.GROUPS_SINGLE} render={(props) => <GroupInfoComponent {...props} App={this.props.App} />}></Route>
                        <Route exact path={Navigation.APP_PAGES.GROUPS} render={(props) => <GroupListComponent {...props} App={this.props.App} />}></Route>
                        <Route exact path={Navigation.APP_PAGES.GROUPS_PARTICIPANT} render={(props) => 
                        <GroupListComponent {...props} App={this.props.App} type={GROUP_LIST_TYPES.PARTICIPANT}/>}></Route>
                    </Switch>
                </div>
            )
    }
}

export default GroupComponent;