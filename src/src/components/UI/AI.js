import React from 'react'
// import {darwin}  from "https://befit.digitaldarwin.in/images/ai/darwin.js";


const anglesEle = document.getElementById('angles');
        const labels=['Left Shoulder(ver)','Right Shoulder(ver)'
                        ,'Left Elbow','Right Elbow',
                        'Left Hip','Right Hip',
                        'Left Knee','Right Knee', 
                        'Left Shoulder(hor)', 'Left Shoulder(hor)', 
                        ];
        const indices=[0,1,2,3,4,5,6,7,8,9]; 
 
        for(const i of indices) {
            const label = labels[i];
            anglesEle.innerHTML += `<input type="checkbox" name=${label} value=${i} checked>
                                    <label for=${label}>${label}</label><br>`
        } 
        
 
        const stop =()=>{
            darwin.stop();
        }
        // document.getElementById('stop').onclick = function() {
        //     darwin.stop();
        // }

        const restart =()=>{
            darwin.restart();
        }   
        // document.getElementById('restart').onclick = function() {
        //     darwin.restart();
        // }

        // document.getElementById('ex').onchange = function(e)  {
        //     console.log(this.value);
        //     const primaryKeypoint = this.value;
        //     console.log(this.options[this.selectedIndex].text)
        //     const exname = this.options[this.selectedIndex].text;
        //     darwin.setExcersiseParams({
        //         "name": exname,
        //         "primaryKeypoint": primaryKeypoint,
        //     });
        // }
        const handleChange =(e)=>{
            console.log(this.value);
            const primaryKeypoint = this.value;
            console.log(this.options[this.selectedIndex].text)
            const exname = this.options[this.selectedIndex].text;
            darwin.setExcersiseParams({
                "name": exname,
                "primaryKeypoint": primaryKeypoint,
            });
        }

        const checkboxes = document.getElementById('angles').querySelectorAll('input[type=checkbox]')
        
        // document.getElementById('angles').onclick = function() {
        //     const angles = []
        //     for(const checkbox of checkboxes) {
        //         if(checkbox.checked === true) {
        //             angles.push(parseInt(checkbox.value));
        //         }
        //     }
        //     darwin.setExcersiseParams({
        //         "angles": angles
        //     })
        // }

        const angles = () =>{
            const angles = []
            for(const checkbox of checkboxes) {
                if(checkbox.checked === true) {
                    angles.push(parseInt(checkbox.value));
                }
            }
            darwin.setExcersiseParams({
                "angles": angles
            })
        }

        darwin.setExcersiseParams({
            "name": 'squats',
            "primaryKeypoint": 0,
            "angles": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        });

        const video = document.getElementById('video');
		video.width = 600;
		const canvas = document.getElementById('output');

		const options = {
			video,
			videoWidth: 640,
			videoHeight: 480,//window.innerHeight-20,
			canvas,
			loadingEleId: 'loading',
			mainEleId: 'main',
			supervised: false,
			showAngles: true,
		}

		//initialize the model with options
		darwin.initializeModel(options);

		// kick off the model
        // document.getElementById("start").onclick = function() {
        //     darwin.launchModel();
        // }

        const start = ()=>{
            darwin.launchModel();
        }

const AI = () => {
    return (
        <>
            <div id="info" style={{display:'none'}}>
    </div>
    <div id="loading" style='display:flex'>
        <button id="start" onclick={start}>Start</button>
    </div>
    <div id='main' style={{display:'none'}}>
        <button id="stop" onclick={stop}>stop</button>
        <button id="restart" onclick={restart}>restart</button>
        <select name="ex" id="ex" onchange={handleChange}>
            <option value="0">squats</option>
            <option value="27">hip flexion</option>
        </select>
        <div id="angles" onclick={angles}>
     
        </div>
        <video id="video" playsinline style="display: none;">
            ss
        </video>
        <canvas id="output" />
    </div>
        </>
    )
}

export default AI
