<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Alert from './components/Alert.vue'
import DashboardLayout from './layouts/DashboardLayout.vue';
import PlainLayout from './layouts/PlainLayout.vue';

const route = useRoute();
const layout = computed(() => {
  const layoutName = route.meta.layout || 'DashboardLayout';
  return layoutName === 'DashboardLayout' ? DashboardLayout : PlainLayout;
});
</script>

<template>
  <Alert />
  
  <component :is="layout">
  </component>
</template>

<style scoped>

</style>
