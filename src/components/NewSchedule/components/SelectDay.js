import { useEffect, useState } from "react";
import './SelectDay.css'

const SelectDay = ({ day,setActiveDays,activeDays }) => {
    const [isClicked, setClicked] = useState(false);

useEffect(() => {
    if(isClicked){
        setActiveDays(activeDays => [...activeDays,day])
    }else {
        setActiveDays(activeDays => activeDays.filter(eachDay => eachDay !== day))
    }

},[isClicked,day,setActiveDays]);

useEffect(() => {
    if(activeDays.includes(day)){
        setClicked(true);
    }
},[])


    const handleClick = () => {
        setClicked(!isClicked);
    }
    return <div className="dayyy" onClick={handleClick} style={{ backgroundColor: isClicked ? '#C0C0C0' : '' }} >{day.slice(0,3)}</div>
}

export default SelectDay;