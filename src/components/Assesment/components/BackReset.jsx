import { Button, Col, Row } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
const BackReset = ({ Reset, resetDisplay }) => {
    const history = useHistory()
    return (
        <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
            <Row justify='end'>
                <div span={8} className='submit-back-btn-grp-1x'>
                    <Button onClick={() => history.goBack()} className=" bg-theme-1x btn-1x">
                        <span className="only-icons-sm-1x">Back</span>
                    </Button>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Button style={{ display: resetDisplay }} className=" bg-theme-1x btn-1x"  onClick={Reset}>
                        <span className="only-icons-sm-1x">Reset</span>
                    </Button>
                </div>
            </Row>

        </Col>
    )
}

export default BackReset