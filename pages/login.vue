<script setup>
const tokenResult = ref('');
const KAKAO_CLIENT_ID= "d33fc8194f841107da6fa80f48b04a69";
const REDIRECT_URI= "http://localhost:3000/login";


onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
  script.async = true;
  script.onload = () => {
    Kakao.init(KAKAO_CLIENT_ID);  // 카카오 JavaScript 키
    displayToken();  // 토큰 확인
  };
  console.log("??:::", tokenResult)
  document.head.appendChild(script);
})

const redirectToKakaoLogin = () => {


  //const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID; // 카카오 REST API 키
  //const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI; // 리디렉션 URI

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  Kakao.Auth.authorize({
      redirectUri: REDIRECT_URI
    });
  // window.location.href = kakaoAuthUrl;
};

const kakaoLogout = () => {
  Kakao.Auth.logout()
  .then(function() {
    alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
    deleteCookie();
  })
  .catch(function() {
    alert('Not logged in');
  });
}

// 아래는 데모를 위한 UI 코드입니다.
const deleteCookie = () => {
  document.cookie = 'authorize-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

 // 아래는 데모를 위한 UI 코드입니다.

const displayToken = () => {
    const token = getCookie('authorize-access-token');

    console.log("token", token)

    if(token) {
      Kakao.Auth.setAccessToken(token);
      Kakao.Auth.getStatusInfo()
        .then(function(res) {
          if (res.status === 'connected') {
            document.getElementById('token-result').innerText
              = 'login success, token: ' + Kakao.Auth.getAccessToken();
          }
        })
        .catch(function(err) {
          Kakao.Auth.setAccessToken(null);
        });
    }
  }

  const getCookie = (name) => {
    var parts = document.cookie.split(name + '=');
    if (parts.length === 2) { return parts[1].split(';')[0]; }
  }
</script>

<template>
  <div>
    <p>???:{{ tokenResult }} </p> 
    <button @click="redirectToKakaoLogin">카카오 로그인</button>
    <button class="api-btn" @click="kakaoLogout">로그아웃</button>
  </div>
</template>

