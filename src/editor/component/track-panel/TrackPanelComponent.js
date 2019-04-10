import React, { Component } from 'react'
import './TrackPanelComponent.css'

function TrackControlComponent(props) {
    return (
        <div className='TrackControl'>
            <input  className='TrackInput'value={props.track.name}></input>
            <button className='TrackDeleteButton'>-</button>
        </div>
    );
}

class TrackPanelComponent extends Component {
    render() {
        return (
            <div className='TrackPanel'>
                <ul className='TrackList'>
                    <li className='TrackControlContainer'><TrackControlComponent track={{ name: 'Track1' }} /></li>
                    <li className='TrackControlContainer'><TrackControlComponent track={{ name: 'Track1' }} /></li>
                    <li className='TrackControlContainer'><TrackControlComponent track={{ name: 'Track1' }} /></li>
                    <li className='TrackControlContainer'>
                        <div className='TrackControl'>
                            <button className='TrackAddButton'>+</button>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default TrackPanelComponent;