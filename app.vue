<script setup>
import { ref } from 'vue'
import loading from '~/components/loading.vue'
import { useLoadingStore } from '~/stores/loading'

const loadingStore = useLoadingStore();
const isLoading = computed(() => loadingStore.getLoading);

</script>

<template>
  <NuxtPage />
  <loading v-if="isLoading" />
</template>