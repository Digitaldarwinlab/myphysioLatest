export const AddVideoConfData = async (data, image = "") => {
    try {
        const headers = {
            Accept: "application/json",
            "Content-type": "application/json",
        };
        const body = {
            image: image,
            AI_Data: data,
        }
        const response = await fetch(process.env.REACT_APP_API + "/add-image", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });

        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.log(err);
        return {}
    }
};

export const GetToken= async (channel ,uid) => {
    try {
        const headers = {
            Accept: "application/json",
            "Content-type": "application/json",
        };
        const response = await fetch(`${process.env.REACT_APP_EXERCISE_URL}/rtc/${channel}/subscriber/uid/${uid}`, {
            method: "GET",
        });

        const data = await response.json();
        var NewToken = data.rtcToken
        return NewToken
    } catch (err) {
        console.log(err);
        return {}
    }
}

export const GetVideoConfData = async (id) => {
    try {
        const headers = {
            Accept: "application/json",
            "Content-type": "application/json",
        };
        const body = {
            image_id: id,
        }
        const response = await fetch(process.env.REACT_APP_API + "/get-image", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });

        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.log(err);
        return {}
    }
};
