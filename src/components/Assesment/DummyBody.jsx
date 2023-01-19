import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import "../../styles/Layout/Body.css"
import JointData from "../UtilityComponents/dummyData/MuscleMap.json";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
// aswin 10/24/2021 start
import { Switch, Button, Row, Col, notification, Descriptions,Rate, Slider,Form,Table,Modal,Space, message} from "antd";
// aswin 10/24/2021 stop
import TrapsLeft from "./../../assets/Crops/08TrapsLeft.webp";
import Trapsright from "./../../assets/Crops/08.-TrapsRight.webp";
import DeltoidsA from "./../../assets/Crops/07.A-Deltoids.webp";
import DeltoidsB from "./../../assets/Crops/07.B-Deltoids.webp";
import Pecs from "./../../assets/Crops/06.-Pecs.webp";
import bicepsA from "./../../assets/Crops/05.A-Biceps.webp";
import bicepsB from "./../../assets/Crops/05.B-Biceps.webp";
import forearmA from "./../../assets/Crops/14.A-Forearms.webp";
import forearmB from "./../../assets/Crops/14.B-Forearms.webp";
import obliques from "./../../assets/Crops/04.-Obliques.webp";
import quadsA from "./../../assets/Crops/01.A-Quads.webp";
import quadsB from "./../../assets/Crops/01.B-Quads.webp";
import calvesA from "./../../assets/Crops/13.A-Calves.webp";
import calvesB from "./../../assets/Crops/13.B-Calves.webp";
import backtrapsA from "./../../assets/Crops/08.B-Traps.webp";
import backtrapsB from "./../../assets/Crops/08.C-Traps.webp";
import backshouldersA from "./../../assets/Crops/07.C-Deltoids.webp";
import backshouldersB from "./../../assets/Crops/07.D-Deltoids.webp";
import tricepsA from "./../../assets/Crops/09.A-Triceps.webp";
import tricepsB from "./../../assets/Crops/09.B-Triceps.webp";
import backLatsA from "./../../assets/Crops/10.A-Lats.webp";
import backLatsB from "./../../assets/Crops/10.B-Lats.webp";
import backlower from "./../../assets/Crops/15.-Lower-Back.webp";
import backforearmsA from "./../../assets/Crops/14.C-Forearms.webp";
import backforearmsB from "./../../assets/Crops/14.D-Forearms.webp";
import backglutes from "./../../assets/Crops/11.-Glutes.webp";
import backhamstringsA from "./../../assets/Crops/12.A-Hamstrings.webp";
import backhamstringsB from "./../../assets/Crops/12.B-Hamstrings.webp";
import backcalvesA from "./../../assets/Crops/13.C-Calves.webp";
import backcalvesB from "./../../assets/Crops/13.D-Calves.webp";
import background from './../../assets/Crops/00.-Blank-Figures.webp';
import MobBackground from "./../../assets/Crops//mobilebg.webp";

import FtrapsA from "./../../assets/Crops/female/female-traps-A.webp";
import FtrapsB from "./../../assets/Crops/female/female-traps-B.webp";
import FshouldersA from "./../../assets/Crops/female/female-deltoids-A.webp";
import FshouldersB from "./../../assets/Crops/female/female-deltoids-B.webp";
import Fpecs from "./../../assets/Crops/female/female-pecs.webp";
import FbicepsA from "./../../assets/Crops/female/female-biceps-A.webp";
import FbicepsB from "./../../assets/Crops/female/female-biceps-B.webp";
import FforearmA from "./../../assets/Crops/female/female-forearms-A.webp";
import FforearmB from "./../../assets/Crops/female/female-forearms-B.webp";
import Fabdominals from "./../../assets/Crops/female/female-abdominals.webp";
import FquadsA from "./../../assets/Crops/female/female-quads-A.webp";
import FquadsB from "./../../assets/Crops/female/female-quads-B.webp";
import FcalvesA from "./../../assets/Crops/female/female-calves-A.webp";
import FcalvesB from "./../../assets/Crops/female/female-calves-B.webp";
import FbacktrapsA from "./../../assets/Crops/female/female-traps-C.webp";
import FbacktrapsB from "./../../assets/Crops/female/female-traps-D.webp";
import FbackshouldersA from "./../../assets/Crops/female/female-deltoids-C.webp";
import FbackshouldersB from "./../../assets/Crops/female/female-deltoids-D.webp";
import FtricepsA from "./../../assets/Crops/female/female-triceps-A.webp";
import FtricepsB from "./../../assets/Crops/female/female-triceps-B.webp";
import FlatsA from "./../../assets/Crops/female/female-lats-A.webp";
import FlatsB from "./../../assets/Crops/female/female-lats-B.webp";
import Flowerback from "./../../assets/Crops/female/female-lowerback.webp";
import FbackforearmsA from "./../../assets/Crops/female/female-forearms-C.webp";
import FbackforearmsB from "./../../assets/Crops/female/female-forearms-D.webp";
import Fbackglutes from "./../../assets/Crops/female/female-glutes.webp";
import FbackhamstringsA from "./../../assets/Crops/female/female-hamstrings-A.webp";
import FbackhamstringsB from "./../../assets/Crops/female/female-hamstrings-B.webp";
import FbackcalvesA from "./../../assets/Crops/female/female-calves-C.webp";
import FbackcalvesB from "./../../assets/Crops/female/female-calves-D.webp";
import FBackground from "./../../assets/Crops/female/Female-Figures.webp";
import FMobile from "./../../assets/Crops/female/female-mobilebg.webp";


const muscle = [
    "TrapsA", "TrapsB", "BacktrapsA", "BacktrapsB",
    "ShoulderA", "ShoulderB", "Pecs", "BackshouldersA", "BackshouldersB",
    "BicepsA", "BicepsB", "ForearmsA", "ForearmsB", "BackforearmsA",
    "BackforearmsB", "Abdominals", "QuadsA", "QuadsB", "CalvesA", "CalvesB",
    "BackcalvesA", "BackcalvesB", "TricepsA", "TricepsB", "LatsA", "LatsB",
    "LowerBack", "Glutes", "HamstringsA", "HamstringsB"
]

const marks1 = {
    0: <SmileOutlined id="smile" style={{ fontSize: 25 }} />,
    1: <MehOutlined style={{ fontSize: 25, color: 'limegreen' }} />,
    2: <FrownOutlined style={{ fontSize: 25, color: 'orange' }} />,
    3: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>
  };

  const marks = {
    0: <i class="far fa-smile" style={{ fontSize: 25 }}></i>,
    2: <i class="far fa-smile" style={{ fontSize: 25, color: 'lime' }}></i>,
    4: <i class="far fa-meh" style={{ fontSize: 25, color: 'limegreen' }}></i>,
    6: <i class="far fa-frown" style={{ fontSize: 25, color: 'lightsalmon' }}></i>,
    8: <i class="far fa-frown" style={{ fontSize: 25, color: 'orange' }}></i>,
    10: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>
  };

  const desc = ['no pain', 'mild', 'moderate', 'severe'];



const DummyBody = () => {
    const history = useHistory();
    const [MuscleJoint, setMuscleJoint] = useState({});

    const [BodyParts, setBodyParts] = useState([]);

    const [FullBody, setFullBody] = useState(false);

    const [MaleFemale, setMaleFemale] = useState(false);


    const handleClick = (e, id) => {

        console.log(e,' : ',id)
        const index = BodyParts.indexOf(e);
    //    console.log(BodyParts)
        var ele = document.getElementById(id);

        if (index === -1) {
            const MappedJoint = JointData[e];

            const dummyData = { ...MuscleJoint }

            for (let i = 0; i < MappedJoint.length; i++) {

                if (MappedJoint[i] in dummyData) {
                    dummyData[MappedJoint[i]] += 1;
                } else {
                    dummyData[MappedJoint[i]] = 1;
                }
            }

            setMuscleJoint(dummyData);

            const Body = [...BodyParts, e]
            setBodyParts(Body);
            ele.style.opacity = '1';

        } else {
            const MappedJoint = JointData[e];
            const dummyData = { ...MuscleJoint }

            for (let i = 0; i < MappedJoint.length; i++) {

                if (MappedJoint[i] in dummyData) {
                    dummyData[MappedJoint[i]] -= 1;

                    if (dummyData[MappedJoint[i]] === 0) {
                        delete dummyData[MappedJoint[i]];
                    }
                }
            }
            setMuscleJoint(dummyData);
            const Body = [...BodyParts]
            Body.splice(index, 1)
            setBodyParts(Body);
            ele.style.opacity = '0';
        }

    }


    const Rom = () => {

        if(Object.keys(MuscleJoint).length=='')
        {
            warningJoint()
            return false
        }
        console.log("values ",MuscleJoint)
        history.push({
            pathname: "/care-plan", state: {
                Joints: Object.keys(MuscleJoint),
                Muscles: BodyParts,
                prevpath: "/assesment"
            }
        });
        // console.log(Object.keys(MuscleJoint));
    }

    const Questions = () => {
        history.push("/assesment/Questions");
    }

    const onClick = () => {
        if (FullBody === false) {
            var ele = document.getElementsByClassName("FullBody");
            const dummyData = { ...MuscleJoint }
            for (i of muscle) {
                const MappedJoint = JointData[i];
                for (let j = 0; j < MappedJoint.length; j++) {
                    if (MappedJoint[j] in dummyData) {
                        dummyData[MappedJoint[j]] += 1;
                    } else {
                        dummyData[MappedJoint[j]] = 1;
                    }
                }
                setBodyParts(muscle);
                setMuscleJoint(dummyData);

            }

            for (var i = 0, len = ele.length | 0; i < len; i = i + 1 | 0) {
                ele[i].style.opacity = "1";
            }
            setFullBody(true);

        } else {
            // eslint-disable-next-line no-redeclare
            var ele = document.getElementsByClassName("FullBody");
            const dummyData = { ...MuscleJoint }
            const Body = [...BodyParts]
            for (i of muscle) {
                const MappedJoint = JointData[i];
                for (let j = 0; j < MappedJoint.length; j++) {
                    if (MappedJoint[j] in dummyData) {
                        
                        dummyData[MappedJoint[j]] -= 1;
                      
                        if (dummyData[MappedJoint[j]] === 0) {
                            delete dummyData[MappedJoint[j]];
                        }
                    }
                }
                Body.splice(0, muscle.length)
                setBodyParts(Body);
                setMuscleJoint(dummyData);
            }

            for (i = 0, len = ele.length | 0; i < len; i = i + 1 | 0) {
                ele[i].style.opacity = "0";
            }
            setFullBody(false);
        }
    }
    
    // useEffect(()=>{
    //    // console.log(state.carePlanRedcucer.pp_ed_id)
    //  //   console.log('errorshow in useEffect')
    // //    console.log(errorshow)
    // },[])

   // aswin 10/30/2021 start 

    return (
        <>

           
            {MaleFemale ? <>
                {/* <p className="GenderSelection my-2">Female</p>
                <Button className="" onClick={() => onClick("FullBody")}>Full Body</Button> */}
                <Row>
                    <Col md={16} lg={16} sm={24} xs={24}>
                        <div id="femalefigures1">
                            <div id="mobile-muscle-map-female">
                                <img alt="body-img2011" className="FullBody" id="mobilebg-female" src={FMobile} alt="female-456" />
                                <img alt="body-img202" className="FullBody" id="female-traps-a1" src={FtrapsA} alt="female-1" onClick={() => { handleClick("TrapsA", "female-traps-a1") }} />
                                <img alt="body-img203" className="FullBody" id="female-traps-b2" src={FtrapsB} alt="female-2" onClick={() => { handleClick("TrapsB", "female-traps-a2") }} />
                                <img alt="body-img204" className="FullBody" id="female-shoulders-a1" src={FshouldersA} alt="female-3" onClick={() => { handleClick("ShouldersA", "female-shoulders-a1") }} />
                                <img alt="body-img205" className="FullBody" id="female-shoulders-b2" src={FshouldersB} alt="female-4" onClick={() => { handleClick("ShouldersB", "female-shoulders-a2") }} />
                                <img alt="body-img206" className="FullBody" id="female-pecs1" src={Fpecs} alt="female-5" onClick={() => { handleClick("Pecs", "female-pecs1") }} />
                                <img alt="body-img207" className="FullBody" id="female-biceps-a1" src={FbicepsA} alt="female-6" onClick={() => { handleClick("BicepsA", "female-biceps-a1") }} />
                                <img alt="body-img208" className="FullBody" id="female-biceps-b2" src={FbicepsB} alt="female-7" onClick={() => { handleClick("BicepsB", "female-biceps-a2") }} />
                                <img alt="body-img209" className="FullBody" id="female-forearm-a1" src={FforearmA} alt="female-8" onClick={() => { handleClick("ForearmA", "female-forearm-a2") }} />
                                <img alt="body-img210" className="FullBody" id="female-forearm-b2" src={FforearmB} alt="female-9" onClick={() => { handleClick("ForearmB", "female-forearm-a2") }} />
                                <img alt="body-img211" className="FullBody" id="female-abdominals1" src={Fabdominals} alt="female-10" onClick={() => { handleClick("Abdominals", "female-abdominals1") }} />
                                <img alt="body-img212" className="FullBody" id="female-quads-a1" src={FquadsA} alt="female-11" onClck={() => { handleClick("QuadsA", "female-quads-a1") }} />
                                <img alt="body-img213" className="FullBody" id="female-quads-b2" src={FquadsB} alt="female-12" onClick={() => { handleClick("QuadsB", "female-quads-a2") }} />
                                <img alt="body-img214" className="FullBody" id="female-calves-a1" src={FcalvesA} alt="female-13" onClick={() => { handleClick("CalvesA", "female-calves-a1") }} />
                                <img alt="body-img215" className="FullBody" id="female-calves-b2" src={FcalvesB} alt="female-14" onClick={() => { handleClick("CalvesB", "female-calves-a2") }} />
                                <img alt="body-img216" className="FullBody" id="female-back-traps-a1" src={FbacktrapsA} alt="female-15" onClick={() => { handleClick("BacktrapsA", "female-back-traps-a1") }} />
                                <img alt="body-img217" className="FullBody" id="female-back-traps-b2" src={FbacktrapsB} alt="female-16" onClick={() => { handleClick("BacktrapsA", "female-back-traps-a1") }} />
                                <img alt="body-img218" className="FullBody" id="female-back-shoulders-a1" src={FbackshouldersA} alt="female-17" onClick={() => { handleClick("BackshouldersA", "female-back-shoulders-a1") }} />
                                <img alt="body-img219" className="FullBody" id="female-back-shoulders-b2" src={FbackshouldersB} alt="female-18" onClick={() => { handleClick("BackshouldersB", "female-back-shoulders-a2") }} />
                                <img alt="body-img220" className="FullBody" id="female-triceps-a1" src={FtricepsA} alt="female-19" onClick={() => { handleClick("TricepsA", "female-triceps-a1") }} />
                                <img alt="body-img221" className="FullBody" id="female-triceps-b2" src={FtricepsB} alt="female-20" onClick={() => { handleClick("TricepsB", "female-triceps-a2") }} />
                                <img alt="body-img222" className="FullBody" id="female-back-lats-a1" src={FlatsA} alt="female-21" onClick={() => { handleClick("LatsA", "female-back-lats-a1") }} />
                                <img alt="body-img223" className="FullBody" id="female-back-lats-b2" src={FlatsB} alt="female-22" onClick={() => { handleClick("LatsB", "female-back-lats-a2") }} />
                                <img alt="body-img224" className="FullBody" id="female-back-lower1" src={Flowerback} alt="femae-23" onClick={() => { handleClick("LowerBack", "female-back-lower1") }} />
                                <img alt="body-img225" className="FullBody" id="female-back-forearms-a1" src={FbackforearmsA} alt="female-24" onClick={() => { handleClick("BackforearmsA", "female-back-forearms-a1") }} />
                                <img alt="body-img226" className="FullBody" id="female-back-forearms-b2" src={FbackforearmsB} alt="female-25" onClick={() => { handleClick("BackforearmsB", "female-back-forearms-a2") }} />
                                <img alt="body-img227" className="FullBody" id="female-back-glutes1" src={Fbackglutes} alt="female-26" onClck={() => { handleClick("Glutes", "female-back-glutes1") }} />
                                <img alt="body-img228" className="FullBody" id="female-back-hamstrings-a1" src={FbackhamstringsA} alt="female-27" onClick={() => { handleClick("HamstringsA", "female-back-hamstrings-a1") }} />
                                <img alt="body-img229" className="FullBody" id="female-back-hamstrings-b2" src={FbackhamstringsB} alt="female-28" onClick={() => { handleClick("HamstringsB", "female-back-hamstrings-a2") }} />
                                <img alt="body-img230" className="FullBody" id="female-back-calves-a1" src={FbackcalvesA} alt="female-29" onClik={() => { handleClick("calvesA", "female-back-calves-a1") }} />
                                <img alt="body-img231" className="FullBody" id="female-back-calves-b2" src={FbackcalvesB} alt="female-30" onClick={() => { handleClick("calvesB", "female-back-calves-a2") }} />
                            </div>
                            <div id="muscle-map-female">
                                <img alt="body-img1" className="FullBody" id="background-female" src={FBackground} alt="female-4567" />
                                <img alt="body-img2" className="FullBody" id="female-traps-a" src={FtrapsA} alt="female-31" onClick={() => { handleClick("TrapsA", "female-traps-a") }} />
                                <img alt="body-img3" className="FullBody" id="female-traps-b" src={FtrapsB} alt="female-32" onClick={() => { handleClick("TrapsB", "female-traps-b") }} />
                                <img alt="body-img4" className="FullBody" id="female-shoulders-a" src={FshouldersA} alt="female-33" onClick={() => { handleClick("ShoulderA", "female-shoulders-a") }} />
                                <img alt="body-img5" className="FullBody" id="female-shoulders-b" src={FshouldersB} alt="female-34" onClick={() => { handleClick("ShoulderB", "female-shoulders-b") }} />
                                <img alt="body-img6" className="FullBody" id="female-pecs" src={Fpecs} alt="female-35" onClick={() => { handleClick("Pecs", "female-pecs") }} />
                                <img alt="body-img7" className="FullBody" id="female-biceps-a" src={FbicepsA} alt="female-36" onClick={() => { handleClick("BicepsA", "female-biceps-a") }} />
                                <img alt="body-img8" className="FullBody" id="female-biceps-b" src={FbicepsB} alt="female-37" onClick={() => { handleClick("BicepsB", "female-biceps-b") }} />
                                <img alt="body-img9" className="FullBody" id="female-forearm-a" src={FforearmA} alt="female-38" onClick={() => { handleClick("ForearmsA", "female-forearm-a") }} />
                                <img alt="body-img10" className="FullBody" id="female-forearm-b" src={FforearmB} alt="female-39" onClick={() => { handleClick("ForearmsB", "female-forearm-b") }} />
                                <img alt="body-img11" className="FullBody" id="female-abdominals" src={Fabdominals} alt="female-40" onClick={() => { handleClick("Abdominals", "female-abdominals") }} />
                                <img alt="body-img12" className="FullBody" id="female-quads-a" src={FquadsA} alt="female-41" onClick={() => { handleClick("QuadsA", "female-quads-a") }} />
                                <img alt="body-img13" className="FullBody" id="female-quads-b" src={FquadsB} alt="female-42" onClick={() => { handleClick("QuadsB", "female-quads-b") }} />
                                <img alt="body-img14" className="FullBody" id="female-calves-a" src={FcalvesA} alt="female-43" onClick={() => { handleClick("CalvesA", "female-calves-a") }} />
                                <img alt="body-img15" className="FullBody" id="female-calves-b" src={FcalvesB} alt="female-44" onClick={() => { handleClick("CalvesB", "female-calves-b") }} />
                                <img alt="body-img16" className="FullBody" id="female-back-traps-a" src={FbacktrapsA} alt="female-45" onClick={() => { handleClick("BacktrapsA", "female-back-traps-a") }} />
                                <img alt="body-img17" className="FullBody" id="female-back-traps-b" src={FbacktrapsB} alt="female-46" onClick={() => { handleClick("BacktrapsB", "female-back-traps-b") }} />
                                <img alt="body-img18" className="FullBody" id="female-back-shoulders-a" src={FbackshouldersA} alt="female-47" onClick={() => { handleClick("BackshouldersA", "female-back-shoulders-a") }} />
                                <img alt="body-img19" className="FullBody" id="female-back-shoulders-b" src={FbackshouldersB} alt="female-48" onClick={() => { handleClick("BackshouldersB", "female-back-shoulders-b") }} />
                                <img alt="body-img20" className="FullBody" id="female-triceps-a" src={FtricepsA} alt="female-49" onClick={() => { handleClick("TricepsA", "female-triceps-a") }} />
                                <img alt="body-img21" className="FullBody" id="female-triceps-b" src={FtricepsB} alt="female-50" onClick={() => { handleClick("TricepsB", "female-triceps-b") }} />
                                <img alt="body-img22" className="FullBody" id="female-back-lats-a" src={FlatsA} alt="female-51" onClick={() => { handleClick("LatsA", "female-back-lats-a") }} />
                                <img alt="body-img23" className="FullBody" id="female-back-lats-b" src={FlatsB} alt="female-52" onClick={() => { handleClick("LatsB", "female-back-lats-b") }} />
                                <img alt="body-img24" className="FullBody" id="female-back-lower" src={Flowerback} alt="female-53" onClick={() => { handleClick("LowerBack", "female-back-lower") }} />
                                <img alt="body-img25" className="FullBody" id="female-back-forearms-a" src={FbackforearmsA} alt="female-54" onClick={() => { handleClick("BackforearmsA", "female-back-forearms-a") }} />
                                <img alt="body-img26" className="FullBody" id="female-back-forearms-b" src={FbackforearmsB} alt="female-55" onClick={() => { handleClick("BackforearmsB", "female-back-forearms-b") }} />
                                <img alt="body-img27" className="FullBody" id="female-back-glutes" src={Fbackglutes} alt="female-56" onClick={() => { handleClick("Glutes", "female-back-glutes") }} />
                                <img alt="body-img28" className="FullBody" id="female-back-hamstrings-a" src={FbackhamstringsA} alt="female-57" onClick={() => { handleClick("HamstringsA", "female-back-hamstrings-a") }} />
                                <img alt="body-img29" className="FullBody" id="female-back-hamstrings-b" src={FbackhamstringsB} alt="female-58" onClick={() => { handleClick("HamstringsB", "female-back-hamstrings-b") }} />
                                <img alt="body-img30" className="FullBody" id="female-back-calves-a" src={FbackcalvesA} alt="female-59" onClick={() => { handleClick("BackcalvesA", "female-back-calves-a") }} />
                                <img alt="body-img31" className="FullBody" id="female-back-calves-b" src={FbackcalvesB} alt="female-60" onClick={() => { handleClick("BackcalvesB", "female-back-calves-b") }} />
                            </div>
                        </div>
                    </Col>
                    {/* <Col className="mt-5" md={8} lg={8} sm={24} xs={24}>
                        <p>Joint Selected</p>

                        {
                            BodyParts.map((val, id) => {
                                return (
                                    <p key={id}>{val}</p>
                                )
                            })
                        }

                        {JSON.stringify(MuscleJoint)}

                    </Col> */}
                </Row>

            </> : <>
                {/* <p>Male</p>
                <Button className="" onClick={() => { onClick("FullBody") }}>Full Body</Button> */}
                <Row>
                    <Col md={16} lg={16} sm={24} xs={24}>
                        <div id="malefigures">
                            <div id="mobile-muscle-map"><img alt="body-img" id="mobilebg" src={MobBackground} alt="male-background" />
                                <img alt="body-img11" alt="body-img" className="FullBody" id="traps-a1" src={TrapsLeft} alt="male-1" onClick={() => { handleClick("TrapsA", "traps-a1") }} />
                                <img alt="body-img22" alt="body-img" className="FullBody" id="traps-b2" src={Trapsright} alt="male-2" onClick={() => { handleClick("TrapsB", "traps-b2") }} />
                                <img alt="body-img33" alt="body-img" className="FullBody" id="shoulders-a1" src={DeltoidsA} alt="male-3" onClick={() => { handleClick("ShoulderA", "shoulders-a1") }} />
                                <img alt="body-img44" alt="body-img" className="FullBody" id="shoulders-b2" src={DeltoidsB} alt="male-4" onClick={() => { handleClick("ShoulderB", "shoulders-b2") }} />
                                <img alt="body-img55" alt="body-img" className="FullBody" id="pecs1" src={Pecs} alt="male-5" onClick={() => { handleClick("Pecs", "pecs1") }} />
                                <img alt="body-img66" alt="body-img" className="FullBody" id="biceps-a1" src={bicepsA} alt="male-6" onClick={() => { handleClick("BicepsA", "biceps-a1") }} />
                                <img alt="body-img77" alt="body-img" className="FullBody" id="biceps-b2" src={bicepsB} alt="male-7" onClick={() => { handleClick("BicepsB", "biceps-b2") }} />
                                <img alt="body-img88" alt="body-img" className="FullBody" id="forearm-a1" src={forearmA} alt="male-8" onClick={() => { handleClick("ForearmsA", "forearm-a1") }} />
                                <img alt="body-img99" alt="body-img" className="FullBody" id="forearm-b2" src={forearmB} alt="male-9" onClick={() => { handleClick("ForearmsB", "forearm-a2") }} />
                                <img alt="body-img98" alt="body-img" className="FullBody" id="obliques1" src={obliques} alt="male-10" onClick={() => { handleClick("Abdominals", "obliques1") }} />
                                <img alt="body-img97" alt="body-img" className="FullBody" id="quads-a1" src={quadsA} alt="male-11" onClick={() => { handleClick("QuadsA", "quads-a1") }} />
                                <img alt="body-img96" alt="body-img" className="FullBody" id="quads-b2" src={quadsB} alt="male-12" onClick={() => { handleClick("QuadsB", "quads-b2") }} />
                                <img alt="body-img95" alt="body-img" className="FullBody" id="calves-a1" src={calvesA} alt="male-13" onClick={() => { handleClick("CalvesA", "calves-a1") }} />
                                <img alt="body-img94" alt="body-img" className="FullBody" id="calves-b2" src={calvesB} alt="male-14" onClick={() => { handleClick("CalvesB", "calves-a2") }} />
                                <img alt="body-img93" alt="body-img" className="FullBody" id="back-traps-a1" src={backtrapsA} alt="male-15" onClick={() => { handleClick("BacktrapsA", "back-traps-a1") }} />
                                <img alt="body-img92" className="FullBody" id="back-traps-b2" src={backtrapsB} alt="male-16" onClick={() => { handleClick("BacktrapsB", "back-traps-a2") }} />
                                <img alt="body-img91" className="FullBody" id="back-shoulders-a1" src={backshouldersA} alt="male-17" onClick={() => { handleClick("BackshouldersA", "back-shoulders-a1") }} />
                                <img alt="body-img89" className="FullBody" id="back-shoulders-b2" src={backshouldersB} alt="male-18" onClick={() => { handleClick("BackshouldersB", "back-shoulders-a2") }} />
                                <img alt="body-img87" className="FullBody" id="triceps-a1" src={tricepsA} alt="male-19" onClick={() => { handleClick("TricepsA", "triceps-a1") }} />
                                <img alt="body-img86" className="FullBody" id="triceps-b2" src={tricepsB} alt="male-20" onClick={() => { handleClick("TricepsB", "triceps-a2") }} />
                                <img alt="body-img85" className="FullBody" id="back-lats-a1" src={backLatsA} alt="male-21" onClick={() => { handleClick("LatsA", "back-lats-a1") }} />
                                <img alt="body-img84" className="FullBody" id="back-lats-b2" src={backLatsB} alt="male-22" onClick={() => { handleClick("LatsB", "back-lats-a2") }} />
                                <img alt="body-img83" className="FullBody" id="back-lower1" src={backlower} alt="male-23" onClick={() => { handleClick("LowerBack", "back-lower1") }} />
                                <img alt="body-img82" className="FullBody" id="back-forearms-a1" src={backforearmsA} alt="male-24" onClick={() => { handleClick("BackforearmsA", "back-forearms-a1") }} />
                                <img alt="body-img81" className="FullBody" id="back-forearms-b2" src={backforearmsB} alt="male-25" onClick={() => { handleClick("BackforearmsB", "back-forearms-a2") }} />
                                <img alt="body-img80" className="FullBody" id="back-glutes1" src={backglutes} alt="male-26" onClick={() => { handleClick("Glutes", "back-glutes1") }} />
                                <img alt="body-img79" className="FullBody" id="back-hamstrings-a1" src={backhamstringsA} alt="male-27" onClick={() => { handleClick("HamstringsA", "back-hamstrings-a1") }} />
                                <img alt="body-img78" className="FullBody" id="back-hamstrings-a2" src={backhamstringsB} alt="male-28" onClick={() => { handleClick("HamstringsB", "back-hamstrings-a2") }} />
                                <img alt="body-img76" className="FullBody" id="back-calves-a1" src={backcalvesA} alt="male-29" onClick={() => { handleClick("BackcalvesA", "back-calves-a1") }} />
                                <img alt="body-img75" className="FullBody" id="back-calves-b2" src={backcalvesB} alt="male-30" onClick={() => { handleClick("BackcalvesB", "back-calves-a2") }} />
                            </div>

                            <div id="muscle-map"><img alt="body-img" id="background" src={background} alt="male-background-1" />
                                <img alt="body-img74" className="FullBody" id="traps-a" src={TrapsLeft} alt="male-31" onClick={() => { handleClick("TrapsA", "traps-a") }} />
                                <img alt="body-img73" className="FullBody" id="traps-b" src={Trapsright} alt="male-32" onClick={() => { handleClick("TrapsB", "traps-b") }} />
                                <img alt="body-img72" className="FullBody" id="shoulders-a" src={DeltoidsA} alt="male-33" onClick={() => { handleClick("ShoulderA", "shoulders-a") }} />
                                <img alt="body-img71" className="FullBody" id="shoulders-b" src={DeltoidsB} alt="male-34" onClick={() => { handleClick("ShoulderB", "shoulders-b") }} />
                                <img alt="body-img70" className="FullBody" id="pecs" src={Pecs} alt="male-35" onClick={() => { handleClick("Pecs", "pecs") }} />
                                <img alt="body-img69" className="FullBody" id="biceps-a" src={bicepsA} alt="male-36" onClick={() => { handleClick("BicepsA", "biceps-a") }} />
                                <img alt="body-img68" className="FullBody" id="biceps-b" src={bicepsB} alt="male-37" onClick={() => { handleClick("BicepsB", "biceps-b") }} />
                                <img alt="body-img67" className="FullBody" id="forearm-a" src={forearmA} alt="male-38" onClick={() => { handleClick("ForearmsA", "forearm-a") }} />
                                <img alt="body-img65" className="FullBody" id="forearm-b" src={forearmB} alt="male-39" onClick={() => { handleClick("ForearmsB", "forearm-b") }} />
                                <img alt="body-img64" className="FullBody" id="obliques" src={obliques} alt="male-40" onClick={() => { handleClick("Abdominals", "obliques") }} />
                                <img alt="body-img63" className="FullBody" id="quads-a" src={quadsA} alt="male-41" onClick={() => { handleClick("QuadsA", "quads-a") }} />
                                <img alt="body-img62" className="FullBody" id="quads-b" src={quadsB} alt="male-42" onClick={() => { handleClick("QuadsB", "quads-b") }} />
                                <img alt="body-img61" className="FullBody" id="calves-a" src={calvesA} alt="male-43" onClick={() => { handleClick("CalvesA", "calves-a") }} />
                                <img alt="body-img59" className="FullBody" id="calves-b" src={calvesB} alt="male-44" onClick={() => { handleClick("CalvesB", "calves-b") }} />
                                <img alt="body-img58" className="FullBody" id="back-traps-a" src={backtrapsA} alt="male-45" onClick={() => { handleClick("BacktrapsA", "back-traps-a") }} />
                                <img alt="body-img57" className="FullBody" id="back-traps-b" src={backtrapsB} alt="male-46" onClick={() => { handleClick("BacktrapsB", "back-traps-b") }} />
                                <img alt="body-img56" className="FullBody" id="back-shoulders-a" src={backshouldersA} alt="male-47" onClick={() => { handleClick("BackshouldersA", "back-shoulders-a") }} />
                                <img alt="body-img54" className="FullBody" id="back-shoulders-b" src={backshouldersB} alt="male-48" onClick={() => { handleClick("BackshouldersB", "back-shoulders-b") }} />
                                <img alt="body-img53" className="FullBody" id="triceps-a" src={tricepsA} alt="male-49" onClick={() => { handleClick("TricepsA", "triceps-a") }} />
                                <img alt="body-img52" className="FullBody" id="triceps-b" src={tricepsB} alt="male-50" onClick={() => { handleClick("TricepsB", "triceps-b") }} />
                                <img alt="body-img51" className="FullBody" id="back-lats-a" src={backLatsA} alt="male-51" onClick={() => { handleClick("LatsA", "back-lats-a") }} />
                                <img alt="body-img101" className="FullBody" id="back-lats-b" src={backLatsB} alt="male-52" onClick={() => { handleClick("LatsB", "back-lats-b") }} />
                                <img alt="body-img102" className="FullBody" id="back-lower" src={backlower} alt="male-53" onClick={() => { handleClick("LowerBack", "back-lower") }} />
                                <img alt="body-img103" className="FullBody" id="back-forearms-a" src={backforearmsA} alt="male-54" onClick={() => { handleClick("BackforearmsA", "back-forearms-a") }} />
                                <img alt="body-img104" className="FullBody" id="back-forearms-b" src={backforearmsB} alt="male-55" onClick={() => { handleClick("BackforearmsB", "back-forearms-b") }} />
                                <img alt="body-img105" className="FullBody" id="back-glutes" src={backglutes} alt="male-56" onClick={() => { handleClick("Glutes", "back-glutes") }} />
                                <img alt="body-img106" className="FullBody" id="back-hamstrings-a" src={backhamstringsA} alt="male-57" onClick={() => { handleClick("HamstringsA", "back-hamstrings-a") }} />
                                <img alt="body-img107" className="FullBody" id="back-hamstrings-b" src={backhamstringsB} alt="male-58" onClick={() => { handleClick("HamstringsB", "back-hamstrings-b") }} />
                                <img alt="body-img108" className="FullBody" id="back-calves-a" src={backcalvesA} alt="male-59" onClick={() => { handleClick("BackcalvesA", "back-calves-a") }} />
                                <img alt="body-img109" className="FullBody" id="back-calves-b" src={backcalvesB} alt="male-60" onClick={() => { handleClick("BackcalvesB", "back-calves-b") }} />
                            </div>
                        </div>
                    </Col>

                    {/* <Col className="mt-5" md={8} lg={8} sm={24} xs={24}><p>Joint Selected </p>
                        {
                            BodyParts.map((val, id) => {
                                return (
                                    <p key={id}>{val}</p>
                                )
                            })
                        }
                        {JSON.stringify(MuscleJoint)}

                    </Col> */}
                </Row>
            </>

            }
          

        </>
    )
}

export default DummyBody;
