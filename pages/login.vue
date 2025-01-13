<script setup>
import { useSupabase } from '~/utils/supabase';
import { userService } from '/services/userService'
const tokenResult = ref('');
const KAKAO_CLIENT_ID= "d33fc8194f841107da6fa80f48b04a69";
const REDIRECT_URI= "http://localhost:3000/login";


const {updateUser} = userService;
const  redirectToKakaoLogin = async () => {

  const queryParams = new URLSearchParams(window.location.search);
  const redirectUrl = queryParams.get('redirectUrl') || '/'
  console.log('redirectUrl' + redirectUrl)
  console.log("${window.location.protocol}//${window.location.hostname}")

debugger
  const { user, session, error } = await useSupabase().auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "")}/auth/callback?rul=${redirectUrl}`,
    },
  });

};

const kakaoLogout = async () => {
  const { error } = await useSupabase().auth.signOut();

  if (error) {
    console.error('로그아웃 실패:', error.message);
  } else {
    console.log('로그아웃 성공');
    window.location.href = '/'; // 홈으로 리다이렉트
  }
}

// 아래는 데모를 위한 UI 코드입니다.
const deleteCookie = () => {
  document.cookie = 'authorize-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

 // 아래는 데모를 위한 UI 코드입니다.

</script>

<template>
  <div class="container login">
    <div class="monnawa_message">
      <strong>방탈출 더 쉽고 특별하게</strong>
      <p>MONNAWA로 함께 플레이하자!</p>
    </div>

    <div class="card">
      <div class="inner">
        <div class="front"><img class="card" src="@/assets/images/invite/card.png" alt="카드 앞면" width="197" /></div>
        <div class="back"><img class="card" src="@/assets/images/invite/card_back.png" alt="카드 뒷면" width="197" /></div>
      </div>
    </div>

    <button class="login_btn" @click="redirectToKakaoLogin">카카오톡 빠른 로그인</button>
  </div>
</template>


<style scoped>
.container {
  text-align: center;
  padding: 20px;
  font-family: 'Noto Sans', sans-serif;
  height:100vh
}

.monnawa_message{
  text-align: center;  
  font-size: 26px;
  padding-top: 40px;
  padding-bottom: 20px;
}

.card {
  width: 197px;
  height: 218px;
  perspective: 1000px; /* 플립 효과를 위한 3D 시점 */
  padding: 50px 20px 80px;
  margin: 0 auto;
}

.inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: flip 2s ease-in-out forwards;
}

.front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* 뒷면 숨기기 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 1.2rem;
}

.front {
  background-color: #fff;
  color: white;
}

.back {
  background-color: #fff;
  color: white;
  transform: rotateY(180deg); /* 뒷면 뒤집기 */
}

@keyframes flip {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(360deg); /* 1바퀴 */
  }
  100% {
    transform: rotateY(720deg); /* 2바퀴 */
  }
}

.login_btn{
  display: block;
  width:100%;
  background-color: #FFD324;
  font-size: 16px;
  border-radius: 8px;
  overflow: hidden;
  border: 0;
  padding:15px 20px;
  color:#450A0A;
}
</style>