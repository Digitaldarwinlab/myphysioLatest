import React from 'react'
import { Collapse, Checkbox, Col, Row, Space } from "antd";
import {
    Levels, Joints, Muscles, Movement
} from '../../UtilityComponents/dummyData/care-plan-dummy-data/FiltersData';
const { Panel } = Collapse;

export default function Filter({ filterExercise, checkedList, setFilterData }) {
    let delLastCheckedList = []
    for (let i in checkedList.muscels) {
        delLastCheckedList.push(checkedList.muscels[i].slice(0, -1))
    }
    const handleFilter = (checked, filterType, filterName) => {
        setFilterData({ checked, type: filterType, name: filterName })
        // console.log({checked,filterType,filterName})
        console.log('checking', { checked, filterType, filterName })
        filterExercise(checked, filterType, filterName);
    }
    return (
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Row justify='center' className='care-plan-filter-main-1x'>
                    {/* <div className='care-plan-filter-item-1x' span={12}>
                       
                    </div> */}
                    <span>
                        <b> Difficulty Level : </b>
                    </span>
                    <div className='care-plan-filter-item-1x' span={12}>
                        <ul>
                            {Levels.map((value, index) => {
                                return (
                                    <li key={index} >
                                        <Checkbox
                                            checked={checkedList.difficulty_level.indexOf(value) !== -1}
                                            onChange={(e) => handleFilter(e.target.checked, "difficulty_level", value)}>{value}</Checkbox>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </Row>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Row justify='center' className='care-plan-filter-main-1x'>
                    {/* <div className='care-plan-filter-item-1x' span={12}>
                       
                    </div> */}
                    <span>
                        <b> Joints : </b>
                    </span>
                    <div className='care-plan-filter-item-1x' span={12}>
                        <ul>
                            {Joints.map((value, index) => {
                                return (
                                    <li key={index} >
                                        <Checkbox
                                            checked={checkedList.joints.indexOf(value.value) !== -1}
                                            onChange={(e) => handleFilter(e.target.checked, "joints", value.value)}>{value.name}</Checkbox>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </Row>
            </Col>
            {/* <Panel header="Difficulty Level" key="1" showArrow={false}>
                <ul>
                    {Levels.map((value, index) => {
                        return (
                            <li key={index} >
                                <Checkbox 
                                    checked={checkedList.difficulty_level.indexOf(value) !== -1}
                                onChange={(e)=>handleFilter(e.target.checked,"difficulty_level",value)}>{value}</Checkbox>
                            </li>
                        )
                    })}
                </ul>
            </Panel>
            <Panel header="Joints" key="2" showArrow={false}>
                <ul>
                    {Joints.map((value, index) => {
                        return (
                            <li key={index} >
                                <Checkbox 
                                    checked={checkedList.joints.indexOf(value.value) !== -1}
                                    onChange={(e)=>handleFilter(e.target.checked,"joints",value.value)}>{value.name}</Checkbox>
                            </li>
                        )
                    })}
                </ul>
            </Panel> */}
        </Row>
    )
}
