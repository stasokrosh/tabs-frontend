import React, { Component } from 'react'
import './InfoPanelComponent.css'
import FavouriteButtonComponent from '../../common/FavouriteButtonComponent';
import { Link } from 'react-router-dom'
import { getSingleGroupPath, NavigateSignIn, getSingleUserPath } from '../../../util/navigation';

class InfoPanelComponent extends Component {
    constructor(props) {
        super(props);
        this.favouriteButtonClick = this.favouriteButtonClick.bind(this);
        this.ownTab = this.ownTab.bind(this);
        this.changeTabName = this.changeTabName.bind(this);
        this.submitNameChange = this.submitNameChange.bind(this);
        this.state = {
            name: props.editor.tab.name
        }
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

    ownTab() {
        return this.props.App.auth.isAuthorised && this.props.editor.tab.creator === this.props.App.auth.user.name;
    }

    changeTabName(e) {
        this.props.editor.name = e.target.value;
        this.props.editor.redraw();
        this.forceUpdate();
    }

    async submitNameChange() {
        if (!this.props.editor.name) {
            this.props.editor.name = this.state.name;
            this.props.editor.redraw();
            this.forceUpdate();
        } else {
            await this.props.editor.provider.updateTabRequest({
                id: this.props.editor.tab.id,
                name : this.props.editor.name
            })
            this.setState({name : this.props.editor.tab.name});
        }
    }

    render() {
        let tab = this.props.editor.tab;
        let auth = this.props.App.auth;
        return (
            <div className='InfoPanel'>
                <div className='CompositionInfo'>
                    <input className='CompositionName' value={this.props.editor.name} onChange={this.changeTabName} onBlur={this.submitNameChange} />
                </div>
                {!this.ownTab() &&
                    <FavouriteButtonComponent checked={auth.user && auth.user.favouriteTabs.indexOf(tab.id) !== -1} id={tab.id} onClick={this.favouriteButtonClick} />
                }
                {tab.group && <Link to={getSingleGroupPath(tab.group)}>{tab.group}</Link>}
                {!this.ownTab() &&
                    <Link to={getSingleUserPath(tab.creator)}>{tab.creator}</Link>
                }
            </div>
        )
    }
}

export default InfoPanelComponent;
