import React, { Component } from 'react'
import ImageComponent from './ImageComponent';
import { postImageRequest } from '../../api/image-api';
import './ImageDropComponent.css'
import Dropzone from 'react-dropzone'

class ImageDropComponent extends Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(files) {
        let reader = new FileReader();
        reader.onload = async () => {
            let res = await postImageRequest(reader.result, this.props.folder);
            this.props.imageChanged(res.body);
        };
        reader.readAsDataURL(files[0]);
    }

    render() {
        return (
            <Dropzone onDrop={this.onDrop} accept='image/png'>
                {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!isDragActive && <ImageComponent id={this.props.id}/>}
                        {isDragActive && !isDragReject && "Drop here"}
                    </div>
                )}
            </Dropzone>
        )
    }
}

export default ImageDropComponent;