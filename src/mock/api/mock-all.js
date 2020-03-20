export default [
  {
    enable: true,
    path: /api\/[\w]*/,
    method: ['post'],
    handle() {
      return {
        status: 0,
        msg: '',
        data: {}
      };
    }
  }
];
