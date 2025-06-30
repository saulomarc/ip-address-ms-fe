import { defineStore } from 'pinia';
import { useAlertStore } from "@/stores/alert";

import instance from '@/plugins/axios-plugin';
import axios from 'axios';

import type { FilterHeader, Filters, FilterValues } from '@/types/filters';

import type { TableData } from '@/types/table';
import type { IPAddress, IpAddressData } from '@/types/ip_address';

export const useIPAddressLogsStore = defineStore('ipAddressLogs', {
    state: () => {
        return {
            ipAddresses: {} as IpAddressData,
            isInitialLoading: true,
            isLoading: false,
            filterHeaders: [ 
                // { field: 'pizza_type_id', name: 'name', type: 'input', label: 'Pizza Type' },
                // { field: 'size', name: 'size', type: 'select', label: 'Size' },
            ] as FilterHeader[],
            headers: [
                {
                    name: "id",
                    sortable: true,
                    label: "ID"
                },
                {
                    name: "ip_address",
                    sortable: true,
                    label: "IP Address"
                },
                {
                    name: "label",
                    sortable: false,
                    label: "Label"
                },
                {
                    name: "owner",
                    sortable: false,
                    label: "Owner"
                },
                {
                    name: "comment",
                    sortable: false,
                    label: "Comment"
                },
                {
                    name: "last_updated",
                    sortable: false,
                    label: "Last Updated"
                },
                {
                    name: "action",
                    sortable: false,
                    label: "Actions"
                },
            ],
            options: {
                page: 1,
                numOfItems: 5
            },
            filters: {} as Filters,
            filterValues: {} as FilterValues,
            order: {
                order_field: 'updated_at',
                order_type: 'DESC'
            },
        }
    },
    actions: {
        async fetchIPAddressData(page: number) {
            this.isLoading = true

            try {
                const response = await instance.get('super-admin/ip-addresses', {
                    params: {
                        page: page,
                        items: this.options.numOfItems,
                        ...this.order,
                        ...this.filterValues
                    }
                });

                this.ipAddresses = response.data.ip_addresses;
            } catch (err : any) {
                console.log(err)
            } finally {
                
            }

            this.isLoading = false
            this.isInitialLoading = false
        },
        async fetchFilters(payload: {column_name: string, distinct: string}) {
            this.isLoading = true

            try {
                const { data } = await instance.get("super-admin/ip-addresses", { params: payload })

                if (data) {
                    this.filters[payload.column_name] = data.ip_addresses
                } 
            } catch (error) {
                let errMessage = `Something went wrong while performing your request. Please contact administrator`;
                useAlertStore().error(errMessage)
            }
            this.isLoading = false
        },
        fetchfilterValues() {
            this.filterHeaders.forEach(filter => { // create the filter values that will be used for this generic table instance
                if (filter.type !== 'input' && filter.type !== 'date') {
                    this.fetchFilters({
                        column_name: filter.field,
                        distinct: 'true',
                    })
                }
            });
        },
        handleOptionsUpdate(options: {index: number, numOfItems: number, filters: FilterValues}) {
            this.options.numOfItems = options.numOfItems
            this.filterValues = options.filters
            this.fetchIPAddressData(1)
        },
        handleSortingUpdate(order: {order_type: string, order_field: string}) {
            this.order.order_type = order.order_type
            this.order.order_field = order.order_field
            this.fetchIPAddressData(1)
        },
        handlePagination(page: {pageValue: number}) {
            this.fetchIPAddressData(page.pageValue)
        },
    },
    getters: {
        getIPAddressData(): TableData {
            if (this.ipAddresses.data) {
                var ipAddresses = this.ipAddresses.data.map((gl) => {
                    return gl
                }) as IPAddress[]

                var paginationData = {
                    last_page: this.ipAddresses.last_page,
                    current_page: this.ipAddresses.current_page,
                }

                var tableData = {
                    data: ipAddresses,
                    ...paginationData
                }

                return tableData
            } else {
                return {
                    data: [] as IPAddress[],
                    last_page: 0,
                    current_page: 0
                }
            }
        },
    }
})