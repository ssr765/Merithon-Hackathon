import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'records',
          name: 'records',
          component: () => import('@/views/records/IndexView.vue')
        },
        {
          path: 'records/create',
          name: 'records-create',
          component: () => import('@/views/records/CreateView.vue')
        }
      ]
    }
  ]
})

export default router
