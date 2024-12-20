/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2022-04-10 08:01:07
 * @LastEditors: 王朋坤
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const vueComponent = {
  home: () => import('@/views/Home.vue'),
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
  choose: ()=> import("@/components/admin/editTask/choose.vue"),
  empty: ()=> import("@/components/admin/editTask/empty.vue"),
  forsure: () => import("@/components/admin/editTask/forsure.vue"),
  asign: () => import("@/components/admin/editTask/asign.vue"),
  asignForsure: () => import("@/components/admin/editTask/asignForsure.vue"),

  pages: {
    index: {
      tasklist: () => import("@/pages/index/tasklist.vue")
    },
    social: {
      social: () => import("@/pages/social/social.vue"),
      more: () => import("@/pages/social/more.vue")
    },
    sign: {
      sign: () => import("@/pages/sign/sign.vue")
    },
    publish: {
      publish: () => import("@/pages/publish/publish.vue")
    },
    init: {
      login: () => import("@/pages/init/login.vue"),
      register: () => import("@/pages/init/register.vue"),
      result: () => import("@/pages/init/result.vue")   
    },
    mine: {
      mine: () => import("@/pages/mine/mine.vue")
    },
    usercontrol: {
      usercontrol: () => import("@/pages/usercontrol/usercontrol.vue")
    }
  },
  common: {
    "404": () => import("@/components/common/404.vue"),
    temp: ()=> import("@/components/user/social/state2.vue"),
    map: {
      baidumap: () => import("@/components/main/map/baidumap.vue"),
      leafletmap: () => import("@/components/main/map/leafletMap.vue"),
    }
  }

};

const routes = [
  // 404
  {
    path: '*',
    component: vueComponent.common["404"]
  },
  {
    path: '/temp',
    component: vueComponent.common.temp
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
        component: vueComponent.pages.index.tasklist
      },
      {
        path: 'map',
        component: vueComponent.mainMap
      },
      {
        path: 'more',
        component: vueComponent.pages.social.more
      },
      {
        path: 'mine',
        component: vueComponent.pages.mine.mine
      },
      {
        path: 'admin',
        component: vueComponent.pages.publish.publish
      },
      {
        path: 'usercontrol',
        component: vueComponent.pages.usercontrol.usercontrol
      }
    ]
  },
  // 地图测试
  {
    path: '/map',
    name: 'map',
    component: vueComponent.map,
    children: [
      {
        path: 'main',
        component: vueComponent.common.map.leafletmap
      },
      {
        path: 'baidu',
        component: vueComponent.common.map.baidumap
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
        component: vueComponent.pages.init.login
      },
      {
        path: 'register',
        name: 'Register',
        component: vueComponent.pages.init.register
      },
      {
        path: 'result',
        name: 'result',
        component: vueComponent.pages.init.result
      }
    ]
  },
  // 个人动态
  {
    path: '/social',
    name: 'Social',
    component: vueComponent.pages.social.social,
  },
  // 签到打卡
  {
    path: '/sign',
    name: 'Sign',
    component: vueComponent.pages.sign.sign,
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
  },
  // 任务编辑
  {
    path: '/edit',
    component: vueComponent.empty,
    redirect: '/edit/choose',
    beforeEnter: (to, from, next) => {
      if(to.fullPath === "/edit/" || to.fullPath == "/edit") {
        next("/edit/choose");
      }
      else {
        next();
      }
    },
    children: [
      {
        path: 'choose',
        name: 'choose',
        component: vueComponent.choose
      },
      {
        path: 'forsure',
        name: 'forsure',
        component: vueComponent.forsure
      },
      {
        path: 'editTask',
        name: 'editTask',
        component: vueComponent.register
      },
      {
        path: 'asign',
        name: 'asign',
        component: vueComponent.asign
      },  
      {
        path: 'asignForsure',
        name: 'asignForsure',
        component: vueComponent.asignForsure
      },
      
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name != 'Register' && !window.sessionStorage.getItem("User")) {
    // if(window.sessionStorage.getItem("registerMark") == "1") {
    //   next({ name: 'Register' });
    // }
    // else {
    //   next({ name: 'Login' });
    // }
    next()
  }
  else {
    next()
  }
})
export default router;
