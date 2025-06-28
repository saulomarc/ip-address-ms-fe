<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{
    properties: {}
}>()
</script>

<template>
    <div class="rounded-md p-3">
        <div v-for="(property, propertyIndex) in properties" class="mb-1">
            <div v-if="propertyIndex != 'updated_at' && propertyIndex != 'created_at'" class="text-xs font-semibold flex flex-wrap items-center">
                {{ propertyIndex }} <ArrowRightIcon class="size-3 mx-1"/> <p class="break-all">{{ property ? property : "None" }}</p>
            </div>
        </div>
    </div>
</template>