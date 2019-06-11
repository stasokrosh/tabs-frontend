import React, { Component } from 'react'
import './InfoPanelComponent.css'
import FavouriteButtonComponent from '../../common/FavouriteButtonComponent';
import { Link } from 'react-router-dom'
import { getSingleGroupPath, NavigateSignIn, getSingleUserPath, getRightsUsersPath } from '../../../util/navigation';

class InfoPanelComponent extends Component {
    constructor(props) {
        super(props);
        this.favouriteButtonClick = this.favouriteButtonClick.bind(this);
        this.changeTabName = this.changeTabName.bind(this);
        this.submitNameChange = this.submitNameChange.bind(this);
        this.state = {
            name: props.editor.tab.name
        }
        props.editor.addEventListener(this);
    }

    async favouriteButtonClick(checked, id) {
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

    get hasEditRights() {
        return this.props.App.auth.hasEditRights(this.props.editor.tab);
    }

    changeTabName(e) {
        if (this.hasEditRights) {
            this.props.editor.name = e.target.value;
            this.props.editor.redraw();
            this.forceUpdate();
        }
    }

    async submitNameChange() {
        if (this.hasEditRights) {
            if (!this.props.editor.name) {
                this.props.editor.name = this.state.name;
                this.props.editor.redraw();
                this.forceUpdate();
            } else {
                await this.props.editor.provider.updateTabRequest({
                    id: this.props.editor.tab.id,
                    name: this.props.editor.name
                })
                this.setState({ name: this.props.editor.tab.name });
            }
        }
    }

    invokeEvent(event) {
        this.forceUpdate();
    }

    render() {
        let tab = this.props.editor.tab;
        let auth = this.props.App.auth;
        let isCreator = auth.isCreator(tab);
        return (
            <div className='InfoPanel'>
                <div className='CompositionInfo'>
                    <input className='CompositionName' value={this.props.editor.name} onChange={this.changeTabName}
                        onBlur={this.submitNameChange} />
                </div>
                {!isCreator && !auth.isAdmin &&
                    <FavouriteButtonComponent checked={auth.isTabFavourite(tab.id)} id={tab.id} onClick={this.favouriteButtonClick} />
                }
                {tab.group && <Link to={getSingleGroupPath(tab.group)}>{tab.group}</Link>}
                {!isCreator &&
                    <Link to={getSingleUserPath(tab.creator)}>{tab.creator}</Link>
                }
                {isCreator &&
                    <Link to={getRightsUsersPath(tab.id)}>Users</Link>
                }
            </div>
        )
    }
}

export default InfoPanelComponent;
