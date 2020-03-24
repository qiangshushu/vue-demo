import ajax from './ajax';

let api = {
  getLanguage: { url: 'api/getLanguage' },
  setLanguage: { url: 'api/setPortSize', method: 'post' },
  login: { url: 'api/login', method: 'post' }
};

for (var k in api) {
  let urlHost = process.env.NODE_ENV === 'development' ? '/proxy/' : process.env.VUE_APP_HOST;
  let { url, method = 'get', isJson = false } = api[k];
  url = urlHost + url;

  api[k] = (config = {}) => {
    if (/:id/.test(url) && config.hasOwnProperty('_id')) {
      url = url.replace(':id', config._id);
    }

    // 去除data中的特殊字段
    const data = {};
    Object.keys(config)
      .filter(item => ['_id'].includes(item))
      .forEach(item => {
        data[item] = config[item];
      });

    return ajax({ url, method, data, isJson });
  };
}
export default api;
