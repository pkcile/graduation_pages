/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-11-08 00:01:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const vueComponent = {
  home: () => import('@/views/Home.vue'),
  map: () => import("@/views/Map.vue"),
  user: () => import("@/views/User.vue"),
  userLogin: () => import("@/components/user/login.vue"),
  userRegister: () => import("@/components/user/register.vue"),
  userMine: () => import('@/components/user/mine.vue'),
  userSocialMain: () => import("@/components/user/social/social.vue"),
  mainMap: () => import("@/components/main/positionAnalyseShow.vue"),
  mainClock: () => import('@/components/main/clock.vue'),
  adminPublish: () => import("@/components/admin/publishForm/publishForm.vue"),
  homeSocialMessage01: () => import("@/components/user/social/emojiMessage.vue"),
  socialMain: () => import("@/components/user/social/main.vue"),
  socialState: () => import("@/components/user/social/state.vue"),
  "404": () => import("@/components/common/404.vue")
};

const routes = [
  // 404
  {
    path: '*',
    component: vueComponent["404"]
  },
  // 主菜单
  {
    path: '/home',
    name: 'home',
    component: vueComponent.home,
    redirect: '/home/mine',
    beforeEnter: (to, from, next) => {
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
        component: vueComponent.mainClock
      },
      {
        path: 'map',
        component: vueComponent.mainMap
      },
      {
        path: 'social',
        component: vueComponent.userSocialMain
      },
      {
        path: 'mine',
        component: vueComponent.userMine
      },
      {
        path: 'admin',
        component: vueComponent.adminPublish
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
        component: vueComponent.mainMap
      }
    ]
  },
  // 登陆注册
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
  },
  // 个人动态
  {
    path: '/social',
    name: 'Social',
    component: vueComponent.socialMain,
    children: [
      {
        path: 'state',
        name: 'State',
        component: vueComponent.socialState
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
