import React from 'react'
import './ParticipationButtonComponent.css'

export default function ParticipationButtonComponent(props) {
    return (
        <button className='ParticipationButton' onClick={() => {props.onClick(props.checked, props.name)}}>
            {props.checked ? "Leave group" : "Enter group"}
        </button>
    );
}