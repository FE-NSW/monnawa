<script setup>
import alertPage from '~/components/alertPage.vue'

const handleAction = () => {
  console.log('버튼액션')
}
</script>

<template>
  <alertPage 
    :title= "'초대하기 완료'"
    :description="'즐거운 방탈출 하세요!'"
    :buttonText="'작성한 초대장 보기'"
    :buttonAction="handleAction"
  />
</template>

<style scoped>
</style>



