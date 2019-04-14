import React, { Component } from 'react'
import './InstrumentPanelComponent.css'
import OrientationButtonComponent from './OrientationButtonComponent'
import { DURATION_FRACTIONS } from '../../../model/duration'

function InstrumentButtonComponent(props) {
    return (
        <button className={'InstrumentPanelButton Instrument' + (props.selected ? ' Selected' : '')} onClick={props.onClick} 
            disabled={props.disabled}>
            {props.text}
        </button>
    );
}

class InstrumentPanelComponent extends Component {
    constructor(props) {
        super(props);
        props.editor.addEventListener(this);
    }

    chordFractionEqual(value) {
        let editor = this.props.editor;
        return editor.selectedChord && editor.selectedChord.duration.fraction === value;
    }

    setChordFraction(value) {
        let editor = this.props.editor;
        if (editor.selectedChord) {
            editor.selectedFraction = value;
            editor.update(true);
            this.forceUpdate();
        }
    }

    isChordDot() {
        let editor = this.props.editor;
        return editor.selectedChord && editor.selectedChord.duration.dot;
    }

    changeChordDot() {
        let editor = this.props.editor;
        if (editor.selectedChord) {
            editor.selectedDot = !this.props.editor.selectedChord.duration.dot;
            editor.refresh();
            editor.update();
            this.forceUpdate();
        }
    }

    isChordTriol() {
        let editor = this.props.editor;
        return editor.selectedChord && editor.selectedChord.duration.quaterIs === 3;
    }

    changeChordTriol() {
        let editor = this.props.editor;
        if (editor.selectedChord) {
            if (editor.selectedChord.duration.quaterIs === 2)
                editor.selectedQuaterIs = 3;
            else
                editor.selectedQuaterIs = 2;
            editor.update(true);
            this.forceUpdate();
        }
    }

    isTactReprise() {
        let editor = this.props.editor;
        return editor.selectedTact && this.props.editor.selectedTact.tact.reprise === 2;
    }

    changeTactReprise() {
        let editor = this.props.editor;
        if (editor.selectedTact) {
            if (editor.selectedTact.tact.reprise === 0)
                editor.selectedReprise = 2;
            else
                editor.selectedReprise = 0;
            editor.update(true);
            this.forceUpdate();
        }
    }

    isChordPause() {
        let editor = this.props.editor;
        return editor.selectedChord && editor.selectedChord.isPause;
    }

    changeChordPause() {
        let editor = this.props.editor;
        if (editor.selectedChord) {
            editor.selectedIsPause = !editor.selectedChord.isPause;
            editor.refreshChord();
            editor.update();
            this.forceUpdate();
        }
    }

    getFractionButton(fraction) {
        return <InstrumentButtonComponent text={'1/' + fraction} selected={this.chordFractionEqual(fraction)} disabled={!this.props.editor.selectedChord}
            onClick={() => { this.setChordFraction(fraction) }} key={fraction}/>
    }

    getDotButton() {
        return <InstrumentButtonComponent text='.' selected={this.isChordDot()} disabled={!this.props.editor.selectedChord}
            onClick={this.changeChordDot.bind(this)} />
    }

    getTriolButton() {
        return <InstrumentButtonComponent text='3' selected={this.isChordTriol()} disabled={!this.props.editor.selectedChord}
            onClick={this.changeChordTriol.bind(this)} />
    }

    getRepriseButton() {
        return <InstrumentButtonComponent text='r' selected={this.isTactReprise()} disabled={!this.props.editor.selectedTact}
            onClick={this.changeTactReprise.bind(this)} />
    }

    getPauseButton() {
        return <InstrumentButtonComponent text='p' selected={this.isChordPause()} disabled={!this.props.editor.selectedChord}
            onClick={this.changeChordPause.bind(this)} />
    }

    changeZoom(value) {
        this.props.editor.settings.zoom += value;
        this.props.editor.update();
    }

    invokeEvent(event) {
        this.forceUpdate();
    }

    render() {
        return (
            <div className='InstrumentPanel'>
                <button className="InstrumentPanelButton Settings">Settings</button>
                <div className='InstrumentButtonList'>
                    {DURATION_FRACTIONS.map(this.getFractionButton.bind(this))}
                    {this.getDotButton()}
                    {this.getTriolButton()}
                    {this.getPauseButton()}
                    {this.getRepriseButton()}
                </div>
                <div className='InstrumentPanelInnerContainer'>
                    <OrientationButtonComponent editor={this.props.editor} />
                    <button className='InstrumentPanelButton ViewSetting Zoom' onClick={() => this.changeZoom(-0.1)}>-</button>
                    <button className='InstrumentPanelButton ViewSetting Zoom' onClick={() => this.changeZoom(0.1)}>+</button>
                </div>
            </div>
        )
    }

}

export default InstrumentPanelComponent;