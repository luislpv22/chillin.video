<script setup lang="ts">
import { ref } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';
import type { Media, MediaType } from '~/types/media';

interface Props {
  title: string;
  items: Media[];
}

defineProps<Props>();

const movieStore = useMediaStore();

const typeRouteMap: Record<MediaType, string> = {
  movie: 'movies',
  series: 'series',
};

const [emblaRef, emblaApi] = emblaCarouselVue({
  skipSnaps: true
});

const getItemUrl = (item: Media) => {
  return `/${typeRouteMap[item.type]}/${item.id}`;
};

const canScrollPrev = ref(false);
const canScrollNext = ref(false);

const updateNavigation = () => {
  if (!emblaApi.value) {
    return;
  }
  canScrollPrev.value = emblaApi.value?.canScrollPrev();
  canScrollNext.value = emblaApi.value?.canScrollNext();
};

const showNavigation = computed(() => canScrollNext.value || canScrollPrev.value);

onMounted(() => {
  if (emblaApi.value) {
    updateNavigation();
    emblaApi.value.on('scroll', updateNavigation);
  }
})

const selectedId = ref<string | null>(null);
const selectItem = (item: Media) => {
  selectedId.value = item.id;
  movieStore.setCurrentMovie(item);
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-5 md:mb-6">
      <h3 class="text-2xl md:text-[2rem]">{{ title }}</h3>
      <div v-if="showNavigation" class="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          icon-only
          :disabled="!canScrollPrev"
          @click="emblaApi?.scrollPrev"
        >
          <AngleLeftIcon class="w-5 h-5" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon-only
          :disabled="!canScrollNext"
          @click="emblaApi?.scrollNext"
        >
          <AngleRightIcon class="w-5 h-5" />
        </Button>
      </div>
    </div>
    <div ref="emblaRef">
      <div class="flex items-center gap-4 select-none">
        <NuxtLink
          v-for="item in items"
          :key="item.id"
          :to="getItemUrl(item)"
          class="group h-72 md:h-96 hover:scale-105 transition-transform duration-200 shrink-0 aspect-[2/3]"
          @click.prevent="() => selectItem(item)">
          <img :src="item.poster" class="h-full w-auto object-cover rounded-xl" :class="{
            '[view-transition-name:movie-poster]': item.id === selectedId,
          }" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>