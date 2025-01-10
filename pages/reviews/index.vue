<template>
  <div>
    리뷰 목록 페이지입니다.
    아직 내용이 없음

    <NuxtLink to="/reviews/new">Go to review start</NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 후기 데이터 예시
const reviews = ref([]);

// 후기를 서버에서 가져오는 함수 (예시로 API 사용)
const fetchReviews = async () => {
  // 실제로는 여기에서 API 호출을 사용합니다.
  // 예시 데이터
  reviews.value = [
    { id: 1, title: '좋아요', content: '너무 좋았어요!', author: '홍길동' },
    { id: 2, title: '만족합니다', content: '서비스가 매우 친절했습니다.', author: '김철수' },
  ];
};

// 페이지가 마운트되면 후기를 가져옵니다.
onMounted(() => {
  fetchReviews();
});
</script>
