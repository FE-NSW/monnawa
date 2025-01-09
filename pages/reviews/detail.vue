<script setup>
import { ref } from 'vue';
import { useReviewStore } from '~/stores/reviews/review'
import { useReviewerStore } from '~/stores/reviews/reviewer'

// 스토어 불러오기
const reviewStore = useReviewStore();

//리뷰어 정보 가져오기
const reviewer = useReviewerStore();

const check = () => {

}

const levelValue = ref(0);
const horrorValue = ref(0);
const storyValue = ref(0);
const activityValue = ref(0);
const scaleValue = ref(0);
const lockDeviceRate = ref(5);
const content = ref("")

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
      <div class="review_detail_inner_wrap">
        <div class="review_store_info">
          <div>
            <strong>{{ reviewStore.getStoreName }}</strong>
            <p>{{ reviewStore.getEpName }}</p>
          </div>
          <p>{{ reviewStore.getTimeLimit }}min</p>
        </div>
        <div>
          <div v-if="reviewStore.escapeStatus == 'y'" class="result_time_wrap">
          <img src="@/assets/images/reviews/escape_y.png" alt="탈출성공" /> 
          <div class="result_time">17분 32초</div>
          <p>남기고 성공!</p>
          </div>
          <div v-else class="result_time_wrap">
            <img src="@/assets/images/reviews/escape_n.png" alt="탈출 실패" />
            <p>아쉽게 실패!</p>
          </div>
        </div>
        <div class="star_score_wrap">
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
                  <button class="no_border_btn" v-if="index <= reviewStore.getStarCore"><img src="@/assets/images/reviews/star.png" alt="별점" width="44" /></button>
                  <button class="no_border_btn" v-if="index > reviewStore.getStarCore"><img src="@/assets/images/reviews/star_de.png" alt="별점아님" width="44" /></button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img :src="`/images/reviews/star${reviewStore.getStarCore}.png`" alt="" width="76" />
          </div>
        </div>
        <div class="storeInputValuse">
          <dl>
            <dt><label for="level">난이도</label></dt>
            <dd class="input_dd"><input type="range" id="level" min="0" max="10" step="1" v-model="levelValue"></dd>
            <dd class="input_value">{{ levelValue }}</dd>
          </dl>
          <dl>
            <dt><label for="horror">공포도</label></dt>
            <dd class="input_dd"><input type="range" id="horror" min="0" max="10" step="1" v-model="horrorValue"></dd>
            <dd class="input_value">{{ horrorValue }}</dd>
          </dl>
          <dl>
            <dt><label for="story">스토리</label></dt>
            <dd class="input_dd"><input type="range" id="story" min="0" max="10" step="1" v-model="storyValue"></dd>
            <dd class="input_value">{{ storyValue }}</dd>
          </dl>
          <dl>
            <dt><label for="activity">활동성</label></dt>
            <dd class="input_dd"><input type="range" id="activity" min="0" max="10" step="1" v-model="activityValue"></dd>
            <dd class="input_value">{{ activityValue }}</dd>
          </dl>
          <dl>
            <dt><label for="scale">스케일</label></dt>
            <dd class="input_dd"><input type="range" id="scale" min="0" max="10" step="1" v-model="scaleValue"></dd>
            <dd class="input_value">{{ scaleValue }}</dd>
          </dl>
        </div>

        <div class="lock_device_wrap">
          <div>
            <img src="@/assets/images/reviews/lock_img.png" alt="자물쇠" width="54" />
          </div>
          <div class="lock_device_range_wrap">
            <div>
              <p>자물쇠 {{ lockDeviceRate }}</p>
              <p>장치 {{ 10 - lockDeviceRate }}</p>
            </div>
            <div>
              <input type="range" class="rangeInput" id="level" min="0" max="10" step="1" v-model="lockDeviceRate">
            </div>
          </div>
          <div>
            <img src="@/assets/images/reviews/device_img.png" alt="장치" width="54" />
          </div>
        </div>

        <div class="tags_wrap">
          <div class="tag"><input type="checkbox" name="아기자기 소품" id="tag1"><label for="tag1">아기자기 소품</label></div>
          <div class="tag"><input type="checkbox" name="극공테" id="tag2"><label for="tag2">극공테</label></div>
          <div class="tag"><input type="checkbox" name="친절한 가이드&몰입도" id="tag3"><label for="tag3">친절한 가이드&몰입도</label></div>
          <div class="tag"><input type="checkbox" name="2인추천" id="tag4"><label for="tag4">2인추천</label></div>
          <div class="tag"><input type="checkbox" name="스토리와 연출" id="tag5"><label for="tag5">스토리와 연출</label></div>
          <div class="tag"><input type="checkbox" name="퍼즐문제" id="tag6"><label for="tag6">퍼즐문제</label></div>
          <div class="tag"><input type="checkbox" name="풀꽃길" id="tag7"><label for="tag7">풀꽃길</label></div>
        </div>
        <div class="content_wrap">
          <label for="content">리뷰 더 써보세영</label>
          <textarea v-model="content" id="content" placeholder="여기에다 쓰시면 됩니다"></textarea>
        </div>
      </div>
      <button class="review_submit_btn" type="submit">리뷰 작성 끝</button>
    </form>
  </div>
</template>

<style lang="scss">
  .review_detail_wrap{
    box-sizing: border-box;

    .review_detail_inner_wrap{
      padding: 20px 20px;
      box-sizing: border-box;
    }
    
    .result_time_wrap{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 40px 0;
      
      img{
        width:54px;
      }

      .result_time{
        background-color: #F5F6FA;
        border-radius: 10px;
        color:#000;
        font-size:20px;
        padding:10px;
        margin-left: 5px;
      }

      p {
        font-size: 18px;
        color: #1D1E20;
        margin-left: 5px;
      }
    }
    
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
    
    .star_score_wrap{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom:20px;

      p{
        font-size: 18px;
        color:#1D1E20;
        margin-bottom: 5px;
      }

      .star-rating{
        display: flex;
        flex-direction: row;
      }
    }
    
    .storeInputValuse{
      border-bottom:1px solid #E6E6E6;
      border-top: 1px solid #E6E6E6;
      dl {
        padding:0;
        margin:0;
        display: flex;
        flex-direction: row;
        margin-bottom:25px;
        margin-top:25px;
        padding: 0 10px;
        
        dt {
         margin-right:20px;
        }

        dd{
          margin:0;
        }

        .input_dd {
            flex:1;
        }

        .input_value{
          text-align: right;
          padding-left:20px;
        }
      }
    }

    .lock_device_wrap{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top:30px;
      
      >div{
        font-size:0;
      }

      .lock_device_range_wrap{
        display: flex;
        flex:1;
        flex-direction: column;
        margin-top:-6px;
        padding:0 5px;

        > div{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 16px;
          p{
            margin-bottom:5px;
          }
        }
      }
    }

    .tags_wrap{
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 30px;

      .tag{
        display: inline-flex;
        overflow: hidden;
        
        input{
          width:0;
          height:0;
          overflow: hidden;
          margin:0;
          padding:0;
        }

        label{
          display: block;
          background-color:#F5F6FA;
          border:1px solid #F5F6FA;
          padding: 8px 10px;
          border-radius: 10px;
          font-size: 15px;
        }
        
        //체크된 박스 라벨 active
        input[type=checkbox]:checked + label  {
          background-color:#FFEEE3;
          border:1px solid #FF5F00;
        }
      }
    }

    .content_wrap{
      margin-top:30px;
      label{
        font-size:17px;
        color:#1D1E20;
        display: block;
        margin-bottom:5px;
      }

      textarea{
        font-size:15px;
        &::placeholder{
          color:#8F959E;
        }
        box-sizing: border-box;
        width:100%;
        max-width: 100%;
        min-width: 100%;
        height: 140px;
        max-height: 140px;
        min-height: 140px;
        background-color: #F5F6FA;
        border:0;
        border-radius: 10px;
        overflow: hidden;
        padding:10px;
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
      width: 100%;
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
        width: 100%;
        background: linear-gradient(to right, #FFA065 0%, #FFA065 50%, #62CEE7 50%, #62CEE7 100%);
        border-radius: 8px;
        outline: none;
        transition: background 450ms ease-in;
        -webkit-appearance: none;
        accent-color: #D4D9DE;
        margin:0;
    }

    input[type=range].rangeInput::-webkit-slider-thumb{
      background: #D4D9DE;
      border: 1px solid #fff;
    }
  }

  .no_border_btn{
    border: 0;
    background-color: transparent;
    display: flex;
    padding:0px;
    margin-right:4px;
  }

  .review_submit_btn{
    width:100%;
    border:0;
    background-color: #23ADF1;
    color: #fff;
    font-size: 20px;
    text-align: center;
    padding: 20px;
  }
  </style>
