<template>
    <VueFinalModal :lock-scroll="lockScroll" class="flex justify-center items-center"
    content-class="relative flex flex-col min-w-[25%] max-w-screen-lg max-h-full mx-4 rounded-md bg-white dark:bg-gray-900">
    <div class="bg-up-maroon uppercase font-bold text-lg text-center text-white py-3 px-5 rounded-t-md">
        <slot name="title">
            
        </slot>
    </div>
    <div class="py-3 px-5 max-h-full overflow-y-auto w-full bg-white">
        <slot name="content">
            
        </slot>
    </div>
    
    <div class="pb-3 pt-1.5 px-5 flex justify-center border-t border-gray-400 bg-white">
        <slot name="buttons">
            
        </slot>
    </div>
</VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

interface Props {
    lockScroll?: boolean
}

const {lockScroll = false} = defineProps<Props>()
</script>