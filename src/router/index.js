/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-10-20 18:06:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const vueComponent = {
  home: () => import('@/views/Home.vue'),
  main: () => import('@/components/main/main.vue'),
  mine: () => import('@/components/mine/mine.vue'),
  social: () => import("@/components/social/social.vue"),
  homeMap: () => import("@/components/main/map.vue"),
  
  map: () => import("@/views/Map.vue"),
  leafletMap: () => import("@/components/map/leafletMap.vue")
};

const routes = [
  {
    path: '/home',
    name: 'home',
    component: vueComponent.home,
    children: [
      {
        path: 'main',
        component: vueComponent.main
      },
      {
        path: 'map',
        component: vueComponent.homeMap
      },
      {
        path: 'social',
        component: vueComponent.social
      },
      {
        path: 'mine',
        component: vueComponent.mine
      },
      {
        path: "leaflet",
        component: vueComponent.leafletMap
      }
    ]
  },
  {
    path: '/map',
    name: 'map',
    component: vueComponent.map,
    children: [
      {
        path: "leaflet",
        component: vueComponent.leafletMap
      },
      {
        path: 'main',
        component: vueComponent.main
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

export default router;
