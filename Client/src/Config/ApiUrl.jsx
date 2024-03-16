import axios from "axios";

export const ApiUrl = axios.create({
    baseURL: "https://win-it-server.vercel.app/",
    // baseURL: "http://localhost:8000/",
    headers: {
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZThiMTYyZjQ1NTU1YjI3MTIzMGI2ZSIsImlhdCI6MTcxMDA1MTcxM30.10C2R0THEBUN4DrOTu6PA-UOY8sBgzUT31_gD0lVs9Q`,
    },
});
