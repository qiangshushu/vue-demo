import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import i18n from '@/locale';
import plugin from '@/plugin';

Vue.use(plugin, { store });

new Vue({
  el: '#app',
  data: {
    event: new Vue()
  },
  router,
  i18n,
  store,
  render: h => h(App)
});
