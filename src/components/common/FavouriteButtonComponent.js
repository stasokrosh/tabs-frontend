import React from 'react'
import './FavouriteButtonComponent.css'

export default function FavouriteButtonComponent(props) {
    return (
        <button className='FavouriteButton' onClick={() => { props.onClick(props.checked, props.id) }}>
            {props.checked ? "fav" : "not fav"}
        </button>
    );
}