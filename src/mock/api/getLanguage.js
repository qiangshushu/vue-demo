export default [
  {
    enable: true,
    path: 'api/getLanguage',
    method: 'get',
    handle() {
      return {
        status: 1,
        msg: 'status 为 1，数据异常了',
        data: {
          lang: 'zh'
        }
      };
    }
  }
];
