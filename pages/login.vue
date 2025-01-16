<script setup>
import { useSupabase } from '~/utils/supabase';
import { userService } from '/services/userService'
import textSlide from '~/components/textSlide.vue';
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';

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


// 로그인 슬라이드 추가
const customSwiper = ref(null);
const state = reactive({
  activeIndex: 0, // 현재 활성화된 슬라이드
  totalSlides: 0 // 전체 슬라이드 수
});

const slideData = [
  {
    image: '/images/login/slide1.png',
    title: '캡처이미지 하나로 초대장을 만들고 공유',
    description: '예약화로된 이미지 하나면 Monnawa에선 초대장이 바로'
  },
  {
    image: '/images/login/slide2.png',
    title: '초대장 쉽게 관리하기초대장만 수락하면 예약정보가 저장',
    description: '쉽고 빠르게 초대장을 만들어 친구들과 공유하세요!'
  },
  {
    image: '/images/login/slide3.png',
    title: '방탈출 성공기록도 간편하게 리뷰와 기록한다.',
    description: '기록하고 방탈출 MMR점수 확인해보자!'
  }
];

// NEXT 버튼 클릭 시 다음 슬라이드로 이동
const goToNextSlide = () => {
  customSwiper.value.swiperInstance().slideNext();
};

// LAST 버튼 클릭 시 마지막 슬라이드로 이동
const goToLastSlide = () => {
  const lastIndex = state.totalSlides - 1;
  customSwiper.value.swiperInstance().slideTo(lastIndex);
};

// 마지막 슬라이드 여부 계산
const isLastSlide = computed(() => state.activeIndex === state.totalSlides - 1);

// Swiper 상태 업데이트 이벤트 리스너
const updateActiveIndex = (event) => {
  state.activeIndex = customSwiper.value.swiperInstance().activeIndex;
};

// 초기 설정
onMounted(() => {
  state.totalSlides = slideData.length;

  // CustomSlide에서 이벤트 수신
  // document.addEventListener('update-active-index', updateActiveIndex);
  customSwiper.value.swiperInstance().on('slideChange', updateActiveIndex);
});

onBeforeUnmount(() => {
  // 이벤트 리스너 정리
  // document.removeEventListener('update-active-index', updateActiveIndex);
  customSwiper.value.swiperInstance().off('slideChange', updateActiveIndex);

});
</script>

<template>
  <div class="container login">
    <div class="logmin_wrap">      
      <div>
        <textSlide :slides="slideData" ref="customSwiper" />
        <button
          v-if="!isLastSlide"
          class="next-button"
          @click="goToNextSlide"
        >
          NEXT
        </button>
        <button
          v-if="!isLastSlide"
          class="last-button"
          @click="goToLastSlide"
        >
          Skip
        </button>
      </div>
    </div>

    <button v-if="isLastSlide" class="login_btn" @click="redirectToKakaoLogin">카카오톡 빠른 로그인</button>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
  font-family: 'Noto Sans', sans-serif;
  height:100vh;
  box-sizing: border-box;
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

/* NEXT 버튼 */
.next-button {
  width: 100%;
  display: block;
  background-color: #f85a00;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.3s;
}

.next-button:hover {
  background-color: #ff7630;
}

.last-button{
  border: 0;
  background-color: transparent;
  appearance: none;
  font-size: 16px;
  color: #646982;
  font-weight: 400;
  margin-top: 10px;
}
</style>