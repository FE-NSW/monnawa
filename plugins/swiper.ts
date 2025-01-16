// plugins/swiper.ts (Nuxt 플러그인)
import { defineNuxtPlugin } from '#app';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';  // Swiper 스타일 추가

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('Swiper', Swiper);
  nuxtApp.vueApp.component('SwiperSlide', SwiperSlide);
});
