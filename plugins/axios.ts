import axios from 'axios';

export default defineNuxtPlugin(nuxtApp => {
  const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL, // 예시 API 기본 URL
    timeout: 10000, // 요청 타임아웃 설정
  });

  // axios 인스턴스를 앱에서 사용할 수 있도록 전역적으로 설정
  nuxtApp.provide('axios', axiosInstance);
});
