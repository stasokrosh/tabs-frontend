import React from 'react'
import './FavouriteButtonComponent.css'
import { getPublicImageUrl } from '../../util';

export default function FavouriteButtonComponent(props) {
    return (
        <img className='FavouriteButton' onClick={() => { props.onClick(props.checked, props.id) }} src={getPublicImageUrl(props.checked ? 'fav.png' : 'not-fav.png')} alt='' />
    );
}