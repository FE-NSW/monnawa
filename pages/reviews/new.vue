<script setup>
import { useReviewStore } from '~/stores/reviews/review'
import { useRouter } from 'vue-router'

// 스토어 불러오기
const reviewStore = useReviewStore();

// 라우터 설정
const router = useRouter();

// 리뷰할 가게 정보 불러오기
onMounted(()=>{
  const aa = reviewStore.getReviewInfol;
})

// 후기 전송 함수
const escaping = (val) => {
  reviewStore.escape(val);
  const isEscape = reviewStore.escapeStatus;
  if(isEscape){
    router.push("/reviews/detail");
  }
};
</script>

<template>
  <div>
    <strong>{{ reviewStore.getStoreName }}</strong>
    <p>{{ reviewStore.getEpName }}</p>
    <p>탈출에 성공 하셨나요?</p>
    <button type="button" @click="escaping('y')">탈출 성공~!</button>
    <button type="button" @click="escaping('n')">아깝다....실패...</button>
  </div>
</template>
