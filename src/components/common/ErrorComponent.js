import React from 'react'
import './ErrorComponent.css'

function ErrorComponent(props) {
        return (
            <div className='PageContainer'>
                <p className='ErrorText'>{props.text}</p>
            </div>            
        );
}

export default ErrorComponent;