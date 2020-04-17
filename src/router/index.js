import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home')
const About = () => import('../views/about/About')
const Shopcart = () => import('../views/shopcart/Shopcart')
const User = () => import('../views/user/User')

// 1.安装插件
Vue.use(Router)

// 2.创建路由对象
const routes = [
  // 4.main.js导入
  // 5.配置映射关系
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/user',
    component: User
  }
]
const router = new Router({
    routes,
    mode: 'history'
})

// 解决重复点击组件后报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 3.导出
export default router