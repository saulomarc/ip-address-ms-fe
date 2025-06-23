<template>
    <div class="my-2">
        <div v-if="!isLoading">
            <div v-if="filter_headers.length > 0" class="mb-4  items-end" :class="isModal ? '': 'flex'">
                <div v-for="(filter, filterKey) in filter_headers" :key="filterKey" class="">
                    <div v-if="filter.type == 'select'">
                        <label :for="'select_' + filterKey" class="block text-xs text-gray-500">{{ filter.label }}</label>
                        <select :name="'select_' + filterKey" :id="filter.name + '_' + filterKey"
                            :class="isModal ? 'p-2 leading-8 border border-gray-300 w-full  mb-3 rounded-sm' : 'p-2 leading-8 w-28'"
                            @change="changeInput(($event.target as HTMLInputElement).value, filter.field)">
                            <option value="--" class="text-center" selected>--</option>
                            <option v-for="(fValue, fKey) in filters[filter.field]" :key="fKey" :value="fValue[filter.name]">{{ fValue[filter.name] }}</option>
                        </select>
                    </div>
                    <!-- <div v-else-if="filter.type == 'combobox'" :class="isModal ? 'w-full mb-3 ' : 'w-52'">
                        <label :for=filterKey class="block text-xs text-gray-500">{{ filter.label }}</label>
                        <v-select class="w-full style-chooser" :dropdown-should-open="dropdownShouldOpen" :label="filter.name"
                            :options="filters[filter.field]" @input="(value) => chooseCombobox(filter.field, value)"
                            :multiple="filter.multiple"
                        ></v-select>
                    </div> -->
                    <div v-else-if="filter.type == 'input'" :class="isModal ? 'w-full' : 'w-52'" >
                        <label :for="'input_' + filterKey" class="block text-xs text-gray-500">{{ filter.label }}</label>
                        <input type="text" class="bg-white p-2"
                        :class="isModal ? 'border border-gray-300 w-full mb-3 rounded-sm' : ''" 
                        @change="changeInput(($event.target as HTMLInputElement).value, filter.field)">
                    </div>
                    <div v-else-if="filter.type == 'date'" :class="isModal ? 'w-full' : 'w-52'" >
                        <label :for="'date_' + filterKey" class="block text-xs text-gray-500">{{ filter.label }}</label>
                        <input type="date" class="bg-white p-2"
                        :class="isModal ? 'border border-gray-300 w-full mb-3 rounded-sm' : ''" 
                        @change="changeInput(($event.target as HTMLInputElement).value, filter.field)">
                    </div>
                    <div v-else-if="filter.type == 'datetime-local'" :class="isModal ? 'w-full' : 'w-52'" >
                        <label :for="'datetime-local_' + filterKey" class="block text-xs text-gray-500">{{ filter.label }}</label>
                        <input type="datetime-local" class="bg-white p-2"
                        :class="isModal ? 'border border-gray-300 w-full mb-3 rounded-sm' : ''" 
                        @change="changeInput(($event.target as HTMLInputElement).value, filter.field)">
                    </div>
                </div>
                <div>
                    <button @click="applyFilter" class="p-2 bg-blue-500 text-white rounded w-full flex justify-center items-center"><FunnelIcon class="size-5 text-white mr-2" /> Apply Filter</button>
                </div>
            </div>
        </div>
        <Loader v-else :loaderType="'filters'" :columnNum="3" />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FunnelIcon } from '@heroicons/vue/20/solid';

import { useFilterStore } from '@/stores/filters.ts'
import type { Filters, FilterValues, FilterHeader } from "@/types/filters";
import Loader from "@/components/Loader.vue";

const store = useFilterStore()
const { initializeFilterValues, updateFilterValues, createFilters } = store

interface Props {
    filter_headers: FilterHeader[],
    filters: Filters,
    isLoading: Boolean,
    index: number,
    isModal?: Boolean,
}

const {isModal = false, filter_headers, filters, isLoading, index} = defineProps<Props>()
const filterValues = computed(() => store.filterValues)

fetchInitialData()

const emit = defineEmits<{
    'applyFilter': [value: FilterValues]
}>()

function fetchInitialData() {
    initializeFilterValues(index)
    filter_headers.forEach(header => {
        createFilters({
            index: index,
            key: header.field,
            value: '--'
        })
    });
}

function changeInput(e: any, key: string) {
    updateFilterValues({
        index: index,
        key: key,
        value: e
    })
}

function chooseCombobox(key: string, value: any) {
    if (value) {
        if (value[key]){
            updateFilterValues({
                index: index,
                key: key,
                value: value[key]
            })
        } else {
            updateFilterValues({
                index: index,
                key: key,
                value: value.map((a: FilterValues) => a[key])
            })
        }
    } else {
        updateFilterValues({
            index: index,
            key: key,
            value: '--'
        })
    }
}

function applyFilter() {
    emit('applyFilter', filterValues.value[index])
}

// function dropdownShouldOpen(VueSelect) {
//     return VueSelect.search.length > 2 && VueSelect.open
// }

</script>
  
<style>
    .style-chooser .vs__search::placeholder,
    .style-chooser .vs__dropdown-toggle,
    .style-chooser .vs__dropdown-menu,
    .vs--searchable,
    .vs__search {
        line-height: 1.75rem !important;
    }
</style>