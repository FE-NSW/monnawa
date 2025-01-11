<template>
  <div>
    <p>로그인 처리 중...2</p>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {useFetch} from '#app';

import { sessionUtil } from '~/services/sessionUtil';


const router = useRouter();

const token = await sessionUtil().getToken();

// 클라이언트 사이드에서만 window 객체를 사용
if (process.client) {
  // window.location.hash가 존재하는지 확인 후, access_token 추출
  const accessToken =  await sessionUtil().getToken();
  const user = await sessionUtil().getUser();
  debugger
  try {
    // 서버 API로 access_token 전달
    const response = await useFetch('/api/userOn', {
      method: 'POST',
      body: JSON.stringify({  auth_id : user.id , email : user.user_metadata.email
        , name: user.user_metadata.name, profile_image: user.user_metadata.avatar_url }),
    });

    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('rul') || '/'; // 기본값으로 '/dashboard' 설정

    // router.push(redirectUrl);
    window.location.href = redirectUrl;  // 예: 'https://www.example.com'

  } catch (error) {

    console.error('API 호출 중 오류 발생:', error);
  }
}
</script>
