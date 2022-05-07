import React from 'react'
import { useSelector } from 'react-redux';

export default function Week({ setIsVisible }) {
    let Arr = useSelector(state => state.weekReducer);
    const weeks = [

        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ]
    const Time = [
        "07:00 am",
        "08:00 am",
        "09:00 am",
        "10:00 am",
        "11:00 am",
        "12:00 pm",
        "01:00 pm",
        "02:00 pm",
        "03:00 pm",
        "04:00 pm",
        "05:00 pm",
        "06:00 pm",
        "07:00 pm",
        "08:00 pm",
        "09:00 pm",
        "10:00 pm",
        "11:00 pm"
    ]

    return (
        <>
            <div className='container'>
                <table>
                    <thead >
                        <tr >
                            <th className='week_headcol'> </th>
                            {weeks.map((week, i) => (
                                <td key={i} className='week_head'>{week} {Arr[i]}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        <tr  ><td className='all_day'>
                            All Days
                        </td>
                            {
                                weeks.map((week, i) => (
                                    <td key={i} onClick={() => {
                                        setIsVisible(true)
                                    }} className='all-border' id={week}
                                    ></td>
                                ))
                            }
                        </tr>

                        {
                            Time.map((time, i) => (
                                <React.Fragment key={i}>
                                    <tr className=''>
                                        <td data-content={time} className='tabel_head'></td>
                                        {
                                            weeks.map((week, i) => (
                                                <td key={i} onClick={() => {
                                                    setIsVisible(true)
                                                }} className='week_line' id={time}
                                                ></td>
                                            ))
                                        }
                                    </tr>
                                    <tr >
                                        <td className='time_subhead' id={`${time[0]}:30`}>{time}</td>
                                        {
                                            weeks.map((week, i) => (
                                                <td key={i} id={time} onClick={() => {
                                                    setIsVisible(true)
                                                }}
                                                    className='week_line'></td>
                                            ))
                                        }
                                    </tr>
                                </React.Fragment>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}
