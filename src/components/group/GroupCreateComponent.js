import React, { Component } from 'react'
import './GroupCreateComponent.css'

class GroupCreateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: {
                name: 'New group',
                public: true
            }
        };
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePublic = this.handleChangePublic.bind(this);
    }

    async handleOkButtonClick() {
        let res = await this.props.createGroup(this.state.group);
        if (!res.success)
            this.setState({error : res.message});
    }

    handleCancelButtonClick() {
        this.props.cancel();
    }

    handleChangeName(e) {
        let group = this.state.group;
        group.name = e.target.value;
        this.setState({ group, error: null });
    }

    handleChangePublic() {
        let group = this.state.group;
        group.public = !group.public;
        this.setState({ group });
    }

    render() {
        return (
            <div className='GroupCreatePanel'>
                <input type='text' value={this.state.group.name} onChange={this.handleChangeName} />
                <span className='Error'>{this.state.error}</span>;
                <button onClick={this.handleChangePublic}>{this.state.group.public ? "public" : "private"}</button>
                <div className='GroupCreateSubmitPanel'>
                    <button className='Cancel' onClick={this.handleCancelButtonClick}>Cancel</button>
                    <button className='Submit' onClick={this.handleOkButtonClick}>Ok</button>
                </div>
            </div>
        );
    }
}

export default GroupCreateComponent;