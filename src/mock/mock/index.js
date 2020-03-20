/*
 * @Description: Do not edit
 * @Author: caokunyu
 * @Date: 2019-07-18 15:42:37
 * @Email: hidoo_caokunyu@126.com
 * @LastEditors: caokunyu
 * @LastEditTime: 2019-11-15 15:12:48
 */
import Mock from 'mockjs';
import qs from 'qs';
import withCredentials from './patch/withCredentials';

/* 补丁 */
withCredentials(Mock);

/* Mock 默认配置 */
Mock.setup({ timeout: '200-300' });

/* 扩展 [生成器] */
const Generator = (prop, template) => {
  const obj = {};
  obj[prop] = [template];
  return Mock.mock(obj);
};

/* 扩展 [循环] */
const Repeat = (num, itemTemplate) => Generator(`data|${num}`, itemTemplate).data;

const CustomExtends = {
  Generator,
  Repeat,
  Mock,
  Random: Mock.Random
};

const extend = (prop, value) => {
  CustomExtends[prop] = value;
};

/* 装配配置组 */
const wired = ({ url, type, body }) => ({
  method: type,
  params: qs.parse(url.split('?').length > 1 ? url.split('?')[1] : ''),
  body: JSON.parse(body),
  url: qs.parse(url.split('?')[0]),
  ...CustomExtends
});

const setup = (path, method, handle) => {
  Mock.mock(RegExp(path), method, typeof handle === 'function' ? o => handle(wired(o)) : handle);
};

const load = collection => {
  collection.map(({ enable = true, path, method, handle }) => {
    // 启用时才使用mock
    if (!enable) {
      return false;
    }
    if (method === '*') {
      method = ['get', 'head', 'post', 'put', 'delete', 'connect', 'options', 'trace', 'patch'];
    }
    if (typeof method === 'string' && method.indexOf('|') > -1) {
      method = method.split('|');
    }
    if (method instanceof Array) {
      method.map(item => setup(path, item, handle));
    } else {
      setup(path, method, handle);
    }
  });
};

export default { setup, load, extend };
