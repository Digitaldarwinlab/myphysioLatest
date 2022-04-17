//@ function - for clinic pin code valdation
const checkPinCodeValidation = (value) => {
    let error = {};
    if(!value){
        error["error"] = "Zip code Can't be empty field."
        return error;
    }
    const validName = new RegExp('^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$');
    if(!validName.test(value)){
        error["error"] = "Invalid Pin code";
    }
    return error;
}
//@func - for checking Clinic Date
const checkClinicDateValidation = (value) => {
    let error = {};
    if(!value) {
        error["error"] = "Date must be filled."
        return error;
    }
    var varDate = new Date(value);
    var today = new Date();
    if(varDate>=today){
        error["error"] = "Date Can't be a future Date."
    }
    return error;
}
const ClinicValidation = {
    checkPinCodeValidation,
    checkClinicDateValidation
}
export default ClinicValidation;