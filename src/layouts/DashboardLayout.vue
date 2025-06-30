<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { PlusIcon, UserCircleIcon } from '@heroicons/vue/20/solid'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const store = useAuthStore()

const { checkRole } = store

const user = computed(() => store.user)
</script>

<template>
    <header class="">
        <Disclosure as="nav" class="bg-white shadow-sm fixed w-full" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 justify-between">
                    <div class="flex">
                        <div class="mr-2 -ml-2 flex items-center md:hidden">
                            <!-- Mobile menu button -->
                            <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset">
                                <span class="absolute -inset-0.5" />
                                <span class="sr-only">Open main menu</span>
                                <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                                <XMarkIcon v-else class="block size-6" aria-hidden="true" />
                            </DisclosureButton>
                        </div>
                        <div class="flex shrink-0 items-center">
                            <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                        </div>
                        <div class="hidden md:ml-6 md:flex md:space-x-8">
                            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                            <router-link to="/" class="inline-flex items-center px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700 hover:border-b-2" activeClass="border-indigo-500 text-gray-900 border-b-2">Dashboard</router-link>
                            <router-link v-if="checkRole('super_admin')" to="/audit" class="inline-flex items-center px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700 hover:border-b-2" activeClass="border-indigo-500 text-gray-900 border-b-2">Audit</router-link>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="shrink-0">
                            <router-link to="/add-new-ip" class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <PlusIcon class="-ml-0.5 size-5" aria-hidden="true" />
                                New IP
                            </router-link>
                        </div>
                        <div class="hidden md:ml-4 md:flex md:shrink-0 md:items-center">
                            <!-- Profile dropdown -->
                            <Menu as="div" class="relative ml-3">
                                <div>
                                    <MenuButton class="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                                        <span class="absolute -inset-1.5" />
                                        <span class="sr-only">Open user menu</span>
                                        <UserCircleIcon class="size-8 rounded-full"/>
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                                        <MenuItem v-slot="{ active }">
                                            <a href="#" @click="store.logout()" :class="[active ? 'bg-gray-100 outline-hidden' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            
            <DisclosurePanel class="md:hidden">
                <div class="space-y-1 pt-2 pb-3">
                    <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
                    <DisclosureButton as="a" href="/" class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700 sm:pr-6 sm:pl-5">Dashboard</DisclosureButton>
                    <DisclosureButton v-if="checkRole('super_admin')" as="a" href="/audit" class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pr-6 sm:pl-5">Audit</DisclosureButton>
                </div>
                <div class="border-t border-gray-200 pt-4 pb-3">
                    <div class="flex items-center px-4 sm:px-6">
                        <div class="shrink-0">
                            <UserCircleIcon class="size-10 rounded-full"/>
                        </div>
                        <div class="ml-3">
                            <div class="text-base font-medium text-gray-800">{{ user.name }}</div>
                            <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
                        </div>
                    </div>
                    <div class="mt-3 space-y-1">
                        <DisclosureButton as="a" href="#" @click="store.logout()" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6">Sign out</DisclosureButton>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    </header>
    
    <div class="md:px-20 px-4 pt-24 bg-neutral-50 min-h-screen">
        <RouterView />
    </div>
</template>