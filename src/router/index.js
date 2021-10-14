/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-10-13 11:10:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const vueComponent = {
  about: () => import('@/views/About.vue'),
  main: () => import('@/components/main/main.vue'),
  mine: () => import('@/components/mine/mine.vue'),
  // home: () => import('@')
};

const routes = [
  {
    path: '/about',
    name: 'About',
    component: vueComponent.about
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'main',
        component: vueComponent.main
      },
      {
        path: 'social',
        component: vueComponent.about
      },
      {
        path: 'mine',
        component: vueComponent.mine
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

export default router;
