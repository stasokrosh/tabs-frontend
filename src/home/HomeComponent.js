import React, {Component} from 'react'
import PageContainerComponent from '../common/PageContainerComponent';
import TabListItemComponent from '../tab/TabListItemComponent';

class HomeComponent extends Component {
    render() {
        return (
            <PageContainerComponent>
                <TabListItemComponent tab = {{ name : 'Test tab', favouritesCount : 2, group : 'Test group', creator : 'Test creator'}} />
            </PageContainerComponent>
        );
    }
}

export default HomeComponent;