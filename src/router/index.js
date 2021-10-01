/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-09-29 10:54:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const vueComponent = {
  about: () => import('@/views/About.vue'),
  map: () => import('@/views/Map.vue'),
  main: () => import('@/components/main/main.vue'),
  maptest: () => import('@/components/main/maptest.vue'),
  maptest2: () => import('@/components/main/maptest2.vue')
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
        component: vueComponent.about
      },
      {
        path: 'maptest',
        component: vueComponent.maptest
      }
    ]
  },
  {
    path: '/map',
    name: 'map',
    component: vueComponent.map
  },
  {
    path: '/maptest',
    name: 'maptest',
    component: vueComponent.maptest
  },
  {
    path: '/maptest2',
    name: 'maptest2',
    component: vueComponent.maptest2
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
