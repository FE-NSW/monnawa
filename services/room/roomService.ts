import { useNuxtApp } from '#app';
import { sessionUtil } from '../sessionUtil';

export const roomService = () => {
  const { $axios } = useNuxtApp();

  // 리뷰 데이터를 가져오는 API 호출 함수
  const getRoom = async (data, token)  => {
    debugger
    token = await sessionUtil().getToken();
    const url = "/api/room/find"; // API URL
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await $axios.post(url, data, { headers });
      return response.data; // 성공 시 서버 응답 반환
    } catch (error) {
      throw error; // 에러 발생 시 호출부에서 처리
    }
  }

  const join = async (data, token)  => {
    debugger
    token = await sessionUtil().getToken();
    const url = "/api/room/join"; // API URL
    const headers = {
      Authorization: `Bearer ${token}`, // 토큰 추가
      "Content-Type": "application/json",
    };

    try {
      const response = await $axios.post(url, data, { headers });
      return response.data; // 성공 시 서버 응답 반환
    } catch (error) {
      throw error; // 에러 발생 시 호출부에서 처리
    }
  }




  return {
    getRoom,join
  };
};
