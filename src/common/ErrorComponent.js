import React from 'react'
import './ErrorComponent.css'

function ErrorComponent(props) {
        return (
            <PageContainerComponent>
                <h className='ErrorText'>{props.text}</h>
            </PageContainerComponent>            
        );
}

export default ErrorComponent;