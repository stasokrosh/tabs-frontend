import React, { Component } from 'react'
import './InfoPanelComponent.css'

class InfoPanelComponent extends Component {
    render() {
        return (
            <div className='InfoPanel'>
                <input className='CompositionName' value='Test composition'></input>
                <div className='CompositionInfo'>
                    <button className='CompositionFavourite'>Favourite</button>
                    <button className='CompositionGroup'>Group</button>
                    <button className='CompositionCreator'>Creator</button>
                </div>
            </div>
        )
    }
}

export default InfoPanelComponent;
