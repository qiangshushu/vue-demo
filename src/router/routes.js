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
    name: 'slide',
    path: '/slide',
    component: () => import('@/views/slide')
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
