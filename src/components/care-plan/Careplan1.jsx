import { Col, Row } from 'antd'
import React from 'react'
import H1 from '../Assesment/components/H1'
import DetailsTab from '../Assesment/DetailsTab'
import arrow from "../../assets/arrow.webp";

const Careplan1 = () => {

    return (
        <Row justify='space-between' className='main-container-1x'>
            <H1 image={arrow} title={'Care plan'} />
            <DetailsTab />
            <Col className='bg-theme-1x m1-1x div-border-1x' span={24}>
            </Col>
        </Row>
    )
}

export default Careplan1