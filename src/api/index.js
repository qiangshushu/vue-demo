import ajax from './ajax';

let api = {
  getLanguage: { url: 'api/getLanguage' },
  setLanguage: { url: 'api/setPortSize', method: 'post' },
  login: { url: 'api/login' }
};

ajax();

for (var k in api) {
  let urlHost = process.env.VUE_APP_HOST;
  let url = api[k].url;

  if (process.env.NODE_ENV === 'development') {
    urlHost = '/proxy/';
  }
  api[k].url = urlHost + url;
  api[k] = config => ajax({ ...config });
}
export default api;
