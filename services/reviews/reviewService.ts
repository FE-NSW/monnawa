import { useNuxtApp } from '#app';
import { sessionUtil } from '../sessionUtil';

export const reviewService = () => {
  const { $axios } = useNuxtApp();

  // 리뷰 데이터를 가져오는 API 호출 함수
  const getClearGame = async () => {
    try {
      const { data } = await $axios.get('/json/clearGame.json'); // API 경로로 변경
      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error; // 오류가 발생한 경우, 상위에서 처리할 수 있도록 예외 던지기
    }
  };

  const writeReview = async (data, token)  => {
    debugger
    token = await sessionUtil().getToken();
    const url = "http://localhost:3000/api/review/write"; // API URL
    const headers = {
      Authorization: `Bearer ${token}`, // 토큰 추가
      "Content-Type": "application/json",
    };

    try {
      const response = await $axios.post(url, data, { headers });
      return response.data; // 성공 시 서버 응답 반환
    } catch (error) {
      console.error("리뷰 작성 실패:", error);
      throw error; // 에러 발생 시 호출부에서 처리
    }
  }

  return {
    getClearGame, writeReview
  };
};
