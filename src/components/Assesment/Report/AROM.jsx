import { Col, Row, Table } from 'antd'
import React, { useEffect } from 'react'
import { tableLabels } from '../../episode-visit-details/Assessment/AssessmentList';
import H3 from '../components/H3';


const AROM = ({ Anterior_AI_Data, RightLateral_AI_Data, LeftLateral_AI_Data, RomVisibility, tableData1, tableData2, latL, latR, RomVisibilityL, RomVisibilityR }) => {
    console.log("state ", LeftLateral_AI_Data)
    // useEffect(() => {
    //     document.getElementsByClassName('ant-table-cell')[0].classList.add('padding-0')
    //     document.getElementsByClassName('ant-table-cell')[1].classList.add('padding-0')
    //     document.getElementsByClassName('ant-table-cell')[2].classList.add('padding-0')
    //     return () => {
    //         document.getElementsByClassName('ant-table-cell')[0].classList.remove('padding-0')
    //         document.getElementsByClassName('ant-table-cell')[1].classList.remove('padding-0')
    //         document.getElementsByClassName('ant-table-cell')[2].classList.remove('padding-0')
    //     }
    // }, [])

    // const data = {
    //     AI_data: {
    //         "AROM": {
    //             "angles": {
    //                 "leftShoulder": {
    //                     "max": 16.019487380981445,
    //                     "min": 11.197139739990234
    //                 },
    //                 "rightShoulder": {
    //                     "max": 17.055248260498047,
    //                     "min": 0.7604969143867493
    //                 },
    //                 "leftElbow": {
    //                     "max": 28.05181884765625,
    //                     "min": 11.480712890625
    //                 },
    //                 "rightElbow": {
    //                     "max": 23.228515625,
    //                     "min": 11.244781494140625
    //                 },
    //                 "leftPelvic": {
    //                     "max": 10.491302490234375,
    //                     "min": 0.8857879638671875
    //                 },
    //                 "rightPelvic": {
    //                     "max": 10.491386413574219,
    //                     "min": 0.885833740234375
    //                 },
    //                 "leftHipAdductionAbduction": {
    //                     "max": 18.481727600097656,
    //                     "min": 1.9769821166992188
    //                 },
    //                 "rightHipAdductionAbduction": {
    //                     "max": 13.928535461425781,
    //                     "min": 1.4103851318359375
    //                 },
    //                 "leftNeck": {
    //                     "max": 18.308021545410156,
    //                     "min": 2.1268234252929688
    //                 },
    //                 "rightNeck": {
    //                     "max": 18.308013916015625,
    //                     "min": 2.1268157958984375
    //                 }
    //             }
    //         }
    //     }
    // }
    const columns = [
        {
            title: "Angles",
            dataIndex: "angles",
            key: "angles",
        },
        {
            title: "Min",
            dataIndex: "min",
            key: "min",
            render: (number) => Math.round(number),
        },
        {
            title: "Max",
            dataIndex: "max",
            key: "max",
            render: (number) => Math.round(number),
        },
    ];
    return (
        <Row justify='space-between' className="bg-theme-1x div-border-1x arom-report">
            <H3 style={{ display: RomVisibility }} title={"Anterior"} />
            <Col style={{ display: RomVisibility }} className="m1-1x" span={24}>
                <Table
                    scroll={{ y: 300 }}
                    pagination={false}
                    columns={columns}
                    dataSource={
                        Anterior_AI_Data && Anterior_AI_Data != null && Object.keys(Anterior_AI_Data).length > 0
                            ? Object.keys(
                                Anterior_AI_Data[
                                Object.keys(Anterior_AI_Data)[0]
                                ]["angles"]
                            ).map((item, index) => {
                                let t = {};
                                t["key"] = index;
                                t["angles"] = tableLabels[
                                    item
                                ]
                                    ? tableLabels[item]
                                    : "Not Available";
                                t["min"] = Math.round(
                                    Anterior_AI_Data[
                                        Object.keys(
                                            Anterior_AI_Data
                                        )[0]
                                    ]["angles"][item].min
                                );
                                t["max"] = Math.round(
                                    Anterior_AI_Data[
                                        Object.keys(
                                            Anterior_AI_Data
                                        )[0]
                                    ]["angles"][item].max
                                );
                                return t;
                            })
                            : []
                    }
                />
            </Col>
            <Col style={{ display: RomVisibilityL }} className="m1-1x" span={11}>
                <H3 title={"Left"} />
                <Table
                    scroll={{ y: 300 }}
                    pagination={false}
                    columns={columns}
                    dataSource={
                        LeftLateral_AI_Data && LeftLateral_AI_Data != null && Object.keys(LeftLateral_AI_Data).length > 0
                            ? Object.keys(
                                LeftLateral_AI_Data[
                                Object.keys(LeftLateral_AI_Data)[0]
                                ]["angles"]
                            ).map((item, index) => {
                                let t = {};
                                t["key"] = index;
                                t["angles"] = tableLabels[
                                    item
                                ]
                                    ? tableLabels[item]
                                    : "Not Available";
                                t["min"] = Math.round(
                                    LeftLateral_AI_Data[
                                        Object.keys(
                                            LeftLateral_AI_Data
                                        )[0]
                                    ]["angles"][item].min
                                );
                                t["max"] = Math.round(
                                    LeftLateral_AI_Data[
                                        Object.keys(
                                            LeftLateral_AI_Data
                                        )[0]
                                    ]["angles"][item].max
                                );
                                return t;
                            })
                            : []
                    }
                />
            </Col>
            <Col style={{ display: RomVisibilityR }} className="m1-1x" span={11}>
                <H3 title={"Right"} />
                <Table
                    scroll={{ y: 300 }}
                    pagination={false}
                    columns={columns}
                    dataSource={
                        RightLateral_AI_Data && RightLateral_AI_Data != null && Object.keys(RightLateral_AI_Data).length > 0
                            ? Object.keys(
                                RightLateral_AI_Data[
                                Object.keys(RightLateral_AI_Data)[0]
                                ]["angles"]
                            ).map((item, index) => {
                                let t = {};
                                t["key"] = index;
                                t["angles"] = tableLabels[
                                    item
                                ]
                                    ? tableLabels[item]
                                    : "Not Available";
                                t["min"] = Math.round(
                                    RightLateral_AI_Data[
                                        Object.keys(
                                            RightLateral_AI_Data
                                        )[0]
                                    ]["angles"][item].min
                                );
                                t["max"] = Math.round(
                                    RightLateral_AI_Data[
                                        Object.keys(
                                            RightLateral_AI_Data
                                        )[0]
                                    ]["angles"][item].max
                                );
                                return t;
                            })
                            : []
                    }
                />
            </Col>
        </Row>
    )
}

export default AROM