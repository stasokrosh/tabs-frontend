import React from 'react'
import './PageContainerComponent.css'

function PageContainerComponent(props) {
        return (
            <div className='PageContainer'>{props.children}</div>
        );
}

export default PageContainerComponent;