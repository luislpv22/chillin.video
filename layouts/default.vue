<template>
  <div class="font-sans min-h-screen bg-zinc-950 text-white">
    <header class="fixed top-0 z-10 w-full flex items-center px-14 py-10">
      <NuxtLink to="/" class="flex items-center gap-2" title="Home">
        <Logo class="h-10" />
      </NuxtLink>
      <div class="flex grow justify-center gap-1">
        <Chip selected>All</Chip>
        <Chip>Movies</Chip>
        <Chip>Series</Chip>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="secondary" size="sm" icon-only>
          <SearchIcon class="w-5 h-5" />
        </Button>
        <Button variant="secondary" size="sm">
          <HeartLineIcon class="w-5 h-5" />
          Watchlist
        </Button>
      </div>
    </header>
    <slot />
  </div>
</template>