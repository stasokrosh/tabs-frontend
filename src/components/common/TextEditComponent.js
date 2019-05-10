import React, { Component } from 'react'
import './TextEditComponent.css'

class TextEditComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            value: props.value
        };
        this.handleEditButtonCick = this.handleEditButtonCick.bind(this);
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleEditButtonCick() {
        this.setState({
            edit: true,
            oldValue: this.state.value
        })
    }

    handleOkButtonClick() {
        this.props.submit(this.state.value).then((res=> {
            if (res.success)
                this.setState({
                    edit: false,
                });
            else 
                this.setState({
                    error: res.message
                })
        }))
    }

    handleCancelButtonClick() {
        this.setState({
            edit: false,
            value: this.state.oldValue
        });
    }

    handleTextChange(e) {
        this.setState({
            value: e.target.value,
            error : null
        })
    }

    render() {
        if (this.state.edit)
            return (
                <div className='TextEdit'>
                    <input type="text" value={this.state.value} onChange={this.handleTextChange} />
                    {this.state.error && <span className='TextEditError'>{this.state.error}</span>}
                    <div className='TextEditSubmitPanel'>
                        <button className='TextEditCancelButton' onClick={this.handleCancelButtonClick}>Cancel</button>
                        <button className='TextEditOkButton' onClick={this.handleOkButtonClick}>Ok</button>
                    </div>
                </div>
            )
        else
            return (
                <button className='TextEditButton' onClick={this.handleEditButtonCick}>{this.state.value}</button>
            )
    }
}

export default TextEditComponent;