<script setup lang="ts">
import Drawer from '@/components/Drawer.vue';
import ActivityLogs from '@/components/ActivityLogs.vue';
import Datatables from '@/components/Datatables.vue';

import type { IPAddress } from '@/types/ip_address';

import { useIPAddressLogsStore } from '@/stores/audit/ip_address'

import { computed, ref } from 'vue'
import dayjs from 'dayjs';

const store = useIPAddressLogsStore()

const { fetchIPAddressData, handleOptionsUpdate, handlePagination, handleSortingUpdate } = store

fetchIPAddressData(1)

const isLoading = computed(() => store.isLoading)
const isInitialLoading = computed(() => store.isInitialLoading)
const filterHeaders = computed(() => store.filterHeaders)
const headers = computed(() => store.headers)
const options = computed(() => store.options)
const ipAddressSelected = ref({} as IPAddress)
const open = ref(false)

function openDrawer(selectedSession: IPAddress) {
    ipAddressSelected.value = selectedSession
    open.value = true
}

function closeDrawer() {
    open.value = false
}

function temporaryExportingFunction() {
  //
}
</script>

<template>
    <div>
        <div v-if="!isInitialLoading">
            <Datatables ref="ipAddressLogsTable" :isLoading="isLoading" :isInitialLoad="isInitialLoading" :isExportEnabled="true" :filePrefix="'IP_ADDRESSES_'" :tableIndex="0" :tableFilters="filterHeaders" :tableFilterData="store.filters" :tableHeaders="headers" :tableData="store.getIPAddressData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination" @onUpdateSorting="handleSortingUpdate" @onClickExport="temporaryExportingFunction">
                <template #owner="index">
                    <div class="bg-amber-100 text-amber-600 rounded-full py-1 px-2 text-center w-fit">
                        {{ index.index.owner_name }}
                    </div>
                </template>
                <template #last_updated="index">
                    {{ index.index.updated_at ? dayjs(index.index.updated_at).format('MMMM DD, YYYY hh:mm A') : 'Unavailable' }}
                </template>
                <template #action="index">
                    <div class="flex gap-2">
                        <button class="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10" @click="openDrawer(index.index as IPAddress)">View Logs</button>
                    </div>
                </template>
                <template v-slot:emptyResultText>
                    <span class="italic">-- No IP Addresses --</span>
                </template>
            </Datatables>
        </div>
        

        <Drawer :is-open="open" @closeDrawer="closeDrawer">
            <template v-slot:title>
                IP Address <i>#{{ ipAddressSelected.id }}</i> Logs
            </template>
            <template v-slot:content>
                <ActivityLogs :logs="ipAddressSelected.logs"/>
            </template>
        </Drawer>
    </div>
</template>