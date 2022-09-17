export const DropdownApi= async (value) => {
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }

        const response = await fetch(process.env.REACT_APP_API + "/dropdown", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ route: value })
        });
        const data = await response.json();

        if (response.status !== 200 && response.status !== 201) {
            return [];
        }
        return data;
    } catch (err) {
        return [];
    }
}