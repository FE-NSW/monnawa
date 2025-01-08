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
const lockDeviceRate = ref(0);

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
</script>

<template>
  <div>
    <form @submit.prevent="submitReview">
    <div>
      <strong>{{ reviewStore.getStoreName }}</strong>
      <p>{{ reviewStore.getEpName }}</p>
      <p>{{ reviewStore.getTimeLimit }}</p>
    </div>
    <div>
      test::: {{ reviewStore.escapeStatus }}
      <div v-if="reviewStore.escapeStatus == 'y'">
        <input type="time" /> 
        <p>남기고 성공!</p>
      </div>
      <div v-else>
        
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
          <input type="range" id="level" min="0" max="10" step="1" v-model="lockDeviceRate">
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
<style>
  
</style>
