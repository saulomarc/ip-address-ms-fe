<script setup lang="ts">
import type { IPAdress } from '@/types/ip_address';

const props = defineProps<{
    mode: String
    ip_address: IPAdress
}>()

const editable_ip = props.ip_address

</script>

<template>
    <div class="w-1/2">
        <div class="mb-3">
            <label for="ip-address" class="block text-sm/6 font-medium text-gray-900">IP Address</label>
            <div class="mt-2">
              <input v-model="editable_ip.ipAddress" type="text" name="ip-address" id="ip-address" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mb-3">
            <label for="label" class="block text-sm/6 font-medium text-gray-900">Label</label>
            <div class="mt-2">
              <input v-model="editable_ip.label" type="text" name="label" id="label" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mb-3">
            <label for="comment" class="block text-sm/6 font-medium text-gray-900">Add a comment</label>
            <div class="mt-2">
                <textarea v-model="editable_ip.comment" rows="4" name="comment" id="comment" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm/6 font-semibold text-gray-900 hover:cursor-pointer">Cancel</button>
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"> {{ mode == 'add' ? 'Submit' : 'Save' }}</button>
        </div>
    </div>
</template>

<style scoped>

</style>
