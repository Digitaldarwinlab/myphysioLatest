import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { DAY_DATE } from '../actions/types';
import { Calendar,Badge } from 'antd';
import moment from 'moment';

export default function Month({ setIsVisible }) {
const dispatch = useDispatch()

let MonthTag  = useSelector(state => state.calender.data);

  const [select, setSelect] = useState(moment())
  let val = useSelector(state => state.month.data);
  useEffect(() => {
    setSelect(val)
   
  })

  const onSelect = (value) => {
  
    dispatch({
      type: DAY_DATE,
      payload:{ dayData: value },
    })
   
    setSelect(value)
    setIsVisible(true)
  }

  let exactDate = moment(MonthTag.date).format('D') 
  let exactMonth = moment(MonthTag.date).format('M') 
  
console.log(MonthTag.patient)
  function getListData(value) {
    
    let listData;
  
    switch (value.date()) {
      
      case  parseInt(exactDate):
        listData = [
          {  content: MonthTag.patient },
        ];
        break;
    
    
      default:
    }
    return listData || [];
  }
  
  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul >
        { listData.map(item => (
          <li key={item.content}>
             <span className='month_data'>
             {item.content} </span>
              
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <Calendar onSelect={onSelect} value={select}  dateCellRender={dateCellRender} />
    </>
  )
}
