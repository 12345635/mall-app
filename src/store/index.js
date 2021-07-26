import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    leftMeun: [],
    index: 0,
    showSide: false,
    goodsList: [],
    size: 10,
    type: "",
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
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if (value === -1 && state.counterMap[id] === 1) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1)
      }
      localStorage.setItem("goods", JSON.stringify(state.counterMap))
    }
  },
  actions: {
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
    getGoodsList({ commit, state }, options) {
      if (state.showSide) {
        return
      }
      const type = options.type || state.type;
      commit("setType", type);
      return api.goodsList({ type: state.type, page: options.page, size: state.size, sort: options.sort }).then((r) => {
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
