/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-10-31 15:20:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store/modules/User'

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
  // 404
  // {
  //   path: '*',
  //   component: vueComponent.userLogin
  // },
  {
    path: '/home',
    name: 'home',
    component: vueComponent.home,
    redirect: '/home/mine',
    beforeEnter: (to, from, next) => {
      console.log(to, from, next);
      if(to.fullPath === "/home/" || to.fullPath == "/home") {
        next("/home/mine");
      }
      else {
        next();
      }
    },

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
    redirect: '/user/login',
    component: vueComponent.user,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: vueComponent.userLogin
      },
      {
        path: 'register',
        name: 'Register',
        component: vueComponent.userRegister
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name != 'Register' && !window.sessionStorage.getItem("loginData")) {
    if(window.sessionStorage.getItem("registerMark") == "1") {
      next({ name: 'Register' });
    }
    else {
      next({ name: 'Login' });
    }
  }
  else {
    next()
  }
})
export default router;
