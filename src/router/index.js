import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import UserList from '@/views/user/UserList.vue'
import UserAnalysis from '@/views/user/UserAnalysis.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '登录',
      component: LoginView
    },
    {
      path: '/home',
      name: '首页',
      component: HomeView,
      children:[
        {
          path: '/list',
          name: '用户列表',
          component: UserList
        },
        {
          path: '/analysis',
          name: '用户分析',
          component: UserAnalysis
        },
      ]
    },
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
