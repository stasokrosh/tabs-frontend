import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import * as Navigation from '../../util/navigation'
import TabListComponent, { TAB_LIST_TYPES } from './TabListComponent'
import EditorComponent from '../edit/EditorComponent';

class TabComponent extends Component {
    constructor(props) {
        super(props);
        props.App.update();
    }
    
    render() {
            return (
                <div>
                    <Switch>
                        <Route path={Navigation.APP_PAGES.TABS_SINGLE} render={(props) => <EditorComponent {...props} App={this.props.App} />}></Route>
                        <Route exact path={Navigation.APP_PAGES.TABS} render={(props) => <TabListComponent {...props} App={this.props.App} />}></Route>
                        <Route path={Navigation.APP_PAGES.TABS_FAVOURITE} render={(props) => <TabListComponent {...props} App={this.props.App} 
                        type={TAB_LIST_TYPES.FAVOURITE}/>}></Route>
                    </Switch>
                </div>
            )
    }
}

export default TabComponent;