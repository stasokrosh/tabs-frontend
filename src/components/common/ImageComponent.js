import React from 'react'
import './ImageComponent.css'
import { getImageDownloadUrl } from '../../util/connection';

function onError(e) {
    e.target.src = process.env.PUBLIC_URL + '/images/no-image.png'
}

export default function ImageComponent(props) {
    return <img className='Image' src={getImageDownloadUrl(props.id)} onError={onError}alt=''/>
}