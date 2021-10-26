/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-10-26 10:09:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const vueComponent = {
  home: () => import('@/views/Home.vue'),
  map: () => import("@/views/Map.vue"),
  user: () => import("@/views/User.vue"),
  userLogin: () => import("@/components/user/login.vue"),
  userRegister: () => import("@/components/user/register.vue"),
  homeUserMine: () => import('@/components/user/mine.vue'),
  homeSocialMain: () => import("@/components/social/social.vue"),
  homeMap: () => import("@/components/map/positionAnalyseShow.vue"),
  homeClock: () => import('@/components/main/clock.vue'),
  homeAdminPublish: () => import("@/components/admin/publishForm.vue")

};

const routes = [
  {
    path: '/home',
    name: 'home',
    component: vueComponent.home,
    children: [
      {
        path: 'main',
        component: vueComponent.homeClock
      },
      {
        path: 'map',
        component: vueComponent.homeMap
      },
      {
        path: 'social',
        component: vueComponent.homeSocialMain
      },
      {
        path: 'mine',
        component: vueComponent.homeUserMine
      },
      {
        path: 'admin',
        component: vueComponent.homeAdminPublish
      }
    ]
  },
  {
    path: '/map',
    name: 'map',
    component: vueComponent.map,
    children: [
      {
        path: 'main',
        // component: vueComponent.homeClock
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: vueComponent.user,
    children: [
      {
        path: 'login',
        component: vueComponent.userLogin
      },
      {
        path: 'register',
        component: vueComponent.userRegister
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

export default router;
