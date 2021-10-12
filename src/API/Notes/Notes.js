// Add Notes From Dashboard
export const Add_Notes = async (noteDetail) => {
    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
    try {
        const response = await fetch(process.env.REACT_APP_API + "/add-notes/", {
            headers: headers,
            method: "POST",
            body: JSON.stringify(noteDetail)
        });
        const data = await response.json();
        if (data && data.message) {
            return [true];
        } else {
            return [false, "Error: " + response.status + " " + response.statusText];
        }
    } catch (err) {
        return [false, "Error: 501" + " " + err.message];
    }
}
//get Notes
export const getNotes = async (eid) => {
    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
    try {
        const response = await fetch(process.env.REACT_APP_API + "/get-notes/", {
            headers: headers,
            method: "POST",
            body: JSON.stringify({ id: eid })
        });
        const data = await response.json();
        if (response.status === 200 || response.status === 201) {
            if (data && data[0].notes) {
                console.log(data)
                return data;
            }
            else
                return [];
        } else {
            return [];
        }
    } catch (err) {
        console.log(err, "From Get Notes on Dashboard");
        return [];
    }
}