<script setup lang="ts">
import { useIPAddressStore } from '@/stores/ip_address';

import UpdateIP from '@/components/UpdateIP.vue';

import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';

const store = useIPAddressStore()
const route = useRoute()

const ipAddressId = ref(route.params.id as string)

store.fetchIpAddress(ipAddressId.value)

const ip_address = computed(() => store.ipAddress)
const isLoading = computed(() => store.isLoading)
</script>

<template>
  <main>
    <div class="flex items-center justify-center">
      <UpdateIP v-if="!isLoading" class="md:w-2/3 sm:w-3/4 w-4/5" :ip_address="ip_address" :mode="'Edit'"/>
    </div>
  </main>
</template>

<style>

</style>
