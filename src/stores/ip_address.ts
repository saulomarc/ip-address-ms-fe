import { defineStore } from 'pinia';
import { useAlertStore } from "@/stores/alert";

import router from '@/router';
import instance from '@/plugins/axios-plugin';
import axios from 'axios';

import type { FilterHeader, Filters, FilterValues } from '@/types/filters';
import type { IpAddressData, IPAddress } from '@/types/ip_address';
import type { TableData } from '@/types/table';

export const useIPAddressStore = defineStore('ipAddress', {
    state: () => {
        return {
            ipAddresses: {} as IpAddressData,
            ipAddress: {} as IPAddress,
            isInitialLoading: true,
            isLoading: false,
            filterHeaders: [ 
                { field: 'owner_name_like', name: 'owner_name_like', type: 'input', label: 'Owner Name' },
                { field: 'ip_address_like', name: 'ip_address_like', type: 'input', label: 'IP Address' },
                { field: 'label_like', name: 'label_like', type: 'input', label: 'Label' },
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
                order_field: 'created_at',
                order_type: 'DESC'
            },
        }
    },
    actions: {
        async fetchIpAddressesData(page: number) {
            this.isLoading = true

            try {
                const response = await instance.get('/ip-addresses', {
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
        async fetchIpAddress(id: string) {
            this.isLoading = true

            try {
                const response = await instance.get(`/ip-addresses/${id}`);

                this.ipAddress = response.data.ip_address;
            } catch (err : any) {
                console.log(err)
            } finally {
                
            }

            this.isLoading = false
            this.isInitialLoading = false
        },
        async editIpAddress(payload: IPAddress) {
            this.isLoading = true

            try {
                const response = await instance.put(`/ip-addresses/${payload.id}`, {
                    label: payload.label
                });

                useAlertStore().success("Successfully Edited New IP Address!")
                this.isLoading = false

                return true
            } catch (err : any) {
                if (!axios.isAxiosError(err)) {
                    const errMessage = `Something went wrong while performing your request. Please contact administrator`;
                    useAlertStore().error(errMessage)
                } else if (err.status !== 403) {
                    useAlertStore().error(err.message)
                }
                this.isLoading = false

                return false
            } finally {
                
            }
        },
        async addIpAddress(payload: IPAddress) {
            this.isLoading = true

            try {
                const response = await instance.post(`/ip-addresses`, payload);

                useAlertStore().success("Successfully Added New IP Address!")
                this.isLoading = false

                return true
            } catch (err : any) {
                if (!axios.isAxiosError(err)) {
                    const errMessage = `Something went wrong while performing your request. Please contact administrator`;
                    useAlertStore().error(errMessage)
                } else {
                    useAlertStore().error(err.message)
                }
                this.isLoading = false

                return false
            } finally {
                
            }

        },
        async deleteIpAddress(id: number) {
            this.isLoading = true

            try {
                const response = await instance.delete(`/ip-addresses/${id}`);

                useAlertStore().success("Successfully Deleted IP Address!")
                this.fetchIpAddressesData(1)
                this.isLoading = false

                return true
            } catch (err : any) {
                if (!axios.isAxiosError(err)) {
                    const errMessage = `Something went wrong while performing your request. Please contact administrator`;
                    useAlertStore().error(errMessage)
                } else if (err.status !== 403) {
                    useAlertStore().error(err.message)
                }
                this.isLoading = false

                return false
            } finally {
                
            }

        },
        async fetchTestData() {
            try {
                const response = await instance.get('https://jsonplaceholder.typicode.com/todos/1');
                console.log(response)

                useAlertStore().success("I swear to Zeus you're Aphrodite in disguise")
            } catch (err : any) {
                console.log(err)
            } finally {
                
            }
        },
        async fetchFilters(payload: {column_name: string, distinct: string}) {
            this.isLoading = true

            try {
                const { data } = await instance.get("ingredients", { params: payload })

                if (data) {
                    this.filters[payload.column_name] = data.ingredients
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
            this.fetchIpAddressesData(1)
        },
        handleSortingUpdate(order: {order_type: string, order_field: string}) {
            this.order.order_type = order.order_type
            this.order.order_field = order.order_field
            this.fetchIpAddressesData(1)
        },
        handlePagination(page: {pageValue: number}) {
            this.fetchIpAddressesData(page.pageValue)
        },
    },
    getters: {
        getIpAddressData(): TableData {
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