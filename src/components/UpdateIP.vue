<script setup lang="ts">
import type { IPAddress } from '@/types/ip_address';

import { useAuthStore } from '@/stores/auth';
import { useIPAddressStore } from '@/stores/ip_address';
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import router from '@/router';
import { computed } from 'vue';
import * as yup from 'yup';

const props = defineProps<{
    mode: String
    ip_address: IPAddress
}>()

const ipSchema = yup.object({
    ip_address: yup.string().required("IP Address is a required field"),
    label: yup.string().required("Label is a required field"),
});

const authStore = useAuthStore()
const ipAddressStore = useIPAddressStore()

const editableIp = props.ip_address
const isLoading = computed(() => ipAddressStore.isLoading)

async function handleSubmitIp() {
    var success = false
    if (props.mode === 'Add') {
        success = await ipAddressStore.addIpAddress(editableIp)
    } else {
        success = await ipAddressStore.editIpAddress(editableIp)
    }

    if (success) {
        router.push({ name: 'home' })
    }
}

</script>

<template>
    <VeeForm ref="refDestinationForm" v-slot="{ handleSubmit }" :validation-schema="ipSchema" as="div" class="bg-white p-4 shadow-md drop-shadow-md rounded-md">
        <form class="space-y-6" @submit.prevent.stop="handleSubmit($event, handleSubmitIp)">
            <div class="mb-4 flex items-center">
                <router-link to="/">
                    <ArrowLeftIcon class="size-5 mr-2" />
                </router-link>
                <h3 class="text-lg font-bold">{{ mode }} {{ mode == 'Add' ? 'New' : '' }} IP Address</h3>
            </div>
            <div class="mb-3">
                <label for="ip_address" class="block text-sm/6 font-medium text-gray-900">IP Address</label>
                <Field v-model="editableIp.ip_address" v-slot="{ field }" name="ip_address">
                    <input v-bind="field" type="text" name="ip_address" id="ip_address" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" :class="{'opacity-50 cursor-not-allowed': mode == 'Edit'}" :disabled="mode == 'Edit'" />
                </Field>
                <ErrorMessage v-slot="{ message }" as="div" name="ip_address">
                    <p class="text-xs text-red-600">{{ message }}</p>
                </ErrorMessage>
            </div>
            <div class="mb-3">
                <label for="label" class="block text-sm/6 font-medium text-gray-900">Label</label>
                <Field v-model="editableIp.label" v-slot="{ field }" name="label">
                    <input v-bind="field" type="text" name="label" id="label" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </Field>
                <ErrorMessage v-slot="{ message }" as="div" name="label">
                    <p class="text-xs text-red-600">{{ message }}</p>
                </ErrorMessage>
            </div>
            <div class="mb-3">
                <label for="comment" class="block text-sm/6 font-medium text-gray-900">Add a comment</label>
                <div class="mt-2">
                    <textarea v-model="editableIp.comment" rows="4" name="comment" id="comment" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" :class="{'opacity-50 cursor-not-allowed': mode == 'Edit'}" :disabled="mode == 'Edit'" />
                </div>
            </div>
            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer" :class="{'opacity-50 cursor-not-allowed': isLoading}" :disabled="isLoading"> {{ mode == 'Add' ? 'Submit' : 'Save' }}</button>
            </div>
        </form>
    </VeeForm>
</template>

<style scoped>

</style>
