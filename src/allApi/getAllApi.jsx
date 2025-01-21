import axios from "axios";
import { ApiUrl, api, state, materialType, vendorType,district, town, area, signup, sign_in, signup_otp_varification, user_otp_varification, book_request, bulk_waste } from "../constant/apiPath";
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

export const gtAllMaterial = async () => {
    try {
        const { data } = await axios.get(ApiUrl + api + materialType);
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

export const getVendor = async () => {
    try {
        const { data } = await axios.get(ApiUrl + api + vendorType);
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}
export const getTown = async (id) => {
    try {
        const { data } = await axios.get(ApiUrl + api + town +`/${id}`);
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

export const Register = async (datas, phoneNumber) => {
    try {
        const requestBody = {
            login_type: datas.id,
            name: datas.name,
            phone: phoneNumber.phone,
            email: datas.email,
            state: datas.state,
            district: datas.district,
            town: datas.town,
            area: datas.area,
            address: datas.address
        };
        const { data } = await axios.post(ApiUrl + api + signup, requestBody);
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

export const Login = async (datas) => {
    try {
        const requestBody = {
            phone: datas,
        };
        const { data } = await axios.post(ApiUrl + api + sign_in, requestBody);
        return data;
    } catch (error) {
        console.error("Error fetching data", error);

        // return error;
    }
}

export const signUpOtp = async (datas, otp) => {
    try {
        const requestBody = {
            user_id: datas,
            otp: otp
        };
        const { data } = await axios.post(ApiUrl + api + signup_otp_varification, requestBody);
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

export const userOtp = async (datas, otp) => {
    try {
        const requestBody = {
            user_id: datas,
            otp: otp
        };
        const { data } = await axios.post(ApiUrl + api + user_otp_varification, requestBody);
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

export const bookRequest = async (datas) => {
    try {
        const headers = {
            Authorization: "Bearer " + JSON.parse(await getToken()),
        };
        const requestBody = {
            user_id: datas,
            material_type: datas,
            vendor_type: datas,
            pickup_date: datas,
            approximate_weight: datas,

        };
        const { data } = await axios.post(ApiUrl + api + book_request, requestBody, { headers });
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

export const bulkWaste = async (datas) => {
    try {
        const headers = {
            Authorization: "Bearer " + JSON.parse(await getToken()),
        };
        const requestBody = {
            user_id:  JSON.parse(await getUserId())
        };
        const { data } = await axios.post(ApiUrl + api + bulk_waste, requestBody, { headers });
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}