import {
  getIdFromCookie,
  getEmailFromCookie,
  getNicknameFromCookie,
  getIsLoginFromStorage,
  deleteIsLogin,
  clearAllCookies,
} from '@/utils/cookies';
import {userLogOut} from '@/api/member';

const memberStore = {
  namespaced: true,
  state: {
    accessToken: '',
    id: getIdFromCookie() || '',
    email: getEmailFromCookie() || '',
    nickname: getNicknameFromCookie() || '',
    isLogin: getIsLoginFromStorage() != null,
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    },
    getAccessToken(state) {
      return state.accessToken;
    },
    getId(state) {
      return state.id;
    },
    getEmail(state) {
      return decodeURI(state.email);
    },
    getNickname(state) {
      return decodeURI(state.nickname);
    },
  },
  mutations: {
    SET_ACCESTOKEN(state, accessToken) {
      state.accessToken = accessToken;
    },
    SET_EMAIL(state, email) {
      state.email = email;
    },
    SET_ID(state, id) {
      state.id = id;
    },
    SET_NICKNAME(state, nickname) {
      state.nickname = nickname;
    },
    SET_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    CLEAR_ALL(state) {
      state.accessToken = '';
      state.id = '';
      state.email = '';
      state.nickname = '';
      state.isLoginUser = null;
    },
  },
  actions: {
    async LOGOUT({commit}, data) {
      await userLogOut(data);
      clearAllCookies();
      deleteIsLogin();
      commit('CLEAR_ALL');
    },
  },
};

export default memberStore;