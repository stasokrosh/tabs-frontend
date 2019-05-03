import React, {Component} from 'react'

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        props.history.push('/account');
    }
    
    render() {
        return (
            <div>Home</div>
        );
    }
}

export default HomeComponent;