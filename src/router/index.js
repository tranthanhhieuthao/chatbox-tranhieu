import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '/chat',
        name: 'chat',
        component: () => import('@/components/HelloWorld')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
