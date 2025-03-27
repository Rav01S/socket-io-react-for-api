import axios from "axios";
import {getSocket} from "../../socketIO.ts";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3500"
})

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
})

axiosClient.interceptors.response.use(res => {
  return res;
}, err => {
  if ((err.status === 401 && err.response.data.message === "Not token") ||
    (err.status === 403 && err.response.data.message === "Invalid token")) {
    localStorage.removeItem("token");
    getSocket().close()
    window.location.reload()
  }

  return Promise.reject(err);
})