const router = [
  {
    name: 'index',
    path: '/',
    component: () => import('@/views/index')
  },
  {
    name: 'checkerboard',
    path: '/checkerboard',
    component: () => import('@/views/checkerboard')
  },
  {
    path: '*',
    redirect: '/'
  }
  // {
  //   path: '/',
  //   redirect: '/index'
  // }
];

export default router;
