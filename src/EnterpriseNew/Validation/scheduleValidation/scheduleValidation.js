const checkStartDate = (startdate) => {
    let error = {};
    if(!startdate){
        error["error"] = "Start Date Must Needed."
    }
    return error;
}
const checkdoctor=(value)=>{

    let error={}
    var matches = value.match(/\d+/g);
    if(matches)
    {
        error["error"] = "Name cannot have number in it"
    }

    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]+/;
    if(format.test(value))
    {
        error["error"] = "Name cannot have Special Characters in it"
    }
 //   console.log(e)
    return error

}
const checkEndDate = (endDate) => {
    let error = {};
    if(!endDate){
        error["error"] = "End Date Must Needed."
    }
    return error;
}
const checkType = (type) => {
    let error = {};
    if(!type){
        error["error"] = "Type Must Needed."
    }
    return error;
}
const checkStatus = (status) => {
    let error = {};
    if(!status){
        error["error"] = "Status Must Needed."
    }
    return error;
}
const checkLocation = (location) => {
    let error = {};
    if(!location){
        error["error"] = "Location Must Needed."
    }
    return error;   
}
const checkReason = (reason) => {
    let error = {};
    if(!reason){
        error["error"] = "Reason Must Be Given."
    }
    return error;
}

const appointmentValid = {
    checkStartDate,
    checkEndDate,
    checkType,
    checkdoctor,
    checkStatus,
    checkLocation,
    checkReason}
export default appointmentValid;
