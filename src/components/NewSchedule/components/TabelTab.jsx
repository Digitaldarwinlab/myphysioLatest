import { useState } from 'react'
//component
import Month from './Month';
import Day from './day';
import Week from "./Week"
//ant design
import { Tabs } from 'antd';
import { DayDatePicker, WeekDatePicker, MonthDatePicker } from './datePicker/DatePicker';

import moment from 'moment'

const { TabPane } = Tabs;


export default function TabelTab({ setIsVisible }) {
  const [tab, setTab] = useState("1")
//state lifting  and prop drilling
const [day, setDay] = useState(moment())

  // Toggle Picker
  const operations = (tab === "1" && <DayDatePicker day={day} setDay={setDay}/>) || (tab === "2" && <WeekDatePicker />) || (tab === "3" && <MonthDatePicker />);

  return (
    <div className='tab'>
      <Tabs onChange={(value) => setTab(value)} defaultActiveKey="1" type="card" tabBarExtraContent={operations} size="large">
        <TabPane tab="Day" key="1">
          <Day day={day}  setIsVisible={setIsVisible} />
        </TabPane>
        <TabPane tab="Week" key="2">
          <Week setIsVisible={setIsVisible} />
        </TabPane>
        <TabPane tab="Month" key="3">
          <Month setIsVisible={setIsVisible} />
        </TabPane>
      </Tabs>
    </div>
  )
}
