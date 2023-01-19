import { Button, Col, Row } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
const BackSave = ({ submit ,submitDisplay}) => {
    const history = useHistory()
    return (
        <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
            <Row justify='end'>
                <div span={8} className='submit-back-btn-grp-1x'>
                    <Button className=" bg-theme-1x btn-1x" onClick={() => history.goBack()}>
                        {/* <img className='icons-1x' src={create} /> */}
                        <span className="only-icons-sm-1x">Back</span>
                    </Button>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Button style={{display:submitDisplay}} onClick={submit} className=" bg-theme-1x btn-1x">
                        {/* <img className='icons-1x' src={create} /> */}
                        <span className="only-icons-sm-1x">Submit</span>
                    </Button>
                </div>
            </Row>

        </Col>
    )
}

export default BackSave