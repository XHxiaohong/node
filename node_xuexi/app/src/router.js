// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

// Router.router.beforeEach((to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   if (!/micromessenger/i.test(navigator.userAgent)) {
//     next()
//     return
//   }

//   if (to.name === 'WxAuth') {
//     next()
//     return
//   }

//   let wxUserInfo = localStorage.getItem('wxUserInfo')

//   if (!wxUserInfo) {
//     //保存当前路由地址，授权后还会跳到此地址
//     sessionStorage.setItem('wxRedirectUrl', to.fullPath)
//     //请求微信授权,并跳转到 /WxAuth 路由
//     let appId = '测试服的AppId'
//     let redirectUrl = encodeURIComponent('https://m1.xxxxxx.com/WxAuth')
//     //判断是否为正式环境
//     if (window.location.origin.indexOf('https://m.xxxxxx.com') !== -1) {
//       appId = '正式服的AppId'
//       redirectUrl = encodeURIComponent('https://m.xxxxxx.com/WxAuth')
//     }
//     window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
//   } else {
//     next()
//   }
// })
let components = []
const requireCompoenent = require.context('./views', true, /\.vue$/)
requireCompoenent.keys().map(filbPath=> {
  let filb = requireCompoenent(filbPath)
  let filbName = filb.default.name
  let component = './views' + filePath.slice(1)
  // 创建路由对象
  let router = {
    path: '/' + filbName,
    name: filbName,
    component: () => import(`${component}`)
  }
  components.push(router)
})


let routers = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/login')
    },
    {
      path: '/WxAuth',
      name: 'WxAuth',
      component: () => import('./views/WxAuth')
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})




export default routers