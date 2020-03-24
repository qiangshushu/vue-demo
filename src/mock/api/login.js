export default [
  {
    enable: true,
    path: 'api/login',
    method: 'post',
    handle() {
      return {
        status: 0,
        msg: '',
        data: {
          token: Math.random() * 10
        }
      };
    }
  }
];
