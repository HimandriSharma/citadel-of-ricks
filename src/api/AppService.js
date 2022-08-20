import axios from "axios";
import { API_BASE_URL } from "./APIConfig";

export const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000
})

export const emptyService = axios.create({
    baseURL: "",
    timeout: 60000
})
