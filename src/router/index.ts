import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomeView from '../views/HomeView.vue'
import AddNewIPView from '@/views/AddNewIPView.vue';

import 'vue-router';
import EditIpView from '@/views/EditIpView.vue';
import UnauthorizedView from '@/views/UnauthorizedView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import LogsView from '@/views/LogsView.vue';

// declare a new module to include title string for type checking and avoiding unknown errors
declare module 'vue-router' {
  interface RouteMeta {
    title?: string; // Declare title as an optional string
    requiresAuth?: boolean;
    breadcrumb?: string;
    role?: string
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
      path: '/edit-ip/:id',
      name: 'edit-ip',
      component: EditIpView,
      meta: { layout: 'DashboardLayout', title: 'Edit IP', breadcrumb: 'Edit IP' },
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView,
      meta: { layout: 'PlainLayout', title: 'Unauthorized' },
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFoundView,
      meta: { layout: 'PlainLayout', title: 'Not Found' },
    },
    {
      path: '/audit',
      name: 'audit',
      component: LogsView,
      meta: { layout: 'DashboardLayout', title: 'Audit', role: 'super_admin' },
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

  if (to.meta.role) {
    if (!useAuthStore().checkRole(to.meta.role)) {
      return { name: 'home' }
    }
  }
})

export default router
