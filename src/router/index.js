/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-10-18 17:44:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const vueComponent = {
  main: () => import('@/components/main/main.vue'),
  mine: () => import('@/components/mine/mine.vue'),
  social: () => import("@/components/social/social.vue")
};

const routes = [
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
        component: vueComponent.social
      },
      {
        path: 'mine',
        component: vueComponent.mine
      }
    ]
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/components/map/mapRequire.vue')
  },
  {
    path: '/turfjs',
    name: 'turfjs',
    component: () => import('@/components/map/turfjs.vue')
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

export default router;
