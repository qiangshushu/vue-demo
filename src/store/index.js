import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/);
const obj = {};

files.keys().forEach(key => {
  obj[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
  modules: {
    ...obj
  }
});

export default store;
