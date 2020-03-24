import Vue from 'vue';
import VueI18n from 'vue-i18n';
import session from '@/utils/session';
import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';
import enLocale from './lang/en';
import zhLocale from './lang/zh';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...enUS
  },
  zh: {
    ...zhLocale,
    ...zhCN
  }
};

const i18n = new VueI18n({
  locale: session.get('language') || 'zh',
  messages
});

function changeLang(val) {
  if (val === 'zh') {
    Locale.use(val, zhCN);
  } else {
    Locale.use(val, enUS);
  }
  i18n.locale = val;
}

export { i18n, changeLang };
