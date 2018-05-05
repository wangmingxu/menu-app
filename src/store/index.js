// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue';
import Vuex from 'vuex';
import promisify from '@/utils/promisify';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: null,
    code: '',
    signature: '',
    signInfo: null,
    orderDetail: [],
  },
  mutations: {
    setUserInfo: (state, payload) => {
      state.userInfo = payload; // eslint-disable-line
    },
    setCode: (state, payload) => {
      state.code = payload; // eslint-disable-line
    },
    setSignature: (state, payload) => {
      state.signature = payload; // eslint-disable-line
    },
    setSignInfo: (state, payload) => {
      state.signInfo = payload; // eslint-disable-line
    },
    setOrderDetail: (state, payload) => {
      state.orderDetail = payload; // eslint-disable-line
    },
  },
  actions: {
    async getUserInfo({ commit, state }) {
      if (state.userInfo) return state.userInfo;
      const { code } = await promisify(wx.login);
      commit('setCode', code);
      const { userInfo, signature } = await promisify(wx.getUserInfo);
      commit('setSignature', signature);
      commit('setUserInfo', userInfo);
      return userInfo;
    },
  },
});

export default store;
