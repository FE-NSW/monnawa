<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Swiper 스타일 추가

// Props
defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => []
  }
});

// Emit Swiper instance
defineExpose({
  swiperInstance: () => document.querySelector('.custom-swiper').swiper
});
</script>


<template>
  <div class="slide-container">
    
    <swiper
      ref="swiperInstance"
      slidesPerView="1"
      :pagination="{ el: '.swiper-pagination' }"
      :modules="[Pagination]"
      class="custom-swiper"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <div class="slide-content">
          <!-- 이미지 영역 -->
          <div class="image-wrapper">
            <img :src="slide.image" alt="slide image" class="slide-image" />
          </div>
          <!-- 텍스트 영역 -->
          <div class="text-wrapper">
            <h2 class="title">{{ slide.title }}</h2>
            <p class="description">{{ slide.description }}</p>
          </div>
        </div>
      </swiper-slide>

      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<style scoped>
/* 컨테이너 */
.slide-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 20px;
}

.slide-container .swiper{
  padding-bottom:50px;
}

/* 슬라이드 콘텐츠 */
.slide-content {
  text-align: center;
}

.image-wrapper {
  margin-bottom: 20px;
}

.slide-image {
  width: 200px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  background-color: #c0c0c0;
}

.text-wrapper {
  margin-top: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  color: #555;
}

/* Swiper 페이지네이션 */
.custom-swiper {
  width: 100%;
  flex-grow: 1;
}
</style>
