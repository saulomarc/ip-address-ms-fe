<script setup lang="ts">
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
    totalPages: number,
    currentPage: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()

function calculatePagesDisplayed() {
    let maxPagesToShow = 7;
    const sidePages = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, props.currentPage - sidePages);
    let endPage = Math.min(props.totalPages, props.currentPage + sidePages);

    if (props.currentPage - 1 < sidePages) {
        startPage = 1;
        endPage = Math.min(props.totalPages, maxPagesToShow);
    } else if (props.totalPages - props.currentPage < sidePages) {
        startPage = Math.max(1, props.totalPages - maxPagesToShow + 1);
        endPage = props.totalPages;
    }

    const pages = []

    // Generate page numbers
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return pages;
}

function hasPreviousPage() {
    if (props.currentPage == 1) {
        return false
    }
    return true
}

function hasNextPage() {
    if (props.currentPage == props.totalPages) {
        return false
    }
    return true
}

function updatePage(page: number) {
    emit('change', page)
}
</script>

<template>
    <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 pb-2">
        <div class="-mt-px flex w-0 flex-1 ml-2">
            <button @click="updatePage(currentPage - 1)" v-if="hasPreviousPage()" class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" :disabled="!hasPreviousPage()">
                <ArrowLongLeftIcon class="mr-3 size-5 text-gray-400" aria-hidden="true" />
                Previous
            </button>
        </div>
        <div class="hidden md:-mt-px md:flex">
            <button @click="updatePage(pageNumber)" v-for="(pageNumber, pageNumberIndex) in calculatePagesDisplayed()" :key="pageNumberIndex" :class="pageNumber !== currentPage ? 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:cursor-pointer' : 'inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600 hover:cursor-pointer'">
                {{ pageNumber }}
            </button>
        </div>
        <div class="-mt-px flex w-0 flex-1 justify-end mr-2">
            <button @click="updatePage(currentPage + 1)" v-if="hasNextPage()" class="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" :disabled="!hasNextPage()">
                Next
                <ArrowLongRightIcon class="ml-3 size-5 text-gray-400" aria-hidden="true" />
            </button>
        </div>
    </nav>
</template>

<style>

</style>