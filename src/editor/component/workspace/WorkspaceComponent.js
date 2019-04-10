import React, { Component } from 'react'
import './WorkspaceComponent.css'

class WorkspaceComponent extends Component {
    constructor(props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onKeyDown(event) {
        let editor = this.props.editor;     
        switch (event.keyCode) {
            case 37: {
                editor.moveLeft();
                editor.update(true);
                break;
            }
            case 38: {
                editor.moveUp();
                editor.update(true);
                break;
            }
            case 39: {
                editor.moveRight();
                editor.update(true);
                break;
            }
            case 40: {
                editor.moveDown();
                editor.update(true);
                break;
            }
            case 8: {
                editor.clearSelectedNote();
                editor.update(true);
                break;
            }
            default: {
                if (event.keyCode >= 48 && event.keyCode <= 58) {
                    editor.changeSelectedNote(event.keyCode - 48);
                    editor.update(true);
                }
            }
        }
        if (event.keyCode >= 37 && event.keyCode<= 40) {
            event.preventDefault();
        } 
    }

    render() {
        return (
            <div className='Workspace' id='Workspace' onKeyDown={this.onKeyDown} tabIndex="0">
                <div className='WorkspacePages' id='WorkspacePages'>
                </div>
            </div>
        );
    }
}

export default WorkspaceComponent;