import axios from 'axios';
import { Toast } from 'vant';
import qs from 'qs';
import router from '@/router';
import Cookie from '@/utils/cookie';

Toast.setDefaultOptions({
  duration: 2000,
  getContainer: 'body'
});

axios.defaults.timeout = 5000;

function request(method, url, data, headers) {
  switch (method) {
    case 'get':
      return axios.get(url, { params: data, headers });
    // case 'delete':
    // case 'post':
    // case 'put':
    //   return axios[method](url, { headers, data });
    default:
      return axios[method](url, { headers, data });
  }
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  const error = new Error();
  error.response = res;
  throw error;
}

function handleData(res) {
  const data = res.data;
  if (data && data.status !== 0) {
    const error = new Error();
    error.response = res;
    throw error;
  }
  return data.data;
}

function handleError(error) {
  const err = error.response;
  let message = '';

  switch (err.status) {
    case 200:
      message = err.data.msg || '数据异常';
      break;
    case 400:
      message = '错误请求';
      break;
    case 401:
      message = '未授权，请重新登录';
      break;
    case 403:
      message = '拒绝访问';
      break;
    case 404:
      message = '请求错误,未找到该资源';
      break;
    case 405:
      message = '请求方法未允许';
      break;
    case 408:
      message = '请求超时';
      break;
    case 500:
      message = '服务器端出错';
      break;
    case 501:
      message = '网络未实现';
      break;
    case 502:
      message = '网络错误';
      break;
    case 503:
      message = '服务不可用';
      break;
    case 504:
      message = '网络超时';
      break;
    case 505:
      message = 'http版本不支持该请求';
      break;
    default:
      message = `未知错误${err.status}`;
  }

  Toast(message, { duration: 3000 });

  if (err.status === 401) {
    setTimeout(() => {
      router.push({ name: 'login' });
    }, 1000);
  }

  return Promise.reject(error);
}

let ajax = ({ method, url, data, isJson }) => {
  if (method !== 'get') {
    if (isJson) {
      data = JSON.stringify(data);
    } else {
      data = qs.stringify(data);
    }
  }

  let headers = {
    'X-AUTH-TOKEN': Cookie.get('token') || '', //根据前后端协商定义
    'Content-Type': isJson ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  return request(method, url, data, headers)
    .then(checkStatus)
    .then(handleData)
    .catch(handleError);
};

export default ajax;
