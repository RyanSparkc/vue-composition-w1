import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/mounted',
      name: 'mounted',
      component: () => import('../views/MountedView.vue')
    },
    {
      path: '/watchEffect',
      name: 'watchEffect',
      component: () => import('../views/watchEffectView.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue')
    },
    {
      path: '/cross',
      name: 'cross',
      component: () => import('../views/CrossView.vue')
    }
  ]
})

export default router
