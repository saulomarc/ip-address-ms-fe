import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomeView from '../views/HomeView.vue'
import AddNewIPView from '@/views/AddNewIPView.vue';

import 'vue-router';

// declare a new module to include title string for type checking and avoiding unknown errors
declare module 'vue-router' {
  interface RouteMeta {
    title?: string; // Declare title as an optional string
    requiresAuth?: boolean;
    breadcrumb?: string;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'DashboardLayout', title: 'Home', breadcrumb: 'Home' },
    },
    {
      path: '/add-new-ip',
      name: 'add-ip',
      component: AddNewIPView,
      meta: { layout: 'DashboardLayout', title: 'Add New IP', breadcrumb: 'Add New IP' },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { layout: 'DashboardLayout', title: 'About', breadcrumb: 'About' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'PlainLayout', title: 'Login' },
      beforeEnter: (to, from) => {
        if (useAuthStore().authenticated) {
          return { name: 'home' }
        }
      },
    }
  ],
})

router.beforeEach(async (to, from) => {
  document.title = to.meta.title || 'Default Title';
  // make sure the user is authenticated and avoid an infinite redirect
  if (!useAuthStore().authenticated && to.name !== 'login') {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
