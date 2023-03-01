import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export let baseRoute: string = "";

//baseRoute = "http://127.0.0.1:3100";

export const api: AxiosInstance = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/dpmmixyvq",
});

api.defaults.headers.post["Content-Type"] = "application/json";
//api.defaults.headers.post["Accept"] = "application/json";

/**@alias `getRequest` axios get request base config */
export const getRequest = async (URL: string) => {
  const response = await api.get(`/${URL}`);
  return response.data;
};

/**@alias `putRequest` axios patch request base config */
export const putRequest = async (URL: string, payload: any) => {
  const response = await api
    .put(`/${URL}`, payload)
    .then((response) => response);
  return response;
};


/**@alias `postRequest` axios post request base config */
export const postRequest = async (URL: string, payload: any, config?: AxiosRequestConfig<any>) => {
  const response = await api.post(`/${URL}`, payload, config);
  return response;
}
