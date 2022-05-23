import { useEffect, useState } from "react";
import './SelectDay.css';
import { useDispatch } from "react-redux";

const SelectDay = ({ day,setActiveDays,activeDays }) => {
    const [isClicked, setClicked] = useState(false);
    const dispatch = useDispatch();

useEffect(() => {
    if(isClicked){
        setActiveDays(activeDays => [...activeDays,day]);
        dispatch({type:'ADD_DAY',payload:{day}})
    }else {
        setActiveDays(activeDays => activeDays.filter(eachDay => eachDay !== day))
        dispatch({type:'REMOVE_DAY',payload:{day}})
    }

},[isClicked,day,setActiveDays]);

useEffect(() => {
    if(activeDays.includes(day)){
        setClicked(true);
    }
},[])

useEffect(() => {
    for(let eachday of activeDays){
        if(eachday === day){
            setClicked(true);
        }
    }
},[])


    const handleClick = () => {
        setClicked(!isClicked);
    }
    return <div className="dayyy" onClick={handleClick} style={{ backgroundColor: isClicked ? '#C0C0C0' : '' }} >{day[0].toUpperCase() + day.slice(1,3)}</div>
}

export default SelectDay;