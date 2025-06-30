import { defineStore } from 'pinia';
import { useAlertStore } from "@/stores/alert";

import instance from '@/plugins/axios-plugin';
import axios from 'axios';

import type { FilterHeader, Filters, FilterValues } from '@/types/filters';

import type { TableData } from '@/types/table';
import type { UserSession, UserSessionData } from '@/types/audit_log';

export const useUserSessionStore = defineStore('userSession', {
    state: () => {
        return {
            userSessions: {} as UserSessionData,
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
                    name: "session_id",
                    sortable: true,
                    label: "Session ID"
                },
                {
                    name: "user",
                    sortable: false,
                    label: "User"
                },
                {
                    name: "log_on",
                    sortable: false,
                    label: "Logged On"
                },
                {
                    name: "log_out",
                    sortable: false,
                    label: "Logged Out"
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
        async fetchUserSessionData(page: number) {
            this.isLoading = true

            try {
                const response = await instance.get('super-admin/user-sessions', {
                    params: {
                        page: page,
                        items: this.options.numOfItems,
                        ...this.order,
                        ...this.filterValues
                    }
                });

                this.userSessions = response.data.user_sessions;
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
                const { data } = await instance.get("super-admin/user-sessions", { params: payload })

                if (data) {
                    this.filters[payload.column_name] = data.user_sessions
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
            this.fetchUserSessionData(1)
        },
        handleSortingUpdate(order: {order_type: string, order_field: string}) {
            this.order.order_type = order.order_type
            this.order.order_field = order.order_field
            this.fetchUserSessionData(1)
        },
        handlePagination(page: {pageValue: number}) {
            this.fetchUserSessionData(page.pageValue)
        },
    },
    getters: {
        getUserSessionData(): TableData {
            if (this.userSessions.data) {
                var userSessions = this.userSessions.data.map((gl) => {
                    return gl
                }) as UserSession[]

                var paginationData = {
                    last_page: this.userSessions.last_page,
                    current_page: this.userSessions.current_page,
                }

                var tableData = {
                    data: userSessions,
                    ...paginationData
                }

                return tableData
            } else {
                return {
                    data: [] as UserSession[],
                    last_page: 0,
                    current_page: 0
                }
            }
        },
    }
})