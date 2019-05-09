import React, { Component } from 'react'
import './GroupCreateComponent.css'

class GroupCreateComponent extends Component {
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
                name: 'New group',
                public: true
            }
        })
    }

    handleOkButtonClick() {
        this.props.createGroup(this.state.group);
    }

    handleCancelButtonClick() {
        this.setState({ isButton: true })
    }

    handleChangeName(e) {
        let group = this.state.group;
        group.name = e.target.value;
        this.setState({ group });
    }

    handleChangePublic() {
        let group = this.state.group;
        group.public = !group.public;
        this.setState({ group });
    }

    render() {
        if (this.state.isButton)
            return <button className='GroupCreateButton' onClick={this.handleCreateButtonClick}>Create</button>;
        else
            return (
                <div className='GroupCreatePanel'>
                    <input type='text' value={this.state.group.name} onChange={this.handleChangeName}/>
                    <button onClick={this.handleChangePublic}>{this.state.group.public ? "public" : "private"}</button>
                    <div className='GroupCreateSubmitPanel'>
                        <button className='GroupCreateCancelButton' onClick={this.handleCancelButtonClick}>Cancel</button>
                        <button className='GroupCreateOkButton' onClick={this.handleOkButtonClick}>Ok</button>
                    </div>
                </div>
            );
    }
}

export default GroupCreateComponent;