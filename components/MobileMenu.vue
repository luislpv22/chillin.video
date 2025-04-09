<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui';

const open = ref(false);
const close = () => {
  open.value = false;
};

const menu = [
  {
    url: '/',
    title: 'All',
  },
  {
    url: '/movies',
    title: 'Movies',
  },
  {
    url: '/series',
    title: 'Series',
  }
];
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger
      class="px-2 cursor-pointer hover:text-zinc-200"
      v-bind="$attrs"
    >
      <MenuIcon class="w-5 h-5" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-20 bg-zinc-900/50 backdrop-blur-sm" />
      <DialogContent class="absolute top-0 right-0 z-21 w-[80vw] h-screen bg-zinc-900/90">
        <div class="flex flex-col gap-2 px-4 py-4">
          <DialogClose class="ml-auto cursor-pointer text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-full p-2">
            <CloseIcon class="w-4 h-4" />
          </DialogClose>
          <NuxtLink
            v-for="item in menu"
            :key="item.url"
            :to="item.url"
            class="font-medium px-4 py-2 rounded-xl"
            :class="$route.fullPath === item.url ? 'bg-primary' : 'text-zinc-300 hover:text-white'"
            @click.prevent="close"
          >
            <span>{{ item.title }}</span>
          </NuxtLink>
          <div class="mt-4 border-t border-zinc-800">
            <HelpForm class="text-start text-zinc-300 font-medium px-4 py-2 my-3" />
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>