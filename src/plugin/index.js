import Vant from 'vant';
import 'normalize.css';
import 'vant/lib/index.css';
import '@/style/index.scss';

import components from '@/components';
import directives from '@/directives';
import filters from '@/filters';

export default {
  async install(Vue) {
    Vue.use(Vant);

    Object.keys(components).forEach(key => {
      var name = key.replace(/(\w)/, v => v.toUpperCase());

      Vue.component(`v${name}`, components[key]);
    });

    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });

    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key]);
    });

    Vue.config.productionTip = false;

    // Vue.prototype.$loading = Vant.service;
    // Vue.prototype.$confirm = Vant.confirm;
    // Vue.prototype.$message = Vant;
  }
};
