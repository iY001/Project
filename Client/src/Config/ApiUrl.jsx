import axios from "axios";

export const ApiUrl = axios.create({
    baseURL: "https://win-it-server.vercel.app/"
})
