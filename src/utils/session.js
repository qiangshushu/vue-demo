const session = {};

/**
 * @description 存储 session 值
 * @param {String} name session name
 * @param {String} value session value
 */
session.set = function(name = 'default', value = '') {
  sessionStorage.setItem(`hdr-${name}`, JSON.stringify(value));
};

/**
 * @description 拿到 session 值
 * @param {String} name session name
 */
session.get = function(name = 'default') {
  let uu = sessionStorage.getItem(`hdr-${name}`);

  try {
    if (typeof JSON.parse(uu) != 'number') {
      uu = JSON.parse(uu);
    }
  } catch (e) {}
  return uu;
};

/**
 * @description 删除 session
 * @param {String} name session name
 */
session.remove = function(name = 'default') {
  return sessionStorage.removeItem(`hdr-${name}`);
};

export default session;
