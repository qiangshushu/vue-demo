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

Locale.use('en', enUS);

// Locale.i18n((key, value) => i18n.t(key, value)); //重点：为了实现element插件的多语言切换

export default i18n;
