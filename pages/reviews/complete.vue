<script setup>
import alertPage from '~/components/alertPage.vue'

const handleAction = () => {
  console.log('버튼액션')
}
</script>

<template>
  <alertPage 
    :title= "'리뷰 작성 완료'"
    :description="'소중한 추억을 남기셨네요^^'"
    :buttonText="'오늘의 MVP투표'"
    :buttonAction="handleAction"
  />
</template>

<style scoped>
</style>



