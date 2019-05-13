import React from 'react'
import './ImageComponent.css'
import { getImageDownloadUrl } from '../../util/connection';
import { getPublicImageUrl } from '../../util';

export default function ImageComponent(props) {
    return <img className='Image' src={ props.id ? getImageDownloadUrl(props.id) : getPublicImageUrl('no-image.png')} alt=''/>
}