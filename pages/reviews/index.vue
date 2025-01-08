<template>
  <div>
    <h1>후기 페이지</h1>
    <div v-if="reviews.length">
      <ul>
        <li v-for="review in reviews" :key="review.id">
          <h3>{{ review.title }}</h3>
          <p>{{ review.content }}</p>
          <small>작성자: {{ review.author }}</small>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>후기가 없습니다.</p>
    </div>
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
