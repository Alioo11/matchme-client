import { BACKEND_HOST, BACKEND_URL } from "@/constants";
import axios, { CreateAxiosDefaults } from "axios";

const axiosConfig: CreateAxiosDefaults<any> = {
  baseURL: BACKEND_HOST + BACKEND_URL,
};

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;
