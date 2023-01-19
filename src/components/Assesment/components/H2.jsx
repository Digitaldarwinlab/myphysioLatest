import { Col } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'

const H2 = ({ image, title }) => {
    const history = useHistory()
    return (
        <Col style={{backgroundColor:'#def1fd',padding:'10px'}} className='h1-1x m1-1x' span={24}>
            <span className='m1-1x'>{title}</span>
        </Col>
    )
}

export default H2