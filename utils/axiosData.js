import axios from 'axios'




export const config = {
    headers: {

    // 'Content-Type': `multipart/form-data`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

    }
};

export const axiosData = async (url, data) => {
    const res = await axios.post(url, data);
    // const data = await res.json();
    console.log(res);
    return res
}
