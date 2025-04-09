<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { NuxtLink } from '#components';

const { y } = useWindowScroll();

const showNav = ref(true);

watch(y, (newValue, oldValue) => {
  if (newValue > oldValue) {
    showNav.value = false;
  } else if (newValue > 0) {
    showNav.value = true;
  }
});
</script>

<template>
  <div class="font-sans min-h-screen bg-zinc-950 text-white">
    <header class="fixed top-0 z-10 w-full flex justify-between items-center gap-4 px-6 pr-4 md:px-14 py-6 md:py-10">
      <div
        class="absolute -z-1 left-0 top-0 w-full h-[150%] bg-transparent transition duration-500 mask-b-from-25% pointer-events-none"
        :class="y > 50 ? 'bg-zinc-950/80 backdrop-blur-sm' : ''"
      ></div>
      <NuxtLink to="/" class="flex items-center gap-2 lg:mr-32" title="Home">
        <Logo class="h-8 md:h-10" />
      </NuxtLink>
      <div class="hidden lg:flex p-1 justify-center gap-1 bg-zinc-800/50 backdrop-blur-xs rounded-full">
        <Chip to="/">All</Chip>
        <Chip to="/movies">Movies</Chip>
        <Chip to="/series">Series</Chip>
      </div>
      <div class="flex items-center gap-2">
        <HelpForm class="hidden lg:block px-4 cursor-pointer hover:text-zinc-200" />
        <Button :as="NuxtLink" to="/search" variant="secondary" size="sm" icon-only>
          <SearchIcon class="w-5 h-5" />
        </Button>
        <Button
          :as="NuxtLink"
          to="/watchlist"
          variant="secondary"
          size="sm"
          class="hidden lg:flex"
          >
          <HeartLineIcon class="w-5 h-5" />
          Watchlist
        </Button>
        <Button
          :as="NuxtLink"
          to="/watchlist"
          variant="secondary"
          size="sm"
          icon-only
          class="lg:hidden"
          >
          <HeartLineIcon class="w-5 h-5" />
        </Button>
        <MobileMenu class="lg:hidden" />
      </div>
    </header>
    <slot />
  </div>
</template>