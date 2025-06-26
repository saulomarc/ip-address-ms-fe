<script setup lang="ts">
import Drawer from '@/components/Drawer.vue';
import ActivityLogs from '@/components/ActivityLogs.vue';
import { ref } from 'vue';

const open = ref(false)

function openDrawer() {
    open.value = true
}

function closeDrawer() {
    open.value = false
}
</script>

<template>
    <main>
        <div class="flex items-center justify-center">
            Logs Page
        </div>
        <button class="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10" @click="openDrawer">Open drawer</button>

        <Drawer :is-open="open" @closeDrawer="closeDrawer">
            <template v-slot:content>
                <ActivityLogs />
            </template>
        </Drawer>
    </main>
</template>

<style>

</style>
