import { RRule } from "rrule";
let colors = ['#cb6bb2','#56ca85','#1e90ff','#ff9747','#f05797','#2a9010'];

const dummyData = {
  id:1,
  startDate:new Date('2021-05-25T21:00:00.000Z'),
  endDate:new Date('2021-05-25T22:51:00.000Z'),
  allDay:false,
  complaint:"Other",
  status:"Trauma",
  location:"Pune",
  notes:"Got Fracture",
  color:colors[Math.floor(Math.random()*colors.length)],
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TH;COUNT=10',
  patient:"Swapnil Agrawal (pqkrj)"
}


//Logic 
const GenerateRecurrenceEvents = (recrule,date) => {
  date = JSON.stringify(date);
  let dateVal = date.split(".");
  date = dateVal[0];
  for(let i=0;i<3;i++){
    date = date.replace(":","");
    date = date.replace("-","");
  }
  date = date.substring(1);
  const rule = new RRule.fromString(
    "DTSTART;TZID=Asia/Kolkata:" + date + "\n"+ "RRULE:" + recrule
  ).all();
  // console.log(rule);
  return rule;
};

export const getData = () => {
  return localStorage.getItem("data")?JSON.parse(localStorage.getItem("data")):[];
}
export const addData = (data) => {
  try{
    const prevData = localStorage.getItem("data")?JSON.parse(localStorage.getItem("data")):[];
    if(!data.recurrenceRule){
        const newData = {
          id:(prevData.length !== 0)?prevData[prevData.length-1].id+1:1,
          startDate:new Date(data.startDate),
          endDate:new Date(data.endDate),
          allDay:data.allDay,
          complaint:data.complaint,
          status:data.status,
          location:data.location,
          notes:data.notes,
          patient:data.patient,
          episode:data.episode,
          color:colors[Math.floor(Math.random() *colors.length)],
          recurrenceRule:""
        }
        prevData.push(newData);
      }else{
        const generatedData = GenerateRecurrenceEvents(data.recurrenceRule,new Date(data.startDate));
        data["recurrenceRule"] = "";
        let lastId = (prevData.length !== 0)?prevData[prevData.length-1].id+1:1;
        let newData = [];
        for(let i = 0;i<generatedData.length;i++){
          newData = [...newData,{...data}];
          newData[i]["id"] = lastId;
          newData[i]["startDate"] = generatedData[i];
          lastId = newData[i].id + 1;
        }
        for(let i = 0;i<newData.length;i++){
          prevData.push(newData[i]);
        }
      }
      localStorage.setItem("data",JSON.stringify(prevData));
  }catch(err){
    console.log(err);
  }
}

export const UpdateData = (data) => {
  try{
    const prevData = localStorage.getItem("data")?JSON.parse(localStorage.getItem("data")):[dummyData];
    let index = -1;
    for(let i = 0;i<prevData.length;i++){
      if(prevData[i].id === data.id){
        index = i;
        break;
      }
    }
    prevData[index].allDay = data.allDay
    prevData[index].startDate = new Date(data.startDate)
    prevData[index].endDate = new Date(data.endDate)
    prevData[index].complaint = data.complaint
    prevData[index].status = data.status
    prevData[index].location = data.location;
    prevData[index].notes = data.notes;
    prevData[index].patient = data.patient;
    prevData[index].episode = data.episode;
    prevData[index].recurrenceRule = data.recurrenceRule;
    localStorage.setItem("data",JSON.stringify(prevData));
  }catch(err){
    console.log(err);
  }
}

export const deleteData  = (id) => {
  try {
    const prevData = localStorage.getItem("data")?JSON.parse(localStorage.getItem("data")):[];
    let index = -1;
    for(let i = 0;i<prevData.length;i++){
      if(prevData[i].id === id){
        index = i;
        break;
      }
    }
    if(index !== -1){
      prevData.splice(index,1);
    }
    localStorage.setItem("data",JSON.stringify(prevData));
  }catch(err){
    console.log(err);
  }
}


// recurrenceRule: "FREQ=YEARLY;BYMONTHDAY=19;BYMONTH=6;INTERVAL=3;UNTIL=20210619T182959Z"
// recurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TH;COUNT=10"
// recurrenceRule: "FREQ=HOURLY;INTERVAL=2;UNTIL=20210625T182959Z"
// recurrenceRule: "FREQ=MONTHLY;BYMONTHDAY=20;INTERVAL=5;COUNT=3"

