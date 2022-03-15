import { RRule } from "rrule";
import fetch from "isomorphic-fetch";


//Recurrence Rule Logic 
const GenerateRecurrenceEvents = (recrule, date) => {
    // console.log(date);
    date = JSON.stringify(date);
    // console.log(date);
    let dateVal = date.split(".");
    // console.log(dateVal);
    date = dateVal[0];
    // console.log(date);
    for (let i = 0; i < 3; i++) {
        date = date.replace(":", "");
        date = date.replace("-", "");
    }
    // console.log(date);
    date = date.substring(1);
    // console.log(date);
    // console.log(recrule);

    //  byhour: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const rule = new RRule.fromString(
        "DTSTART;TZID=Asia/Kolkata:" + date + "\n" + "RRULE:" + recrule).all();
const originalString =     "DTSTART;TZID=Asia/Kolkata:" + date + "\n" + "RRULE:" + recrule;
if (recrule.includes("HOURLY")) {
    originalString.concat(";BYHOUR=8,9,10,11,12,13,14,15,16,17,18,19,20");
}
const rrule = RRule.fromString(originalString)
    const backToString = new RRule({ ...rrule.options }).toString()

    // console.log(backToString);
    // console.log(rule);
    return rule;
};

export const getEndDate = (duration) => {
    let value = duration.split(" ");
    let endDate;
    if (value[1] === "hour")
        endDate = parseInt(value[0]) * 60 * 60 * 1000;
    else
        endDate = parseInt(value[0]) * 60 * 1000;
    return endDate;
}
//Data with no recurrence 
const noRecurrence = (data) => {
    const id = JSON.parse(localStorage.getItem("userId"));
    return [{
        pp_ed_id: data.episode,
        visit_number: 2,
        visit_type: data.complaint,
        notes: data.notes,
        status: data.status,
        location: data.location,
        video_link: data.video_link,
        appointment_detail: {
            startDate: data.startDate,
            start_time: new Date(data.startDate).toLocaleTimeString(),
            end_time: new Date(new Date(data.startDate).getTime() + getEndDate(data.duration)).toLocaleTimeString(),
            allDay: data.allDay,
            duration: data.duration
        },
        created_by: id
    }];
}
//Seperate Recurrence rule Data
const seperateVisitData = (data, update = false) => {
    const id = JSON.parse(localStorage.getItem("userId"));
    try {
        if (!data.recurrenceRule) {
            const newData = noRecurrence(data);
            if (update) {
                newData[0]["pp_vd_id"] = data.id;
            }
            return newData;
        } else {
            // console.log("new Date(data.startDate) :"+new Date(data.startDate));
            const generatedData = GenerateRecurrenceEvents(data.recurrenceRule, new Date(data.startDate));
            let newData = [];
            // console.log(generatedData.length);
            for (let i = 0; i < generatedData.length; i++) {
                // console.log("start time->"+new Date(generatedData[i]).toLocaleTimeString());
                // console.log("end time->"+new Date(new Date(generatedData[i]).getTime() + getEndDate(data.duration)).toLocaleTimeString());
                let newVisitData = {
                    pp_ed_id: data.episode,
                    visit_number: 2,
                    visit_type: data.complaint,
                    notes: data.notes,
                    status: data.status,
                    location: data.location,
                    video_link: data.video_link,
                    appointment_detail: {
                        startDate: generatedData[i],
                        start_time: new Date(generatedData[i]).toLocaleTimeString(),
                        end_time: new Date(new Date(generatedData[i]).getTime() + getEndDate(data.duration)).toLocaleTimeString(),
                        allDay: data.allDay,
                        duration: data.duration
                    },
                    created_by: id
                }
                if (update) {
                    newVisitData["pp_vd_id"] = data.id;
                }
                newData.push(newVisitData);
            }
            return newData;
        }
    } catch (err) {
        // console.log(err);
    }
}
//get Visit
export const GetVisit = async () => {
    try {
        const headers = {
            "Accept": 'application/json',
            "Content-type": "application/json"
        }
        const id = JSON.parse(localStorage.getItem("userId"));

        const response = await fetch(process.env.REACT_APP_API + "/get_visit_physio/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ id: id })
        });
        if (response.status !== 200 && response.status !== 201) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // console.log(error);
        return [];
    }
}
//@Add Visit 
//@param Visit details
//@return Message.
export const AddVisit = async (details) => {
    // console.log('Add   :')
   // console.log(details)

 // aswin 10/16/2021 //
 sessionStorage.removeItem('newDate')
 // aswin 10/16/2021 //
    
   

  
    var allVisitData = seperateVisitData(details);
   // // console.log(allVisitData)
   if(details.location!=='Video Conference')
    {  

            
            if(allVisitData[0].video_link ){
                allVisitData[0].video_link='' 
            }
            // console.log(allVisitData)
    }
    try {
        const headers = {
            "Accept": 'application/json',
            "Content-type": "application/json"
        }
        const response = await fetch(process.env.REACT_APP_API + "/add_visit/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(allVisitData)
        });
        if (response.status !== 200 && response.status !== 201) {
            return [false, "Error " + response.status + ": " + response.statusText];
        }
        const data = await response.json();
        if (data.message) {
            return [true];
        } else {
            return [false, "Visit Not Added."];
        }
    } catch (err) {
        return [false, "Error 403: " + err.message];
    }
}
//@Update Visit 
//@param Visit details
//@return Message.
export const UpdateVisit = async (details) => {
   //console.log(details)
   console.log('update ',details)
   
//    if(details)
//    {    alert('update')
//        return false
//    }
    const allVisitData = seperateVisitData(details, true);
    if(details.location!=='Video Conference')
    {  

            
            if(allVisitData[0].video_link ){
                allVisitData[0].video_link='' 
            }
            console.log("update 1 ",allVisitData)
    }
    if(details.location==='Video Conferance'){
        if(allVisitData[0].video_link ){
           console.log('update inside video link')
        }
    }
    console.log("update ",allVisitData[0])
    try {
        const headers = {
            "Accept": 'application/json',
            "Content-type": "application/json"
        }
        const response = await fetch(process.env.REACT_APP_API + "/update_visit/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(allVisitData[0])
        });
        if (response.status !== 200 && response.status !== 201) {
            console.log(response)
            return [false, "Error " + response.status + ": " + response.statusText];
        }
        const data = await response.json();
        if (data.message) {
            return [true];
        } else {
            return [false, "Visit Not Updated."];
        }
    } catch (err) {
        return [false, "Error 403: " + err.message];
    }
}

export   const delete_visit= async (id)=>{


    console.log('idd ion api')
    console.log(id)
    
      try {
          const headers = {
              "Accept": 'application/json',
              "Content-type": "application/json"
          }
          const response = await fetch(process.env.REACT_APP_API + "/delete_visit/", {
              method: "POST",
              headers: headers,
              body: JSON.stringify({id:id})
          });
          if (response.status !== 200 && response.status !== 201) {
              console.log(response)
              return [false, "Error " + response.status + ": " + response.statusText];
          }
          const data = await response.json();
          if (data.message) {
              return [true];
          } else {
              return [false, "Visit Not Updated."];
          }
      } catch (err) {
          return [false, "Error 403: " + err.message];
      }
  
  }