import { defineStore } from 'pinia';
import { useAlertStore } from "@/stores/alert";
import { type User } from '@/types/user';

import router from '@/router';
import instance from '@/plugins/axios-plugin';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: null as string | null,
            authenticated: false,
            user: {},
            roles: [],
            permissions: []
        }
    },
    actions: {
        async loginUser(payload: {email: string, password: string}): Promise<void> {
            try {
                const { data } = await instance.post('login', payload);
                
                this.handleCallback(data)
            } catch (error) {
                if (!axios.isAxiosError(error)) {
                    const errMessage = `Something went wrong while performing your request. Please contact administrator`;
                    useAlertStore().error(errMessage)
                }
            }
        },
        async registerUser(payload: {name: string, email: string, password: string}): Promise<void> {
            try {
                const { data } = await instance.post('register', payload);
                
                this.handleCallback(data)
            } catch (error) {
                if (!axios.isAxiosError(error)) {
                    const errMessage = `Something went wrong while performing your request. Please contact administrator`;
                    useAlertStore().error(errMessage)
                }
            }
        },
        async handleCallback(payload: { authorization: {token: string, type: string}, user: User, status: string, error: unknown; }) {
            try {
                this.setLoginDetails(payload)
                router.push({ name: 'home' })
            } catch (error) {
                const errMessage = `Something went wrong while performing your request. Please contact administrator`;
                useAlertStore().error(errMessage)
            }
        },
        async logout() {
            this.token = null
            this.authenticated = false
            this.user = {}

            router.push({ name: 'login' })
        },
        setLoginDetails(loginDetails: { authorization: {token: string, type: string}, user: User, status: string, error: unknown; }) {
            this.token = loginDetails.authorization.token
            this.user = loginDetails.user
            this.authenticated = true
        },
        async logoutUser() {
            await instance.post('auth/logout')
            
            this.logout()

            router.push({ name: 'login' })
        },
        async fetchTestData() {
            try {
                const response = await axios('https://jsonplaceholder.typicode.com/todos/1');
                console.log(response)

                useAlertStore().success("I swear to Zeus you're Aphrodite in disguise")
            } catch (err : any) {
                console.log(err)
            } finally {
                
            }
        }
    }
})