import axios from "axios"
const ins = axios.create({
    baseURL: "https://mallapi.duyiedu.com/goods/",
});
ins.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        appkey: "wangwenming_1624265707110",
    };
    return config;
}, (error) => Promise.reject(error));

ins.interceptors.response.use((response) => {
    if (response.status !== 200) {
        return response.statusText;
    }
    return response.data;
}, (error) => {
    return Promise.reject(error);
})
export default ins;