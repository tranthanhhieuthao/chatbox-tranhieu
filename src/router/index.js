import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/chat',
    component: layout,
    children: [
      {
        path: `/chat/:id`,
        name: 'chat',
        component: () => import('@/components/ScreenChat')
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('@/components/Login')
  },
  {
    path: '/home',
    component: layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/components/Home')
      }
    ]
  }
  // {
  //   path: '/showUser',
  //   component: layout,
  //   children: [
  //     {
  //       path: '/showUser',
  //       name: 'showUser',
  //       component: () => import('@/components/showUser'),
  //       meta: {
  //         requiresAuth: true,
  //         roles: ['ROLE_ADMIN']
  //       }
  //     }
  //   ]
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
