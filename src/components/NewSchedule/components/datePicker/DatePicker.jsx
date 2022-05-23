import React, { useState,useEffect } from 'react'
import moment from 'moment';
import { CaretRightFilled, CaretLeftOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';

import { useDispatch, useSelector } from "react-redux";

import { CHANGE_MONTH, WEEK_DAY } from '../../actions/types';


function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  return current && current < moment().endOf('day');
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),

  };
}

export const DayDatePicker = ({day,setDay}) => {
  
  const changeRight = () => {
    let demo = moment(day, "DD/MM/YYYY").add(1, "day").format('DD-MM-YY')
    setDay(moment(demo, "DD/MM/YYYY"));

  }
  const changeLeft = () => {

    let demo = moment(day, "DD/MM/YYYY").subtract(1, "day").format('DD-MM-YY')
    setDay(moment(demo, "DD/MM/YYYY"));

  }
  return (
    <div className='cus-cal'>
      <span className='icon-btn' onClick={changeLeft}><CaretLeftOutlined /></span>

      <DatePicker disabledDate={disabledDate}
        disabledTime={disabledDateTime} value={day} id='datePicker' onChange={(value) => { setDay(value) }} format="D MMMM YYYY" />
      <span className='icon-btn' onClick={changeRight}><CaretRightFilled /></span>
    </div>
  )


}

moment.updateLocale('en', {
  months: [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ]
});
export const WeekDatePicker = ({week,setWeek}) => {
  const dispatch = useDispatch()

  const start_date = week.startOf('week').format("D MMM");
  const end_date = week.endOf('week').format("D MMM");

console.log('Start and End', start_date,end_date)

  useEffect(() => {
    dispatch({type:'CALENDER_WEEK',payload:{week:week}});
  }, [])


  const changeRight = () => {
    let demo = moment(week, "DD/MM/YYYY").add(1, "week").format('DD-MM-YY')


    let arr = []
    for (let i = 1; i <= 7; i++) {
      let weekMonth = moment(week).add(i, "day").format("M")
      console.log('weekMonth',weekMonth)
      let weekDay = moment(week).add(i, "day").format("D")
      arr.push(weekDay)

    }
    dispatch({
      type: WEEK_DAY,
      payload: { WeekData: arr },
    });
    setWeek(moment(demo, "DD/MM/YYYY"));
  }

  const changeLeft = () => {

    let demo = moment(week, "DD/MM/YYYY").subtract(1, "week").format('DD-MM-YY')

    let arr = []
    for (let i = 0; i <= 6; i++) {

      let weekDay = moment(week, "DD/MM/YYYY").subtract(1, "week").startOf('week').add(i, "day").format("D")
      arr.push(weekDay)

    }
    dispatch({
      type: WEEK_DAY,
      payload: { WeekData: arr },
    });
    setWeek(moment(demo, "DD/MM/YYYY"));

  }

  let date_val = start_date.slice(0,2) + " - " + end_date

  return (
    <div className='cus-cal'>
      <span className='icon-btn' onClick={changeLeft}><CaretLeftOutlined /></span>

      <DatePicker disabledDate={disabledDate} value={week} format="D MMMM"
        disabledTime={disabledDateTime} id='datePicker' picker="week" placeholder={date_val} onChange={value => {
          setWeek(value);
          dispatch({type:'CALENDER_WEEK',payload:{week:value}});
          console.log(value);
        }} />

      <span className='icon-btn' onClick={changeRight}><CaretRightFilled /></span>
    </div>
  )


}


export const MonthDatePicker = ({month,setMonth}) => {
  const dispatch = useDispatch()
  // const [month, setMonth] =useState(moment())
 

  const changeRight = () => {
    let demo = moment(month, "DD/MM/YYYY").add(1, "month")
    dispatch({
      type: CHANGE_MONTH,
      payload: { MonthData: demo },
    });
    setMonth(moment(demo, "DD/MM/YYYY"));

  }
  const changeLeft = () => {

    let demo = moment(month, "DD/MM/YYYY").subtract(1, "month")
    dispatch({
      type: CHANGE_MONTH,
      payload: { MonthData: demo },
    });
    setMonth(moment(demo, "DD/MM/YYYY"));

  }
  return (
    <div className='cus-cal'>
      <span className='icon-btn' onClick={changeLeft}><CaretLeftOutlined /></span>

      <DatePicker disabledDate={disabledDate}
        disabledTime={disabledDateTime} value={month} id='datePicker' onChange={(value) => { setMonth(value);
          console.log(value);
            dispatch({
          type: CHANGE_MONTH,
          payload: { MonthData: value },
        }); }} format=" MMMM YYYY" />
      <span className='icon-btn' onClick={changeRight}><CaretRightFilled /></span>
    </div>
  )


}



