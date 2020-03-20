import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import session from '@/utils/session';

Vue.use(Router);

const router = new Router({ mode: 'hash', routes });
const whiteList = ['/login', '/404'];
const LOGIN_PAGE_NAME = 'login';

router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) === -1) {
    const token = session.get('token');

    if (!token && to.name !== LOGIN_PAGE_NAME) {
      next({ name: LOGIN_PAGE_NAME });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(to => {
  window.scrollTo(0, 0);
});

export default router;
