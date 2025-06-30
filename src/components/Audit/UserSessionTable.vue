<script setup lang="ts">
import Drawer from '@/components/Drawer.vue';
import ActivityLogs from '@/components/ActivityLogs.vue';
import Datatables from '@/components/Datatables.vue';

import type { UserSession } from '@/types/audit_log';

import { useUserSessionStore } from '@/stores/audit/user_session'

import { computed, ref } from 'vue'
import dayjs from 'dayjs';

const store = useUserSessionStore()

const { fetchUserSessionData, handleOptionsUpdate, handlePagination, handleSortingUpdate } = store

fetchUserSessionData(1)

const isLoading = computed(() => store.isLoading)
const isInitialLoading = computed(() => store.isInitialLoading)
const filterHeaders = computed(() => store.filterHeaders)
const headers = computed(() => store.headers)
const options = computed(() => store.options)
const userSessionSelected = ref({} as UserSession)
const open = ref(false)

function openDrawer(selectedSession: UserSession) {
    userSessionSelected.value = selectedSession
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
            <Datatables ref="userSessionTable" :isLoading="isLoading" :isInitialLoad="isInitialLoading" :isExportEnabled="true" :filePrefix="'IP_ADDRESSES_'" :tableIndex="0" :tableFilters="filterHeaders" :tableFilterData="store.filters" :tableHeaders="headers" :tableData="store.getUserSessionData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination" @onUpdateSorting="handleSortingUpdate" @onClickExport="temporaryExportingFunction">
                <template #user="index">
                    <div class="bg-amber-100 text-amber-600 rounded-full py-1 px-2 text-center w-fit">
                        {{ index.index.user_name }}
                    </div>
                </template>
                <template #log_out="index">
                    {{ index.index.logged_out ? dayjs(index.index.logged_out).format('MMMM DD, YYYY hh:mm A') : 'Unavailable' }}
                </template>
                <template #log_on="index">
                    {{ index.index.logged_on ? dayjs(index.index.logged_on).format('MMMM DD, YYYY hh:mm A') : 'Unavailable' }}
                </template>
                <template #action="index">
                    <div class="flex gap-2">
                        <button class="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10" @click="openDrawer(index.index as UserSession)">View Logs</button>
                    </div>
                </template>
                <template v-slot:emptyResultText>
                    <span class="italic">-- No User Sessions --</span>
                </template>
            </Datatables>
        </div>
        

        <Drawer :is-open="open" @closeDrawer="closeDrawer">
            <template v-slot:title>
                Session Logs
                <div class="text-sm">
                    <i>{{ userSessionSelected.session_id }}</i>
                </div>
                <div class="text-sm text-gray-400">
                    Log In Time: {{ dayjs(userSessionSelected.logged_on).format('MMMM DD, YYYY hh:mm A') }}
                </div>
            </template>
            <template v-slot:content>
                <ActivityLogs :logs="userSessionSelected.logs"/>
            </template>
        </Drawer>
    </div>
</template>