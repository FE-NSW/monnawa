<script setup>
import { ref } from 'vue'
import loading from '~/components/loading.vue'
import { useLoadingStore } from '~/stores/loading'

const loadingStore = useLoadingStore();
const isLoading = computed(() => loadingStore.getLoading);

// 로딩 상태에 따라 body 태그에 클래스를 추가/제거
watch(isLoading, (newValue) => {
  if (newValue) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});
</script>

<template>
  <div class="wrapper">
    <NuxtPage />
    <loading v-if="isLoading" />
  </div>
</template>