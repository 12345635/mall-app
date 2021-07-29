import axios from "./requst"
// 获取二级导航
const getMeun = async (params) => axios.get("/getsidebar", { params });
// 获取商品列表
const goodsList = async ({ type, page, size, sort }) =>
    axios.get("/getGoodsList", { params: { type, page, size, sort } });
// 模糊搜索
const likeSearch = async (params) => axios.get("/likeSearch", { params });
// 搜索
const search = async (params) => axios.get("/search", { params });
// 根据商品列表进行搜索
const getGoodsByIds = async (value) => axios.get("/getGoodsByIds", { params: { value: value } });
export default {
    getMeun,
    goodsList,
    likeSearch,
    search,
    getGoodsByIds
}