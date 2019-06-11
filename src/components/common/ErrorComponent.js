import React from 'react'
import './ErrorComponent.css'

function ErrorComponent(props) {
        return (
            <div className='ErrorContainer'>
                <p className='ErrorText'>Error! {props.text}</p>
            </div>        
        );
}

export default ErrorComponent;