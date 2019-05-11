import React from 'react'
import './ImageComponent.css'
import { getImageDownloadUrl } from '../../util/connection';

export default function ImageComponent(props) {
    return <img className='Image' src={ props.id ? getImageDownloadUrl(props.id) : process.env.PUBLIC_URL + '/images/no-image.png'} alt=''/>
}