import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
if (!window.vue) {
  Vue.use(Vuex);
}
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 左边导航列表
    leftMeun: [],
    // 商品id
    index: 0,
    showSide: false,
    // 商品列表
    goodsList: [],
    // 商品条数
    size: 10,
    // 商品类型
    type: "",
    // 存储商品信息
    counterMap: {},
  },
  mutations: {
    setLeftMeun(state, p) {
      state.leftMeun = p;
    },
    setIndex(state, p) {
      state.index = p;
    },
    setShowSide(state) {
      state.showSide = !state.showSide;
    },
    setGoodsList(state, p) {
      state.goodsList = p;
    },
    setType(state, p) {
      state.type = p;
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    // 编辑数量商品
    storageChange(state, { id, value }) {
      // 如果有商品信息
      if (state.counterMap[id]) {
        // 如果传进来的是-1并且购物车里面只有1个，或者直接传进来Infiniti 就直接删除该商品信息
        if ((value === -1 && state.counterMap[id] === 1) || value === -Infinity) {
          Vue.delete(state.counterMap, id);
        } else {
          // 将购物车里的商品和传进来的数量相加
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        // 如果没有该商品信息，直接添加一条商品信息
        Vue.set(state.counterMap, id, 1)
      }
      // 将商品所有信息存放到本地化存储中
      localStorage.setItem("goods", JSON.stringify(state.counterMap))
    }
  },
  actions: {
    // 获取左边列表
    getLeftMeun({ commit }, p) {
      commit("setShowSide");
      api.getMeun(p).then((r) => {
        commit("setLeftMeun", r);
        commit("setShowSide");
      }, (error) => {
        alert(error);
        commit("setShowSide");
      });
    },
    // 获取商品列表
    getGoodsList({ commit, state }, options) {
      
      if (state.showSide) {
        return
      }
      const type = options.type || state.type;
      commit("setType", type);
      return api.goodsList({
        type: state.type, page: options.page,
        size: state.size, sort: options.sort
      }).then((r) => {
        if (r.total > state.goodsList.length) {
          const newGoodsList = state.goodsList.concat(r.list);
          commit("setGoodsList", newGoodsList);
          return true;
        } else {
          return false;
        }
      }, (error) => {
        alert(error);
      });
    },
  },
  modules: {
  }
})
