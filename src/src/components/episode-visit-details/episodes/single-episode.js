import React, { useState, useEffect } from "react";
import { fetchSingleEpisode } from "../../../API/episode-visit-details/episode-visit-api";
import Loading from './../../UtilityComponents/Loading';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

const fontcolor = {
    color: "#1ABC9C"
}
const SingleEpisode = ({ id, handleShowSingleEpisode }) => {
    const [data, setData] = useState({
        episode: "",
        Diagnosis: "",
        CarePlan: "",
        Medications: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const { episode, Diagnosis, CarePlan, Medications } = fetchSingleEpisode();
        setData({
            ...data,
            episode,
            Diagnosis,
            CarePlan,
            Medications
        });
        setLoading(false);
        // eslint-disable-next-line
    }, []);


    //header 
    const Header = (title, buttonName) => {
        return (
            <div className="px-2 py-2 m-2">
                <Row gutter={[5, 5]}>
                    <Col lg={18} md={18} sm={18} xs={24} className="fw-bold">
                        <h4>{title}</h4>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={24} className="fw-bold text-end">
                        <Button className="btncolor">{buttonName}</Button>
                    </Col>
                </Row>
                <hr />
            </div>
        )
    }

    //Episode Detail
    const EpisodeDetail = () => {
        return (
            <div className="px-2 py-2 m-3">
                <h3 className="fw-bold">
                    <i className="fas fa-arrow-left" style={{ cursor: "pointer" }}
                        onClick={() => handleShowSingleEpisode()}
                        role="button"></i>{" "}
                    Episode {id} : {data.episode.name ? data.episode.name : ""}
                </h3>
                <Row>
                    <Col lg={4} md={4} sm={4} xs={24}>
                        Start Date: {data.episode.start_date ? data.episode.start_date : ""}
                    </Col>
                    <Col lg={20} md={20} sm={20} xs={24}>
                        Status: {data.episode.status ? data.episode.status : ""}
                    </Col>
                </Row>
            </div>
        )
    }

    //Diagnosis Detail
    const DiagnosisDetail = () => {
        return (
            <div className="px-2 py-2 m-2">
                <Row gutter={[5, 5]}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <p className="p fw-bold">Start Date:{" "}
                            <span className="fw-normal">{data.Diagnosis.start_date ? data.Diagnosis.start_date : ""}</span>
                        </p>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <p className="p fw-bold">Start Date:{" "}
                            <span className="fw-normal">{data.Diagnosis.end_date ? data.Diagnosis.end_date : ""}</span>
                        </p>
                    </Col>
                </Row>
                <Row gutter={[5, 2]}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <p className="p fw-bold">Primary Complaint:{" "}
                            <span className="fw-normal">{data.Diagnosis.complaint ? data.Diagnosis.complaint : ""}</span>
                        </p>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Link to="/dashboard" style={fontcolor}>view more</Link>
                    </Col>
                </Row>
            </div>
        )
    }

    //CarePlan 
    const CarePlan = () => {
        return (
            <div className="px-2 py-2 m-2">
                {data.CarePlan.map((plan, index) => {
                    return (
                        <Row gutter={[5, 5]} key={index}>
                            <Col lg={6} md={6} sm={6} xs={6}>
                                <p className="p fw-bold">Plan {index + 1}:{" "}
                                    <span className="fw-normal">{plan.name ? plan.name : ""}</span>
                                </p>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={6}>
                                <p className="p fw-bold">Start Date:{" "}
                                    <span className="fw-normal">{plan.start_date ? plan.start_date : ""}</span>
                                </p>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={6}>
                                <p className="p fw-bold">End Date:{" "}
                                    <span className="fw-normal">{plan.end_date ? plan.end_date : ""}</span>
                                </p>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={6}>
                                <Link to="/dashboard" style={fontcolor}>view more</Link>
                            </Col>
                        </Row>
                    )
                })}
            </div>
        )
    }

    //Medications
    const Medications = () => {
        return (
            <div className="px-2 py-2 m-2">
                {data.Medications.map((plan, index) => {
                    return (
                        <Row gutter={[5, 5]} key={index}>
                            <Col lg={8} md={8} sm={8} xs={8}>
                                <p className="p fw-bold">Med {index + 1}:{" "}
                                    <span className="fw-normal">{plan.med_name ? plan.med_name : ""}</span>
                                </p>
                            </Col>
                            <Col lg={8} md={8} sm={8} xs={8}>
                                <p className="p fw-bold">Start Date:{" "}
                                    <span className="fw-normal">{plan.start_date ? plan.start_date : ""}</span>
                                </p>
                            </Col>
                            <Col lg={8} md={8} sm={8} xs={8}>
                                <p className="p fw-bold">Duration:{" "}
                                    <span className="fw-normal">{plan.duration ? plan.duration : ""}</span>
                                </p>
                            </Col>
                        </Row>
                    )
                })}
            </div>
        )
    }
    return (
        <React.Fragment>
            {loading && <Loading />}
            {data.episode && EpisodeDetail()}
            <hr />
            {Header("Diagnosis", "Questionnaire")}
            {data.Diagnosis && DiagnosisDetail()}
            <hr />
            {Header("Care Plan", "+ Add")}
            {data.CarePlan && CarePlan()}
            <hr />
            {Header("Medications", "+ Add")}
            {data.Medications && Medications()}
        </React.Fragment>
    )
}
export default SingleEpisode;