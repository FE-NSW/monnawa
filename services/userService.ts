import { useNuxtApp } from '#app';

export const userService = () => {
  const { $axios } = useNuxtApp();

  // 리뷰 데이터를 가져오는 API 호출 함수
  const getUserInfo = async () => {
    try {
      const { data } = await $axios.get('/json/user.json'); // API 경로로 변경
      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error; // 오류가 발생한 경우, 상위에서 처리할 수 있도록 예외 던지기
    }
  };

  return {
    getUserInfo
  };
};
