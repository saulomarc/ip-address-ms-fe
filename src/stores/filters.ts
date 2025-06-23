import { defineStore } from 'pinia';
import type { FilterValues } from '@/types/filters';

export const useFilterStore = defineStore('filters', {
    state: () => {
        return {
            filterValues: [] as FilterValues[]
        }
    },
    actions: {
        createFilters (data: {index: number, key: string, value: string}) {
            this.filterValues[data.index][data.key] = data.value
        },
        updateFilterValues (data: {index: number, key: string, value: any}) {
            this.filterValues[data.index][data.key] = data.value
        },
        initializeFilterValues (index: number) {
            this.filterValues[index] = {}
        }
    }
})