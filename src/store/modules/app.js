import session from '@/utils/session';
import { xhr, apis } from '@/api';

console.log(xhr, apis);

const app = {
  namespaced: true,
  state: {
    language: session.get('language') || 'zh', // en|zh
    token: session.get('token') || ''
  },
  mutations: {
    setLanguage: (state, language) => {
      state.language = language;
      session.set('language', language);
    },
    setToken(state, data) {
      state.token = data;
      session.set('token', data);
    }
  },
  actions: {
    // 获取语言
    reqGetLanguage({ commit }) {
      api.getLanguage().then(res => {
        commit('setLanguage', res.language ? 'zh' : 'en');
      });
    },
    // 设置语言
    reqSetLanguage({ commit }, language) {
      api.setLanguage().then(() => {
        commit('setLanguage', language);
      });
    },
    // 登录
    login({ commit }, { vm, password, token }) {
      api.login(password, token).then(() => {
        commit('setToken', token);
        vm.$router.push({ name: 'hdr' });
      });
    }
  }
};

export default app;
