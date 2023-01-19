import { Col } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'

const H1 = ({ image, title }) => {
    const history = useHistory()
    return (
        <Col className='h1-1x m1-1x' span={24}>
            <img onClick={() => history.goBack()} src={image} style={{ width: '30px' }} />
            <span className='m1-1x'>{title}</span>
        </Col>
    )
}

export default H1