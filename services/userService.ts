import { useNuxtApp } from '#app';
import {sessionUtil} from "~/services/sessionUtil";

export const userService = () => {
  const { $axios } = useNuxtApp();

  // 리뷰 데이터를 가져오는 API 호출 함수
  const getUserInfo = async (data) => {
    const token = await sessionUtil().getToken();
    const url = "/api/user"; // API URL
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
  };

  const updateUser = async (data, token) => {
    const response = await $fetch('/api/userOn', {
      method: 'POST',
      body: data,
    });

    if (response.success) {
      console.log('User added successfully:', response.data);
    } else {
      console.error('Error adding user:', response.error);
    }
  }

  return {
    getUserInfo, updateUser
  };
};
