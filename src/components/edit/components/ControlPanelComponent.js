import React, { Component } from 'react'
import './ControlPanelComponent.css'
import { getPublicImageUrl } from '../../../util';

class ControlPanelComponent extends Component {
    render() {
        return (
            <div className='ControlPanel'>
                <div className='ControlPanelInner'>
                    <button><img className='ControlButtonImage Track' src={getPublicImageUrl('prev.png')} alt='' /></button>
                    <button><img className='ControlButtonImage' src={getPublicImageUrl('play.png')} alt='' /></button>
                    <button><img className='ControlButtonImage Track' src={getPublicImageUrl('next.png')} alt='' /></button>
                </div>
            </div>
        )
    }
}

export default ControlPanelComponent;