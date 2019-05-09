import React, { Component } from 'react'
import './TabCreateComponent.css'

class TabCreateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isButton: true
        };
        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePublic = this.handleChangePublic.bind(this);
    }

    handleCreateButtonClick() {
        this.setState({
            isButton: false,
            tab: {
                name: 'New tab',
                public: true
            }
        })
    }

    handleOkButtonClick() {
        this.props.createTab(this.state.tab);
    }

    handleCancelButtonClick() {
        this.setState({ isButton: true })
    }

    handleChangeName(e) {
        let tab = this.state.tab;
        tab.name = e.target.value;
        this.setState({ tab });
    }

    handleChangePublic() {
        let tab = this.state.tab;
        tab.public = !tab.public;
        this.setState({ tab });
    }

    render() {
        if (this.state.isButton)
            return <button className='TabCreateButton' onClick={this.handleCreateButtonClick}>Create</button>;
        else
            return (
                <div className='TabCreatePanel'>
                    <input type='text' value={this.state.tab.name} onChange={this.handleChangeName}/>
                    <button onClick={this.handleChangePublic}>{this.state.tab.public ? "public" : "private"}</button>
                    <div className='TabCreateSubmitPanel'>
                        <button className='TabCreateCancelButton' onClick={this.handleCancelButtonClick}>Cancel</button>
                        <button className='TabCreateOkButton' onClick={this.handleOkButtonClick}>Ok</button>
                    </div>
                </div>
            );
    }
}

export default TabCreateComponent;