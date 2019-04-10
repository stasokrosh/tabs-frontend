import React, { Component } from 'react'

class OrientationButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.editor.settings.isVertical = !this.props.editor.settings.isVertical;
        this.props.editor.update(true);
        this.forceUpdate();
    }

    render() {
        return (
            <button className='InstrumentPanelButton ViewSetting' onClick={this.onClick}>
                {this.props.editor.settings.isVertical ? 'vertical' : 'horizontal'}
            </button>
        );
    }
}

export default OrientationButtonComponent;