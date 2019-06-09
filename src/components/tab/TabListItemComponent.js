import React, { Component } from 'react'
import './TabListItemComponent.css'
import { NavigateSignIn, getSingleTabPath, getSingleGroupPath, getSingleUserPath } from '../../util/navigation';
import FavouriteButtonComponent from '../common/FavouriteButtonComponent';
import { Link } from 'react-router-dom'
import { removeTabRequest } from '../../api/tab-api';

class TabListItemComponent extends Component {
    constructor(props) {
        super(props);
        this.handleFavouriteClick = this.handleFavouriteClick.bind(this);
        this.deleteTab = this.deleteTab.bind(this);
    }

    async handleFavouriteClick(checked, id) {
        let auth = this.props.App.auth;
        if (auth.isAuthorised) {
            if (checked)
                await auth.removeFavourite(id);
            else
                await auth.addFavourite(id);
            this.forceUpdate();
        } else {
            NavigateSignIn(this.props.history);
        }
    }

    async deleteTab() {
        await removeTabRequest(this.props.tab.id, this.props.App.auth.token);
        if (this.props.delete)
            this.props.delete(this.props.tab.id);
    }

    render() {
        let auth = this.props.App.auth;
        let tab = this.props.tab;
        let isCreator = auth.isCreator(tab);
        return (
            <div className='ListItem'>
                {
                    (isCreator || auth.isAdmin) ? <button className='Cancel' onClick={this.deleteTab}>Delete</button>
                        : <FavouriteButtonComponent checked={auth.isTabFavourite(tab.id)} onClick={this.handleFavouriteClick} id={tab.id} />
                }
                <Link className='TabListItemName' to={getSingleTabPath(tab.id)}>{tab.name}</Link>
                {this.props.tab.group && <Link className='TabListItemGroup' to={getSingleGroupPath(tab.group)}>{tab.group}</Link>}
                <Link className='TabListItemCreator' to={getSingleUserPath(tab.creator)}>{tab.creator}</Link>
            </div>
        )
    }
}

export default TabListItemComponent;