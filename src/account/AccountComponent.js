import React, { Component } from 'react'
import './AccountComponent.css'
import PageContainerComponent from '../common/PageContainerComponent';

class AccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { account: { name: 'test account' } };
    }

    render() {
        return (
            <PageContainerComponent>
                <div className='AccountInfo'>
                    <p>{this.state.account.name}</p>
                </div>
            </PageContainerComponent>
        )
    }
}

export default AccountComponent;