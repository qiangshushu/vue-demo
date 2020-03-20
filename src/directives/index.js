const files = require.context('./', false, /\.js$/);
const obj = {};

files.keys().forEach(key => {
  obj[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default {
  ...obj
};
