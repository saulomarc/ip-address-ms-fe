<script setup lang="ts">
import UserSessionTable from '@/components/Audit/UserSessionTable.vue';
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
import { ref } from 'vue';

const tabs = ref([
    { name: 'User Sessions', current: true },
    { name: 'IP Address', current: false },
])

function changeTab(name: String) {
    var activeTabIndex = tabs.value.findIndex((tab) => tab.current)
    var selectedTabIndex = tabs.value.findIndex((tab) => tab.name === name)

    if (tabs.value[activeTabIndex]!.name !== name) {
        tabs.value[activeTabIndex].current = false
        tabs.value[selectedTabIndex].current = true
    }
}
</script>

<template>
    <main>
        <div>
            <div class="grid grid-cols-1 sm:hidden">
                <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                <select aria-label="Select a tab" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
                    <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
                </select>
                <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500" aria-hidden="true" />
            </div>
            <div class="hidden sm:block">
                <nav class="flex space-x-4" aria-label="Tabs">
                    <div v-for="tab in tabs" :key="tab.name" @click="changeTab(tab.name)" :class="[tab.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer']" :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</div>
                </nav>
            </div>
        </div>
        <div class="mt-4">
            <UserSessionTable v-if="tabs[0].current == true" />
            <div v-else-if="tabs[1].current == true">
                IP Address Activities
            </div>
        </div>
    </main>
</template>

<style>

</style>
