import axios from "axios";

export const ApiUrl = axios.create({
        baseURL: "win-it-server.vercel.app"
    })
