import React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;

export default function Dashboard() {
    return (
        <React.Fragment>
            <div style={{minHeight:"30px"}}></div>
            <Title level={2} className="">Dashboard</Title>
        </React.Fragment>
    )
}
