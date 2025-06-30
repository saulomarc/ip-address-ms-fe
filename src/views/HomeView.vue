<script setup lang="ts">
import Datatables from '@/components/Datatables.vue';
import Modal from '@/components/Modal.vue';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid';

import { useIPAddressStore } from '@/stores/ip_address';
import { useAuthStore } from '@/stores/auth';
import { computed, ref } from 'vue';
import type { IPAddress } from '@/types/ip_address';

const store = useIPAddressStore()
const authStore = useAuthStore()

const { fetchIpAddressesData, handleOptionsUpdate, handlePagination, handleSortingUpdate } = store
const { checkRole } = authStore

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
const isDeleteModalOpen = ref(false)
const ipAddressSelected = ref({} as IPAddress)

function temporaryExportingFunction() {
  //
}

function openDeleteModal(ipAddress: IPAddress) {
  isDeleteModalOpen.value = true
  ipAddressSelected.value = ipAddress
}

function cancelDeleting() {
  isDeleteModalOpen.value = false
  ipAddressSelected.value = {} as IPAddress
}

function deleteIp() {
  store.deleteIpAddress(ipAddressSelected.value.id!)
  isDeleteModalOpen.value = false
}
</script>

<template>
  <main>
    <Modal v-model="isDeleteModalOpen">
      <template v-slot:title>Delete IP Address</template>
      <template v-slot:content>
        <div>
          Are you sure you want to delete this <span class="italic">IP Address</span>?
          <div class="my-2 font-semibold text-wrap">
            {{ ipAddressSelected.ip_address }}
          </div>
        </div>
      </template>
      <template v-slot:buttons>
        <button @click.prevent="cancelDeleting()" class="border-up-maroon border text-up-maroon p-2 rounded mr-2">
          Close
        </button>
        <button @click.prevent="deleteIp()" class="bg-green-500 text-white p-2 rounded mr-2">
          Confirm Deletion
        </button>
      </template>
    </Modal>

    <h3 class="text-lg font-bold">
      IP Addresses
    </h3>
    <div v-if="!isInitialLoading">
      <Datatables ref="ingredientTable" :isLoading="isLoading" :isInitialLoad="isInitialLoading" :isExportEnabled="true" :filePrefix="'IP_ADDRESSES_'" :tableIndex="0" :tableFilters="filterHeaders" :tableFilterData="store.filters" :tableHeaders="headers" :tableData="store.getIpAddressData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination" @onUpdateSorting="handleSortingUpdate" @onClickExport="temporaryExportingFunction">
        <template #owner="index">
          <div class="bg-amber-100 text-amber-600 rounded-full py-1 px-2 text-center w-fit">
            {{ index.index.owner_name }}
          </div>
        </template>
        <template #action="index">
          <div class="flex gap-2">
            <router-link :to="'/edit-ip/' + index.index.id" v-if="checkRole('super_admin') || index.index.user_id === authStore.user.id" class="p-1 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:bg-blue-600">
              <PencilSquareIcon class="size-5"/>
            </router-link>
            <button @click="openDeleteModal(index.index as IPAddress)" v-if="checkRole('super_admin')" class="p-1 bg-red-500 text-white rounded-md hover:cursor-pointer hover:bg-red-600">
              <TrashIcon class="size-5"/>
            </button>
          </div>
        </template>
        <template v-slot:emptyResultText>
          <span class="italic">-- No Ip Addresses --</span>
        </template>
      </Datatables>
    </div>
  </main>
</template>
