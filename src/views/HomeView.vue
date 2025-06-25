<script setup lang="ts">
import UpdateIP from '@/components/UpdateIP.vue';
import Datatables from '@/components/Datatables.vue';

import { useIPAddressStore } from '@/stores/ip_address';
import { computed } from 'vue';

const store = useIPAddressStore()

const { fetchIpAddressesData, handleOptionsUpdate, handlePagination, handleSortingUpdate } = store

fetchIpAddressesData(1)

const ip_address = {
  ipAddress: '',
  label: '',
  comment: null,
}

const isLoading = computed(() => store.isLoading)
const isInitialLoading = computed(() => store.isInitialLoading)
const filterHeaders = computed(() => store.filterHeaders)
const headers = computed(() => store.headers)
const options = computed(() => store.options)

function temporaryExportingFunction() {
  //
}
</script>

<template>
  <main>
    <div v-if="!isInitialLoading">
      <Datatables ref="ingredientTable" :isLoading="isLoading" :isInitialLoad="isInitialLoading" :isExportEnabled="true" :filePrefix="'IP_ADDRESSES_'" :tableIndex="0" :tableFilters="filterHeaders" :tableFilterData="store.filters" :tableHeaders="headers" :tableData="store.getIpAddressData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination" @onUpdateSorting="handleSortingUpdate" @onClickExport="temporaryExportingFunction">
        <template #owner="index">
          <div class="bg-amber-500 text-white rounded-full py-1 px-2 text-center w-fit">
            {{ index.index.owner_name }}
          </div>
        </template>
        <template v-slot:emptyResultText>
          <span class="italic">-- No Ip Addresses --</span>
        </template>
      </Datatables>
    </div>
  </main>
</template>
