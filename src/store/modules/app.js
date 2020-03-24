import Session from '@/utils/session';
import Cookie from '@/utils/cookie';
import api from '@/api';
import { changeLang } from '@/locale';

const app = {
  namespaced: true,
  state: {
    language: Session.get('language') || 'zh', // en|zh
    token: Cookie.get('token') || ''
  },
  mutations: {
    setLanguage: (state, language) => {
      state.language = language;
      Session.set('language', language);
      changeLang(language);
    },
    setToken(state, data) {
      state.token = data;
      Cookie.set('token', data);
    }
  },
  actions: {
    // 获取语言
    reqGetLanguage({ commit }) {
      api.getLanguage().then(res => {
        commit('setLanguage', res.lang);
      });
    },
    // 设置语言
    reqSetLanguage({ commit }, language) {
      api.setLanguage().then(() => {
        commit('setLanguage', language);
      });
    },
    // 登录
    login({ commit }, { vm, username, password }) {
      api.login({ username, password }).then(res => {
        commit('setToken', res.token);
        vm.$router.push({ name: 'index' });
      });
    }
  }
};

export default app;
