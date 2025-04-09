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
const response = ref(null);
const errors = ref<Record<string, string>>({});

const submit = async (event: Event) => {
  const formData = new FormData(event.target as HTMLFormElement);
  response.value = await $fetch('/api/contact', {
    method: 'POST',
    body: formData,
  }).catch(err => {
    errors.value = Object.entries(err.data).reduce<Record<string, string>>((acc, [key, value]) => {
      if ((value as Record<string, Array<string>>)._errors?.length) {
        acc[key] = (value as Record<string, Array<string>>)._errors[0];
      }
      return acc;
    }, {});
    return err;
  });
};

const close = () => {
  open.value = false;
  response.value = null;
  errors.value = {};
};
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger v-bind="$attrs">
      Help
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-20 bg-zinc-900/50 backdrop-blur-sm" />
      <DialogContent class="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-zinc-900/90 p-10 md:p-12 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100] text-white backdrop-blur-sm">
        <DialogTitle class="text-2xl md:text-3xl font-medium">Need Help?</DialogTitle>
        <DialogDescription class="mt-1 text-zinc-400 text-sm md:text-base">Tell us what you need help with.</DialogDescription>
        <DialogClose class="absolute top-7 right-7 cursor-pointer text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-full p-2">
          <CloseIcon class="w-5 h-5" />
        </DialogClose>
        <form v-if="response !== true" class="mt-2 md:mt-8" @submit.prevent="submit">
          <FormControl
            control="input"
            type="email"
            name="email"
            required
            :error="errors.email"
            class="mt-1 block w-full rounded-md border-0 bg-zinc-700/50 px-4 py-2 md:py-2.5 placeholder:text-zinc-600 focus:outline-zinc-700 sm:leading-6"
            @focus="errors.email = ''"
          >
            Email
          </FormControl>
          <FormControl
            control="textarea"
            name="message"
            required
            rows="6"
            :error="errors.message"
            class="mt-1 block w-full rounded-md border-0 bg-zinc-700/50 px-4 py-2 md:py-2.5 placeholder:text-zinc-600 outline-zinc-700 sm:leading-6"
            @focus="errors.message = ''"
          >
            Message
          </FormControl>
          <div class="mt-8 md:mt-12 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              @click="close"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Submit
            </Button>
          </div>
        </form>
        <div v-else class="mt-8">
          <div class="flex flex-col items-center justify-center py-16 mb-4">
            <MailCheckFillIcon class="w-16 h-16 text-zinc-300 mb-2" />
            <p class="text-lg text-white">Message sent successfully!</p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            class="ml-auto"
            @click="close"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>