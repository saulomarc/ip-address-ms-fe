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
            user: {} as User,
            roles: [] as string[],
            permissions: [] as string[]
        }
    },
    persist: true,
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
        async handleCallback(payload: { access_token: string, type: string, expires_in: Number }) {
            try {
                this.setLoginDetails(payload)
                const { data } = await instance.post('auth/me');
                
                if (data) {
                    this.getRoles(data)
                    this.getPermissions(data)
                    this.setUserDetails(data)
                    router.push({ name: 'home' })
                }
            } catch (error) {
                if (!axios.isAxiosError(error)) {
                    const errMessage = `Something went wrong while performing your request. Please contact administrator`;
                    useAlertStore().error(errMessage)
                }
            }
        },
        async logout() {
            try {
                const { data } = await instance.post('auth/logout');
                this.unsetLoginDetails()
            } catch (error) {
                if (!axios.isAxiosError(error)) {
                    const errMessage = `Something went wrong while performing your request. Please contact administrator`;
                    useAlertStore().error(errMessage)
                }
            }            
        },
        unsetLoginDetails() {
            this.token = null
            this.authenticated = false
            this.user = {} as User

            router.push({ name: 'login' })
        },
        setLoginDetails(loginDetails: { access_token: string, type: string, expires_in: Number }) {
            this.token = loginDetails.access_token
            this.authenticated = true
        },
        setUserDetails(userDetails: User) {
            this.user = userDetails

            useAlertStore().success('Welcome back, ' + this.user.name + '!')
        },
        async logoutUser() {
            await instance.post('auth/logout')
            
            this.logout()

            router.push({ name: 'login' })
        },
        getRoles(userInfo: User) {
            var roles: string[] = []

            userInfo.roles!.forEach(role => {
                roles.push(role.name)
            });

            this.roles = roles
        },
        getPermissions(userInfo: User) {
            var permissions: string[] = []

            userInfo.permissions!.forEach(permission => {
                permissions.push(permission.name)
            });

            this.permissions = permissions
        },
        checkRole(pageRole: string) {
            return this.roles.filter(
                (role) => role === pageRole
            ).length;
        },  
        checkPermission(pagePermission: string) {
            return this.permissions.filter((permission) => {
                if (pagePermission) {
                    return pagePermission.includes(permission)
                } else {
                    return false
                }
            }).length;
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