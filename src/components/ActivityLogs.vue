<template>
    <div class="flow-root">
        <ul v-if="logs.length > 0" role="list" class="-mb-8">
            <li v-for="(activityItem, activityItemIdx) in logs" :key="activityItem.id">
                <div class="relative pb-4">
                    <span v-if="activityItemIdx !== logs.length - 1" class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    <div class="relative flex items-start space-x-3">
                        <template v-if="activityItem.description === 'created'">
                            <div class="relative">
                                <UserCircleIcon class="flex size-10 items-center justify-center rounded-full text-gray-500 bg-gray-100 ring-8 ring-white" aria-hidden="true" />
                                                                
                                <span class="absolute -right-1 -bottom-0.5 rounded-tl bg-white px-0.5 py-px">
                                    <PlusIcon class="size-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </div>
                            <div class="min-w-0 flex-1">
                                <div>
                                    <div class="text-sm">
                                        <span class="font-medium text-gray-900">{{ activityItem.user_name }}</span>
                                    </div>
                                    <p class="mt-0.5 text-sm text-gray-500">Created IP Address # {{ activityItem.subject_id }}</p>
                                    <p class="mt-0.5 text-sm text-gray-500">{{ dayjs(activityItem.created_at).format('MMMM DD, YYYY hh:mm A') }}</p>
                                </div>
                                <div class="text-sm text-gray-700">
                                    <ActivityDetails :properties="activityItem.properties.new!" />
                                </div>
                            </div>
                        </template>
                        <template v-else-if="activityItem.description === 'edited'">
                            <div class="relative">
                                <UserCircleIcon class="flex size-10 items-center justify-center rounded-full text-gray-500 bg-gray-100 ring-8 ring-white" aria-hidden="true" />
                                                                
                                <span class="absolute -right-1 -bottom-0.5 rounded-tl bg-white px-0.5 py-px">
                                    <PencilSquareIcon class="size-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </div>
                            <div class="min-w-0 flex-1">
                                <div>
                                    <div class="text-sm">
                                        <span class="font-medium text-gray-900">{{ activityItem.user_name }}</span>
                                    </div>
                                    <p class="mt-0.5 text-sm text-gray-500">Edited IP Address # {{ activityItem.subject_id }}</p>
                                    <p class="mt-0.5 text-sm text-gray-500">{{ dayjs(activityItem.created_at).format('MMMM DD, YYYY hh:mm A') }}</p>
                                </div>
                                <div class="mt-2 text-sm text-gray-700">
                                    <label for="old_values" class="block text-sm font-medium">Old Values</label>
                                    <ActivityDetails :properties="activityItem.properties.old!" />
                                    <label for="new_values" class="block text-sm font-medium">New Values</label>
                                    <ActivityDetails :properties="activityItem.properties.new!" />
                                </div>
                            </div>
                        </template>
                        <template v-else-if="activityItem.description === 'deleted'">
                            <div class="relative">
                                <UserCircleIcon class="flex size-10 items-center justify-center rounded-full text-gray-500 bg-gray-100 ring-8 ring-white" aria-hidden="true" />
                                                                
                                <span class="absolute -right-1 -bottom-0.5 rounded-tl bg-white px-0.5 py-px">
                                    <TrashIcon class="size-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </div>
                            <div class="min-w-0 flex-1">
                                <div>
                                    <div class="text-sm">
                                        <span class="font-medium text-gray-900">{{ activityItem.user_name }}</span>
                                    </div>
                                    <p class="mt-0.5 text-sm text-gray-500">Deleted IP Address # {{ activityItem.subject_id }}</p>
                                    <p class="mt-0.5 text-sm text-gray-500">{{ dayjs(activityItem.created_at).format('MMMM DD, YYYY hh:mm A') }}</p>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else class="text-center italic mt-8">
            -- No Activity Recorded --
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ActivityLog } from '@/types/audit_log';
import {UserCircleIcon, PlusIcon, PencilSquareIcon, TrashIcon} from '@heroicons/vue/20/solid'
import ActivityDetails from './Audit/ActivityDetails.vue';
import dayjs from 'dayjs';


const props = defineProps<{
    logs: ActivityLog[]
}>()

const activity = [
{
    id: 1,
    type: 'comment',
    person: { name: 'Eduardo Benz', href: '#' },
    imageUrl:
    'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
    date: '6d ago',
},
{
    id: 2,
    type: 'assignment',
    person: { name: 'Hilary Mahy', href: '#' },
    assigned: { name: 'Kristin Watson', href: '#' },
    date: '2d ago',
},
{
    id: 3,
    type: 'tags',
    person: { name: 'Hilary Mahy', href: '#' },
    tags: [
    { name: 'Bug', href: '#', color: 'fill-red-500' },
    { name: 'Accessibility', href: '#', color: 'fill-indigo-500' },
    ],
    date: '6h ago',
},
{
    id: 4,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
},
]
</script>