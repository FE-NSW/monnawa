<script setup>
import { ref } from 'vue';
import { useReviewStore } from '~/stores/reviews/review'


// 스토어 불러오기
const reviewStore = useReviewStore();

const check = () => {

}

const newReview = ref({
  title: '',
  content: ''
});

const levelValue = ref(0);
const horrorValue = ref(0);
const storyValue = ref(0);
const activityValue = ref(0);
const scaleValue = ref(0);
const lockDeviceRate = ref(5);

//input 게이지 이벤트
const onRangeChange = (target) => {
  console.log(target)
  if(target === 'level') {
    // reviewStore.levelUpdate()
  }

}


// 후기 전송 함수
const submitReview = () => {
  if (newReview.value.title && newReview.value.content) {
    // 실제 서버에 후기를 전송하는 코드
    console.log('후기 제출:', newReview.value);
    
    // 후기를 작성 후 초기화
    newReview.value = { title: '', content: '' };
    alert('후기가 작성되었습니다!');
  } else {
    alert('제목과 내용을 입력해주세요.');
  }
};


// watch를 사용하여 value 값 변화 감지
watch(lockDeviceRate, (newValue) => {
  const gradientValue = 100 / 10;
  const valuePercentage = gradientValue * newValue;

  const rangeInput = document.querySelector('.rangeInput');
  if (rangeInput) {
    rangeInput.style.background = `
      linear-gradient(
        to right,
        #FFA065 0%,
        #FFA065 ${valuePercentage}%,
        #62CEE7 ${valuePercentage}%,
        #62CEE7 100%
      )`;
  }
});
  
</script>

<template>
  <div class="mobile_wrap review_detail_wrap">
    <form @submit.prevent="submitReview">
    <div class="review_store_info">
      <div>
        <strong>{{ reviewStore.getStoreName }}</strong>
        <p>{{ reviewStore.getEpName }}</p>
      </div>
      <p>{{ reviewStore.getTimeLimit }}min</p>
    </div>
    <div>
      <div v-if="reviewStore.escapeStatus == 'y'">
        <img src="@/assets/images/reviews/escape_y.png" alt="탈출성공" />
        <p>남기고 성공!</p>
      </div>
      <div v-else>
        <img src="@/assets/images/reviews/escape_n.png" alt="탈출 실패" />
        <p>아쉽게 실패!</p>
      </div>
    </div>
    <div>
      <p>별점을 선택해 주세요.</p>
      <div>
        <div class="star-rating">
          <div
            class="star"
            v-for="index in 5"
            :key="index"
            @click="reviewStore.startUpdate(index)"
          >
            <button v-if="index <= reviewStore.getStarRate">🍎</button>
            <button v-if="index > reviewStore.getStarRate">🍏</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <dl>
        <dt><label for="level">난이도</label></dt>
        <dd><input type="range" id="level" min="0" max="10" step="1" v-model="levelValue"></dd>
      </dl>
      <dl>
        <dt><label for="level">공포도</label></dt>
        <dd><input type="range" id="level" min="0" max="10" step="1" v-model="horrorValue"></dd>
      </dl>
      <dl>
        <dt><label for="level">스토리</label></dt>
        <dd><input type="range" id="level" min="0" max="10" step="1" v-model="storyValue"></dd>
      </dl>
      <dl>
        <dt><label for="level">활동성</label></dt>
        <dd><input type="range" id="level" min="0" max="10" step="1" v-model="activityValue"></dd>
      </dl>
      <dl>
        <dt><label for="level">스케일</label></dt>
        <dd><input type="range" id="level" min="0" max="10" step="1" v-model="scaleValue"></dd>
      </dl>
    </div>

    <div>
      <div>이미지</div>
      <div>
        <div>
          <p>자물쇠 {{ lockDeviceRate }}</p>
          <p>장치 {{ 10 - lockDeviceRate }}</p>
        </div>
        <div>
          <input type="range" class="rangeInput" id="level" min="0" max="10" step="1" v-model="lockDeviceRate">
        </div>
      </div>
      <div>이미지</div>
    </div>

    <div>
      <!-- 태그 -->
      <ul>
        <li>
          <input type="checkbox" name="tag1_value" id="tag1"><label for="tag1">아기자기 소품</label>
        </li>
      </ul>
    </div>
      <div>
        <label for="content">리뷰 더 써보세영</label>
        <textarea v-model="newReview.content" id="content" placeholder="여기에다 쓰시면 됩니다"></textarea>
      </div>
      <button type="submit">리뷰 작성 끝</button>
    </form>
  </div>
</template>

<style lang="scss">
  body{
    background-color: #ddd;
  }
  .mobile_wrap{
    width: 400px;
    margin: 0 auto;
    background-color: #fff;

    p {
      margin:0;
    }
  }

  .review_detail_wrap{
    padding: 20px 20px;
    box-sizing: border-box;

    .review_store_info{
      display: inline-flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;

      div{
        p{
          margin-top:5px;
        }
      }

      > p {
        border-radius: 62px;
        box-sizing: border-box;
        background-color: #EEEEEE;
        color: #1D1E20;
        font-size:14px;
        width: 62px;
        height: 62px;
        overflow: hidden;
        text-align: center;
        justify-content: center;
        align-items: center;
        display: flex;
      }
    }

    input[type="range"] {
      // 기존 디자인 삭제
      // 크로스 브라우저를 위해 webkit(구글, 사파리), moz(파이어폭스) 접두어 사용
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: none;
        
      // 원하는 디자인 적용
      width: 60%;
      height: 10px;
        
      border-radius: 15px;
      background: #F5F6FA;
    }

    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: #3D93F8;
      border-radius: 100%;
      cursor: pointer;
    }

    input[type="range"].rangeInput {
        // 기존 디자인 삭제
        // 크로스 브라우저를 위해 webkit(구글, 사파리), moz(파이어폭스) 접두어 사용
        width: 90%;
        background: linear-gradient(to right, #FFA065 0%, #FFA065 50%, #62CEE7 50%, #62CEE7 100%);
        border-radius: 8px;
        outline: none;
        transition: background 450ms ease-in;
        -webkit-appearance: none;
        accent-color: #D4D9DE;
    }

    input[type=range].rangeInput::-webkit-slider-thumb{
      background: #D4D9DE;
      border: 1px solid #fff;
    }
  }
  </style>
