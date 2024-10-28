import axios from "axios";
import { ApiUrl, api, state, district, town, area } from "../constant/apiPath";
import { getToken, getUserId } from "./localStorage";

export const getAllState = async () => {
    try {
        const { data } = await axios.get(ApiUrl + api + state);
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

export const getAllDistrict = async (id) => {
    try {
        const { data } = await axios.get(ApiUrl + api + district + `/${id}`);
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

export const getTown = async (id) => {
    try {
        const { data } = await axios.get(ApiUrl + api + town + `/${id}`);
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}
export const getArea = async (id) => {
    try {
        const { data } = await axios.get(ApiUrl + api + area + `/${id}`);
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}