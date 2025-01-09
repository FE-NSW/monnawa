<script setup>
import { ref, onMounted } from 'vue';
import { reviewService } from '~/services/reviews/reviewService'
import { userService } from '~/services/userService'

// 본인 정보
const userName = ref("");
const userAge = ref("");
const userGender = ref("");
const userId = ref("");
const userNickname = ref("");

// 가게, 게임정보
const invitationId = ref(0);
const storeName = ref("");
const storeEp = ref("");
const epLimitTime = ref(0);
const clear = ref("");
const clearTime = ref("");

// 방장 전용 남은 시간 입력
const clearMin = ref("");
const clearSec = ref("");

// 리뷰 입력내용
const starCore = ref(0);
const levelValue = ref(0);
const horrorValue = ref(0);
const storyValue = ref(0);
const activityValue = ref(0);
const scaleValue = ref(0);
const lockDeviceRate = ref(5);
const lockDeviceMax = ref(10);
const content = ref("")

// 선택된 태그 값을 저장할 배열
const selectedTags = ref([]);

// 체크박스 데이터
const tags = [
  { id: 'tag1', name: '아기자기 소품', label: '아기자기 소품' },
  { id: 'tag2', name: '극공테', label: '극공테' },
  { id: 'tag3', name: '친절한 가이드&몰입도', label: '친절한 가이드&몰입도' },
  { id: 'tag4', name: '2인추천', label: '2인추천' },
  { id: 'tag5', name: '스토리와 연출', label: '스토리와 연출' },
  { id: 'tag6', name: '퍼즐문제', label: '퍼즐문제' },
  { id: 'tag7', name: '풀꽃길', label: '풀꽃길' },
];

// 서비스 호출
const { getClearGame } = reviewService();
const { getUserInfo } = userService();

onMounted(async () => {
  try {
    // 유저정보
    const userInfo = await getUserInfo();
    userName.value = userInfo.name
    userAge.value = userInfo.age
    userGender.value = userInfo.gender
    userId.value = userInfo.id
    userNickname.value = userInfo.nickname


    //가게 정보 가져오기
    const clearInfo = await getClearGame();

    //초대아이디
    invitationId.value = clearInfo.invitationId

    //스토어 명
    storeName.value = clearInfo.store
    
    // 진행한 에피소드
    storeEp.value = clearInfo.episode

    // 에피소드 리미트 타임
    epLimitTime.value = clearInfo.limitTime

    // 에피소드 클리어 여부
    clear.value = clearInfo.clear

    // 에피소드 클리어 남은 시간
    clearTime.value = clearInfo.clearTime

    console.log(clearInfo)
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
  }
});

const startUpdate = (index) => {
  starCore.value = index;
}

// 후기 전송 함수
const submitReview = () => {
  if (starCore.value !== 0) {
    // 실제 서버에 후기를 전송하는 코드
    console.log(`
      이름 : ${userName.value}
      나이 : ${userAge.value}
      성별 : ${userGender.value}
      아이디 : ${userId.value}
      별명 : ${userNickname.value}
      초대아이디 : ${invitationId.value}
      가게명 : ${storeName.value}
      에피소드명 : ${storeEp.value}
      클리어여부 : ${epLimitTime.value}
      남은시간 : ${clearTime.value}
      성공여부 : ${clear.value}
      난이도: ${levelValue.value}
      호러도: ${horrorValue.value}
      스토리: ${storyValue.value}
      활동성: ${activityValue.value}
      스케일: ${scaleValue.value}
      자물쇠: ${lockDeviceRate.value}
      장치: ${lockDeviceMax.value - lockDeviceRate.value}
      태그 : ${selectedTags.value}
      리뷰내용 : ${content.value}
    `);

    if(!clearTime.value && clearMin.value && clearMin.value){
      console.log(`
      클리어 타임 없음
        ${clearTime.value}
        분 ${ clearMin.value }
        초 ${ clearMin.value }
      `)
      clearTime.value = `${clearMin.value}분 ${ clearMin.value }초`
      console.log(`
      클리어 타임 없음
        ${clearTime.value}
        분 ${ clearMin.value }
        초 ${ clearMin.value }
      `)

    } else {
      alert('남은 시간을 넣어주세요!')
      return;
    }
    
    alert('후기가 작성되었습니다!');
  } else {
    alert('후기를 다시 작성해주세요!');
    return;
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
            <strong>{{ storeName }}</strong>
            <p>{{ storeEp }}</p>
          </div>
          <p>{{ epLimitTime }}min</p>
        </div>
        <div>
          <div v-if="clear === 'y' && clearTime !== ''" class="result_time_wrap">
          <img src="@/assets/images/reviews/escape_y.png" alt="탈출성공" /> 
          <div class="result_time">{{ clearTime }}</div>
          <p>남기고 성공!</p>
          </div>
          <div v-else-if="clear === 'y' && clearTime === ''" class="result_time_wrap">
            <img src="@/assets/images/reviews/escape_y.png" alt="탈출성공" /> 
            <div class="result_time result_time_input_wrap">
              <input type="number" v-model="clearMin" id="" min="1" max="60" step="1" />분
              <input type="number" v-model="clearSec" id="" min="1" max="60" step="1" />초
            </div>
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
                  @click="startUpdate(index)"
                >
                  <button class="no_border_btn" v-if="index <= starCore"><img src="@/assets/images/reviews/star.png" alt="별점" width="44" /></button>
                  <button class="no_border_btn" v-if="index > starCore"><img src="@/assets/images/reviews/star_de.png" alt="별점아님" width="44" /></button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img :src="`/images/reviews/star${starCore}.png`" alt="" width="76" />
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
          <div class="tag" v-for="tag in tags" :key="tag.id">
            <input 
              type="checkbox" 
              :id="tag.id" 
              :value="tag.name" 
              v-model="selectedTags"
            />
            <label :for="tag.id">{{ tag.label }}</label>
          </div>
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
      
      .result_time_input_wrap{
        display: flex;
        align-items: center;
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
