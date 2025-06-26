<template>
    <div class="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 class="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
        <p class="text-lg text-gray-700 mb-6">
            You do not have permission to access this page.
        </p>
        <router-link to="/" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
            Go Home
        </router-link>
    </div>
</template>