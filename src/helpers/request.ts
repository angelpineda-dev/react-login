import axios from "axios";


interface IrequestData {
    endpoint: string;
    method?: 'get' | 'post' | 'put' | 'delete';
    data?: object;
    headers?: object;
}

const BASE_URL = 'http://localhost:8080/api';

async function requestData({ method = 'get', endpoint, data = {}, headers = {'Content-type': 'application/json'} }:IrequestData) {

    try {
        const response = await axios({
            method,
            url: BASE_URL + endpoint,
            data,
            headers

        });

        if(response?.response?.status == 400){
            throw response;
        }

        return response?.data;

    } catch (error) {

        return error;
    }
}

export default requestData;