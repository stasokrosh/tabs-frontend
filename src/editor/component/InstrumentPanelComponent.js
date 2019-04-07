import React, { Component } from 'react'
import './InstrumentPanelComponent.css'
// import button1 from './images/button1.png'
// import button2 from './images/button2.png'
// import button4 from './images/button4.png'
// import button8 from './images/button8.png'
// import button16 from './images/button16.png'
// import button32 from './images/button32.png'
// import button3 from './images/button3.png'
// import buttonPause from './images/button-pause.png'
// import buttonReprise from './images/button-reprise.png'

function ButtonComponent(props) {
    return (
        <button className='InstrumentPanelButton'>{props.text}</button>
    );
}

class InstrumentPanelComponent extends Component {
    render() {
        return (
            <ul className='InstrumentPanel'>
                {/* {/* <li><img className='InstrumentPanelButton'src={button1} alt=''/></li>
                <li><img className='InstrumentPanelButton'src={button2} alt=''/></li>
                <li><img className='InstrumentPanelButton'src={button4} alt=''/></li>
                <li><img className='InstrumentPanelButton'src={button8} alt=''/></li>
                <li><img className='InstrumentPanelButton'src={button16} alt=''/></li>
                <li><img className='InstrumentPanelButton'src={button32} alt=''/></li>
                <li><img className='InstrumentPanelButton'src={buttonPause} alt=''/></li>
                <li><img className='InstrumentPanelButton'src={buttonReprise} alt=''/></li>
                <li><img className='InstrumentPanelButton'src={button3} alt=''/></li> */}
                <li><ButtonComponent text = '1'/></li>
                <li><ButtonComponent text = '2'/></li>
                <li><ButtonComponent text = '4'/></li>
                <li><ButtonComponent text = '8'/></li>
                <li><ButtonComponent text = '16'/></li>
                <li><ButtonComponent text = '32'/></li>
                <li><ButtonComponent text = 'p'/></li>
                <li><ButtonComponent text = 'r'/></li>
                <li><ButtonComponent text = '3'/></li>
            </ul>
        )
    }
}

export default InstrumentPanelComponent;