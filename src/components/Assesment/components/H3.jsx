import { Col } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'

const H3 = ({ image, title, RomVisibility }) => {
    const history = useHistory()
    return (
        <Col style={{ backgroundColor: 'rgb(222, 241, 253)', display: `${RomVisibility}` }} className='h3-1x m1-1x' span={24}>
            <center><span className='m1-1x'>{title}</span></center>
        </Col>
    )
}

export default H3