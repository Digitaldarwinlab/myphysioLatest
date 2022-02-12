import React from 'react'
import { Collapse, Checkbox } from "antd";
import { 
    Levels,Joints,Muscles,Movement
} from './../../UtilityComponents/dummyData/care-plan-dummy-data/FiltersData';
const { Panel } = Collapse;

export default function Filter({filterExercise,checkedList ,setFilterData}){
    let delLastCheckedList=[]
    for(let i in checkedList.muscels){
        delLastCheckedList.push(checkedList.muscels[i].slice(0,-1))
    }
    const handleFilter = (checked,filterType,filterName) => {
        setFilterData({checked,type:filterType,name:filterName})
        console.log({checked,filterType,filterName})
        filterExercise(checked,filterType,filterName);
    }
    return (
        <Collapse defaultActiveKey={['1','2']}>
            <Panel header="Difficulty Level" key="1" showArrow={false}>
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
            </Panel>
            {/* <Panel header="Muscels" key="3" showArrow={false}>
                <ul>
                    {Muscles.map((value, index) => {
                        return (
                            <li key={index} >
                                <Checkbox
                                checked={checkedList.muscels.indexOf(value) !== -1 || 
                                         delLastCheckedList.indexOf(value) !== -1}
                                 onChange={(e)=>handleFilter(e.target.checked,"muscels",value)}>{value}</Checkbox>
                            </li>
                        )
                    })}
                </ul>
            </Panel> */}
            {/* <Panel header="Direction Of Movement" key="4" showArrow={false}>
                <ul>
                    {Movement.map((value, index) => {
                        return (
                            <li key={index} >
                                <Checkbox 
                                checked={checkedList.movement.indexOf(value) !== -1}
                                onChange={(e)=>handleFilter(e.target.checked,"movement",value)}>{value}</Checkbox>
                            </li>
                        )
                    })}
                </ul>
            </Panel> */}
        </Collapse>
    )
}
