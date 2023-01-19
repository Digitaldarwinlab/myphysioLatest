import { useState } from 'react'
//component
import Month from './Month';
import Day from './day';
import Week from "./Week"
//ant design
import { Tabs } from 'antd';
import { DayDatePicker, WeekDatePicker, MonthDatePicker } from './datePicker/DatePicker';

import moment from 'moment-timezone';

const { TabPane } = Tabs;


export default function TabelTab({ setIsVisible }) {
  moment.tz.setDefault("Asia/Kolkata")
  const [tab, setTab] = useState("1")
//state lifting  and prop drilling
const [day, setDay] = useState(moment());
const [month,setMonth] = useState(moment());
const [week, setWeek] = useState(moment())


  // Toggle Picker
  const operations = (tab === "1" && <DayDatePicker  day={day}  setDay={setDay}/>) || (tab === "2" && <WeekDatePicker week={week} setWeek={setWeek} />) || (tab === "3" && <MonthDatePicker month={month} setMonth={setMonth} />);

  return (
    <div className='tab'>
      <Tabs onChange={(value) => setTab(value)} defaultActiveKey="1" type="card" tabBarExtraContent={operations} size="medium">
        <TabPane tab="Day" key="1">
          <Day day={day}  setIsVisible={setIsVisible} />
        </TabPane>
        <TabPane tab="Week" key="2">
          <Week setIsVisible={setIsVisible} currentWeek={week}/>
        </TabPane>
        <TabPane tab="Month" key="3">
          <Month setIsVisible={setIsVisible} month={month} setMonth={setMonth} />
        </TabPane>
      </Tabs>
    </div>
  )
}
