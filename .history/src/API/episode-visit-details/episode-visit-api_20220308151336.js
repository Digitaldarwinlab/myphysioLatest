// import Visit from "./../../components/UtilityComponents/dummyData/episode-visit-dummy/visits.json";
import Episode from "./../../components/UtilityComponents/dummyData/episode-visit-dummy/Episode.json";
import SingleEpisode from "./../../components/UtilityComponents/dummyData/episode-visit-dummy/Single-Episode.json";
//@func - for fetching episodes.
//@param - 
//@return - Fetched Episodes.
export const fetchEpisodes = async (id) => {
    return Episode;
}
//@func - for fetching Single episode.
//@param - id of episode
//@return - Fetched Episodes.
export const fetchSingleEpisode = (id) => {
    return SingleEpisode;
}
//@func - for fetching Visits.
//@param - patient Id
//@return - Fetched Patient Visits.
export const fetchVisits = async (patId) => {
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }

        const response = await fetch(process.env.REACT_APP_API + "/patient_visit/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ id: patId })
        });
        // console.log('inside patient visit api')
        // console.log(patId)
        // console.log(response)
        const data = await response.json();
        // console.log(data)
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Error: " + response.status + response.statusText)
        }
        return data;
    } catch (err) {
        console.log(err, "Error in Fetching Patient Visits");
        return [];
    }
}

const filterCarePlanData = (data) => {
    let newData = [];
    let keyObject = {};
    data.forEach(element => {
        if (element.careplan_code in keyObject) {
            keyObject[element.careplan_code] = [...keyObject[element.careplan_code], element]
        } else {
            keyObject[element.careplan_code] = [element];
        }
    });
    let keys = Object.keys(keyObject);
    keys.forEach((el) => {
        let element = keyObject[el][0];
        element["start_date"] = element.date;
        delete element["date"];
        element["end_date"] = keyObject[el][keyObject[el].length - 1].date;
        newData.push(element);
    });
    return newData;
}
//@func - for fetching CarePlan.
//@param - episode Id
//@return - Fetched Patient Visits.
export const fetchCarePlan = async (eid) => {
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }

        const response = await fetch(process.env.REACT_APP_API + "/get-all-care-plan/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ id: eid })
        });
        const data = await response.json();
        // console.log(data);
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Error: " + response.status + response.statusText);
        }
        return filterCarePlanData(data);
        // return data;
    } catch (err) {
        console.log(err, "Error in Fetching Patient Care Plan");
        return [];
    }
}
//@func - for fetching History.
//@param - 
//@return - Fetched History.
export const fetchHistory = () => {
    console.log("Fetched History");
}
