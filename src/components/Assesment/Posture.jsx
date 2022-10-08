import { Alert, Button, Col, Input, Modal, Result, Row, Radio, Checkbox, Space } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import STA from "../.././assets/lateral.webp";
import STL from "../.././assets/sideways-vector.webp";
import SIA from "../.././assets/Front_Sit.webp";
import SIL from "../.././assets/Side_Sit.webp";
import camera from "../.././assets/camera.webp"
import { STATECHANGE } from "../../contextStore/actions/Assesment";
import Loader from "../video-call-screens/Loader";
import './Posture.css'
let frontChecks = {};
let sideChecks = {};
let frontSitChecks = {};
let sideSitChecks = {};
let side = [
    "Flexed Knee",
    "Hyper Extended Knee",
    "Excessive Anterior Pelvic",
    "Forward Head",
    "Lordosis",
    "Kyphosis",
];

let front = [
    "Genu Valgum",
    "Genu Varum",
    "Squinting / cross eyed patella",
    "Grosshoppers eyed platella",
];
let sideSit = [
    "Forward Head Posture",
    "Forwaer Slouch Posture",
    "Kyphotic Spine",
    "Lordotic Spine / Hollow Back",
];

let frontSit = [
    "Head Shift/Tilt",
    "Uneven Shoulder Levels",
    "Pelvic Drop / Upshift",
    "Right Leaning",
    "Left Leaning"
];
class Posture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // url1: bodyImage,
            // url2: side_img,
            // url3: bodySideImage,
            // url4: side_sit_img,
            frontAngles: [0, 0, 0, 0, 0],
            sideAngles: [0, 0, 0, 0],
            frontSitAngles: [0, 0, 0, 0, 0],
            sideSitAngles: [0, 0, 0, 0, 0],
            loader: false,
            notes: "",
            // img: bodyImage,
            standing: {
                anterior: {
                    img: STA,
                    angles: []
                },
                lateral: {
                    img: STL,
                    angles: []
                }
            },
            sitting: {
                anterior: {
                    img: SIA,
                    angles: []
                },
                lateral: {
                    img: SIL,
                    angles: []
                }
            },
            orientation: 1,
            pose_standing: 'Anterior',
            pose_sitting: 'Anterior',
            isAIStart: false,
            mode: 'Standing',
            type: true
        };
    }
    setModelCanvas = () => {
        const video = document.getElementById("video");
        const canvas = document.getElementById("output");
        const options = {
            video,
            videoWidth: 640,
            videoHeight: 480,
            canvas,
            drawLine: true,
        };
        window.darwin.initializeModel(options);
        window.darwin.launchModel();
        window.darwin.stop();
    };
    componentWillUnmount() {
        this.props.Setsidebarshow(true)
    }
    componentDidMount() {
        this.props.Setsidebarshow(false)
        this.setModelCanvas()
    }
    onChangeFront = (value) => {
        console.log("front ", value);
        this.props.FirstAssesment("FrontCheck", value);
        front.map((a) => {
            if (value.includes(a)) {
                frontChecks[a] = 1;
            } else {
                frontChecks[a] = 0;
            }
        });
        this.props.FirstAssesment("frontChecks", frontChecks);
    };
    onChangeSide = (value) => {
        console.log("side ", value);
        this.props.FirstAssesment("SideCheck", value);
        side.map((a) => {
            if (value.includes(a)) {
                sideChecks[a] = 1;
            } else {
                sideChecks[a] = 0;
            }
        });
        this.props.FirstAssesment("sideChecks", sideChecks);
    };
    onChangeSitSide = (value) => {
        console.log("side ", value);
        this.props.FirstAssesment("SideSitCheck", value);
        sideSit.map((a) => {
            if (value.includes(a)) {
                sideSitChecks[a] = 1;
            } else {
                sideSitChecks[a] = 0;
            }
        });
        console.log("side ", sideSitChecks);
        this.props.FirstAssesment("sideSitChecks", sideSitChecks);
    };
    onChangeSitFront = (value) => {
        console.log("front ", value);
        this.props.FirstAssesment("FrontSitCheck", value);
        frontSit.map((a) => {
            if (value.includes(a)) {
                frontSitChecks[a] = 1;
            } else {
                frontSitChecks[a] = 0;
            }
        });
        console.log("side ", frontSitChecks);
        this.props.FirstAssesment("frontSitChecks", frontSitChecks);
    };
    render() {
        return (
            <Row justify='space-between' >
                <Col md={12} lg={14} sm={24} xs={24}>
                    <video
                        id="video"
                        className="video"
                        playsInline
                        style={{ display: "none" }}
                    ></video>
                    <canvas id="output" className="canvas" style={{ width: '100%' }} />
                </Col>
                {this.state.loader && <Loader />}
                <Col className="posture-analytics-tab" md={12} lg={10} sm={24} xs={24}>
                    <Col span={24}>
                        <div className="posture-btn-grp"> <Button onClick={() => {
                            if (!this.state.isAIStart) {
                                window.darwin.restart()
                                window.darwin.selectOrientation(this.state.orientation);
                                this.setState({ isAIStart: true })
                            } else {
                                window.darwin.stop()
                                this.setState({ isAIStart: false })
                            }
                        }} className={this.state.isAIStart ? 'Stop' : 'Start'}>{this.state.isAIStart ? 'Stop' : 'Start'}</Button> <Button
                            disabled={!this.state.isAIStart}
                            onClick={async () => {
                                if (this.state.mode == "Standing") {
                                    if (this.state.pose_standing == 'Anterior') {
                                        this.setState({ loader: true })
                                        darwin.screenShot();
                                        window.scrollTo(0, 0);
                                        const res = await darwin.showAngles();
                                        const canvas = await html2canvas(document.getElementById("output"));
                                        var extra_canvas1 = document.createElement("canvas");
                                        extra_canvas1.setAttribute("width", 180);
                                        extra_canvas1.setAttribute("height", 180);
                                        var ctx1 = extra_canvas1.getContext("2d");
                                        ctx1.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 180, 180);
                                        var dataURL1 = extra_canvas1.toDataURL();
                                        this.setState(prev => ({
                                            standing: {
                                                ...prev.standing,
                                                anterior: {
                                                    img: dataURL1,
                                                    angles: res
                                                }
                                            }
                                        }))
                                        darwin.stop()
                                        this.setState({ loader: false })
                                    }
                                    if (this.state.pose_standing == 'Lateral') {
                                        this.setState({ loader: true })
                                        darwin.screenShot();
                                        window.scrollTo(0, 0);
                                        const res = await darwin.showAngles();
                                        const canvas = await html2canvas(document.getElementById("output"));
                                        var extra_canvas2 = document.createElement("canvas");
                                        extra_canvas2.setAttribute("width", 180);
                                        extra_canvas2.setAttribute("height", 180);
                                        var ctx2 = extra_canvas2.getContext("2d");
                                        ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 180, 180);
                                        var dataURL2 = extra_canvas2.toDataURL();
                                        this.setState(prev => ({
                                            standing: {
                                                ...prev.standing,
                                                lateral: {
                                                    img: dataURL2,
                                                    angles: res
                                                }
                                            }
                                        }))
                                        darwin.stop()
                                        this.setState({ loader: false })
                                    }
                                }
                                if (this.state.mode == "Sitting") {
                                    if (this.state.pose_standing == 'Anterior') {
                                        this.setState({ loader: true })
                                        darwin.screenShot();
                                        window.scrollTo(0, 0);
                                        const res = await darwin.showAngles();
                                        const canvas = await html2canvas(document.getElementById("output"));
                                        var extra_canvas3 = document.createElement("canvas");
                                        extra_canvas3.setAttribute("width", 180);
                                        extra_canvas3.setAttribute("height", 180);
                                        var ctx3 = extra_canvas3.getContext("2d");
                                        ctx3.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 180, 180);
                                        var dataURL3 = extra_canvas3.toDataURL();
                                        this.setState(prev => ({
                                            sitting: {
                                                ...prev.sitting,
                                                anterior: {
                                                    img: dataURL3,
                                                    angles: res
                                                }
                                            }
                                        }))
                                        darwin.stop()
                                        this.setState({ loader: false })
                                    }
                                    if (this.state.pose_standing == 'Lateral') {
                                        this.setState({ loader: true })
                                        darwin.screenShot();
                                        window.scrollTo(0, 0);
                                        const res = await darwin.showAngles();
                                        const canvas = await html2canvas(document.getElementById("output"));
                                        var extra_canvas4 = document.createElement("canvas");
                                        extra_canvas4.setAttribute("width", 180);
                                        extra_canvas4.setAttribute("height", 180);
                                        var ctx4 = extra_canvas4.getContext("2d");
                                        ctx4.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 180, 180);
                                        var dataURL4 = extra_canvas4.toDataURL();
                                        this.setState(prev => ({
                                            sitting: {
                                                ...prev.sitting,
                                                lateral: {
                                                    img: dataURL4,
                                                    angles: res
                                                }
                                            }
                                        }))
                                        darwin.stop()
                                        this.setState({ loader: false })
                                    }
                                }
                            }}
                        ><img className='icons-1x' src={camera} /></Button></div>
                    </Col>
                    <Col span={24}>
                        <div className="posture-pose-tab">
                            <div onClick={() => {
                                this.setState({ mode: 'Standing' })
                                if (this.state.pose_standing == "Anterior") {
                                    this.setState({ orientation: 1 })
                                }
                                if (this.state.pose_standing == "Lateral") {
                                    this.setState({ orientation: 2 })
                                }
                            }} className={this.state.mode == "Standing" ? `active-posture-tab posture-pose-tab-item` : `posture-pose-tab-item`}>
                                Standing
                            </div>
                            <div onClick={() => {
                                this.setState({ mode: 'Sitting' })
                                if (this.state.pose_sitting == "Anterior") {
                                    this.setState({ orientation: 1 })
                                }
                                if (this.state.pose_sitting == "Lateral") {
                                    this.setState({ orientation: 3 })
                                }
                            }} className={this.state.mode == "Sitting" ? `active-posture-tab posture-pose-tab-item` : `posture-pose-tab-item`}>
                                Sitting
                            </div>
                        </div>
                        <div className="posture-position-tab">
                            {this.state.mode == "Standing" && <Radio.Group
                                onChange={(e) => {
                                    this.setState({ pose_standing: e.target.value })
                                    if (e.target.value == "Anterior") {
                                        this.setState({ orientation: 1 })
                                    }
                                    if (e.target.value == "Lateral") {
                                        this.setState({ orientation: 2 })
                                    }
                                }}
                                value={this.state.pose_standing}
                                size="large">
                                <Radio style={{ width: '100px' }} value="Anterior">Anterior </Radio>
                                <Radio style={{ width: '100px' }} value="Lateral">Lateral </Radio>
                            </Radio.Group>}
                            {this.state.mode == "Sitting" && <Radio.Group
                                onChange={(e) => {
                                    this.setState({ pose_sitting: e.target.value })
                                    if (e.target.value == "Anterior") {
                                        this.setState({ orientation: 1 })
                                    }
                                    if (e.target.value == "Lateral") {
                                        this.setState({ orientation: 3 })
                                    }
                                }}
                                value={this.state.pose_sitting}
                                size="large">
                                <Radio style={{ width: '100px' }} value="Anterior">Anterior </Radio>
                                <Radio style={{ width: '100px' }} value="Lateral">Lateral </Radio>
                            </Radio.Group>}
                            {/* <div className="active-posture-position-tab posture-position-tab-item">
                            </div>
                            <text>Anterior</text>
                            <div className="posture-position-tab-item">
                            </div>
                            <text> Lateral</text> */}
                        </div>
                    </Col>
                    {this.state.mode == "Standing" && <> {this.state.pose_standing == 'Anterior' && <><Col span={24}>
                        <div className="posture-angles-tab">
                            <div className="posture-image-tab">
                                {this.state.pose_standing == 'Anterior' && <img className="posture-img-center" src={this.state.standing.anterior.img} />}
                            </div>
                            <div className="posture-angles-list-tab">
                                {this.state.standing.anterior.angles.map(val => <div>{val.label} : {val.angle}</div>)}
                            </div>
                        </div>
                    </Col>
                        <Col span={24}>
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                className="posture-checkbox-grp"
                                onChange={(e) => {
                                    this.onChangeFront(e)
                                }
                                }
                            >
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Checkbox value="Genu Valgum">Genu Valgum</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="Genu Varum">Genu Varum</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="Squinting / cross eyed patella">
                                            Squinting / cross eyed patella
                                        </Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="Grosshoppers eyed platella">
                                            Grosshoppers eyed platella
                                        </Checkbox>
                                    </Col>

                                </Row>
                            </Checkbox.Group>
                        </Col>
                    </>} {this.state.pose_standing == 'Lateral' && <><Col span={24}>
                        <div className="posture-angles-tab">
                            <div className="posture-image-tab">
                                {this.state.pose_standing == 'Lateral' && <img className="posture-img-center" src={this.state.standing.lateral.img} />}
                            </div>
                            <div className="posture-angles-list-tab">
                                {this.state.standing.lateral.angles.map(val => <div>{val.label} : {val.angle}</div>)}
                            </div>
                        </div>
                    </Col>
                        <Col span={24}>
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                className="posture-checkbox-grp"
                                onChange={(e) => this.onChangeSide(e)}
                            >
                                <Row gutter={[16, 16]}>
                                    <Col span={8}>
                                        <Checkbox value="Flexed Knee">Flexed Knee</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Hyper Extended Knee">
                                            Hyper Extended Knee
                                        </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Excessive Anterior Pelvic">
                                            Excessive Anterior Pelvic
                                        </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Forward Head">Forward Head</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Lordosis">Lordosis</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Kyphosis">Kyphosis</Checkbox>
                                    </Col>

                                </Row>
                            </Checkbox.Group>
                        </Col>
                    </>}</>}
                    {this.state.mode == "Sitting" && <> {this.state.pose_sitting == 'Anterior' && <><Col span={24}>
                        <div className="posture-angles-tab">
                            <div className="posture-image-tab">
                                {this.state.pose_sitting == 'Anterior' && <img className="posture-img-center" src={this.state.sitting.anterior.img} />}
                            </div>
                            <div className="posture-angles-list-tab">
                                {this.state.sitting.anterior.angles.map(val => <div>{val.label} : {val.angle}</div>)}
                            </div>
                        </div>
                    </Col>
                        <Col span={24}>
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                className="posture-checkbox-grp"
                                onChange={this.onChangeSitFront}
                            >
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Checkbox value="Head Shift/Tilt">Head Shift/Tilt</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="Uneven Shoulder Levels">Uneven Shoulder Levels</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="Pelvic Drop / Upshift">
                                            Pelvic Drop / Upshift
                                        </Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="Right Leaning">
                                            Right Leaning
                                        </Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="Left Leaning">
                                            Left Leaning
                                        </Checkbox>
                                    </Col>

                                </Row>
                            </Checkbox.Group>
                        </Col>
                    </>} {this.state.pose_sitting == 'Lateral' && <><Col span={24}>
                        <div className="posture-angles-tab">
                            <div className="posture-image-tab">
                                {this.state.pose_sitting == 'Lateral' && <img className="posture-img-center" src={this.state.sitting.lateral.img} />}
                            </div>
                            <div className="posture-angles-list-tab">
                                {this.state.sitting.lateral.angles.map(val => <div>{val.label} : {val.angle}</div>)}
                            </div>
                        </div>
                    </Col>
                        <Col span={24}>
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                className="posture-checkbox-grp"
                                onChange={this.onChangeSitSide}
                            >
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Checkbox value="Forward Head Posture">Forward Head Posture</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="Forwaer Slouch Posture">
                                            Forwaer Slouch Posture
                                        </Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="Kyphotic Spine">
                                            Kyphotic Spine
                                        </Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="Lordotic Spine / Hollow Back">Lordotic Spine / Hollow Back</Checkbox>
                                    </Col>

                                </Row>
                            </Checkbox.Group>
                        </Col>
                    </>}</>}
                    <Col className="posture-notes-tab" span={24}>
                        <Input.TextArea placeholder="Notes"></Input.TextArea>
                    </Col>
                    <Col className="posture-notes-tab" span={24}>
                        <Space className="posture-save"><Button>Back</Button>  <Button>Save</Button></Space>
                    </Col>
                </Col>
            </Row >
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    FirstAssesment: (key, value) => {
        dispatch({
            type: STATECHANGE,
            payload: {
                key,
                value,
            },
        });
    },
});
const mapStateToProps = (state) => ({
    episodeReducer: state.episodeReducer,
    FirstAssesmentReducer: state.FirstAssesment,
    carePlanReducer: state.carePlanRedcucer,
});
export default connect(mapStateToProps, mapDispatchToProps)(Posture)
