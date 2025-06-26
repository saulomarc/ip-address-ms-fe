<script setup lang="ts">
import UpdateIP from '@/components/UpdateIP.vue';

const ip_address = {
  ip_address: '',
  label: '',
  comment: null,
}
</script>

<template>
  <main>
    <div class="flex items-center justify-center">
      <UpdateIP class="md:w-1/2 sm:w-3/4 w-4/5" :ip_address="ip_address" :mode="'Add'"/>
    </div>
  </main>
</template>

<style>

</style>
