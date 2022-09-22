import React from 'react'
import { PacmanLoader } from 'react-spinners'
import './Loader.css'

const Loader = (props) => {
    return (
        <div class="overlay">
            <div class="overlay__inner">
                <div class="overlay__content">
                    {/* {props.loading ? <span style={{color:'white',fontSize:'40px'}}>Loading</span> : <div id="floatingCirclesG">
                        <div class="f_circleG" id="frotateG_01"></div>
                        <div class="f_circleG" id="frotateG_02"></div>
                        <div class="f_circleG" id="frotateG_03"></div>
                        <div class="f_circleG" id="frotateG_04"></div>
                        <div class="f_circleG" id="frotateG_05"></div>
                        <div class="f_circleG" id="frotateG_06"></div>
                        <div class="f_circleG" id="frotateG_07"></div>
                        <div class="f_circleG" id="frotateG_08"></div>
                    </div>} */}
                    <PacmanLoader  color="#0a64f5"/>
                </div>
            </div>
        </div>
    )
}

export default Loader