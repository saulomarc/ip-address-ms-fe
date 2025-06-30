<template>
    <!-- <div>
        <TransitionRoot as="template" :show="isOpen" :unmount="false">
            <Dialog class="relative z-10" @close="closeModal">
                <TransitionChild :unmount="false" as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
                </TransitionChild>
                
                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild :unmount="false" as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                    <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden" @click.prevent="closeModal">
                                        <span class="sr-only">Close</span>
                                        <XMarkIcon class="size-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div class="mr-4">
                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <div>
                                            {{ isOpen }}
                                        </div>
                                        <DialogTitle as="h3" class="text-base font-semibold text-gray-900">
                                            <slot name="title"> </slot>
                                        </DialogTitle>
                                        <div class="mt-2">
                                            <slot name="content"> </slot>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div> -->
    <div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-show="isOpen">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
        <div class="fixed z-50 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg max-w-sm w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-8 sm:pb-4">
                        <button @click="closeModal" class="absolute top-3 right-4">
                            <XCircleIcon class="size-7 hover:cursor-pointer text-gray-500" />
                        </button>
                        <div class="">
                            <div class="mt-3 text-center sm:mt-0 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title"><slot name="title"> </slot></h3>
                                <div class="mt-2">
                                    <slot name="content"> </slot>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XCircleIcon } from '@heroicons/vue/24/outline'

interface Props {
    isOpen?: boolean
}

const {isOpen = false} = defineProps<Props>()

const emit = defineEmits<{
    onCloseModal: []
}>()

function closeModal() {
    emit("onCloseModal")
}
</script>
