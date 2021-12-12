/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-12-12 13:59:37
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
  userMine: () => import('@/components/user/mine.vue'),
  userSocialMain: () => import("@/components/user/social/social.vue"),
  mainMap: () => import("@/components/main/positionAnalyseShow.vue"),
  mainClock: () => import('@/components/main/clock.vue'),
  adminPublish: () => import("@/components/admin/publishForm/publishForm.vue"),
  socialMain: () => import("@/components/user/social/state2.vue"),
  signInMain: () => import("@/components/user/signIn/main.vue"),
  signResult: () => import("@/components/user/signIn/stepSignResult.vue"),
  pathMain: () => import("@/components/user/path/main.vue"),
  login: () => import("@/components/user/login.vue"),
  register: () => import("@/components/user/register.vue"),
  "404": () => import("@/components/common/404.vue"),
  temp: ()=> import("@/components/user/social/state2.vue"),
  temp2: ()=> import("@/components/admin/editTask/index.vue"),
  baidumap: () => import("@/components/main/map/baidumap.vue")
};

const routes = [
  // 404
  {
    path: '*',
    component: vueComponent["404"]
  },
  {
    path: '/temp',
    component: vueComponent["temp"]
  },
  {
    path: '/temp2',
    component: vueComponent["temp2"]
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
      },
      {
        path: 'baidu',
        component: vueComponent.baidumap
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
        component: vueComponent.login
      },
      {
        path: 'register',
        name: 'Register',
        component: vueComponent.register
      }
    ]
  },
  // 个人动态
  {
    path: '/social',
    name: 'Social',
    component: vueComponent.socialMain,
  },
  // 签到打卡
  {
    path: '/sign',
    name: 'Sign',
    component: vueComponent.signInMain,
  },
  {
    path: '/signResult',
    name: 'SignResult',
    component: vueComponent.signResult
  },
  // 运动轨迹
  {
    path: '/path',
    name: "path",
    component: vueComponent.pathMain
  },
  // 任务发布
  {
    path: '/admin',
    component: vueComponent.adminPublish
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
