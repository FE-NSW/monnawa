<script setup>
import { useReviewStore } from '~/stores/reviews/review'
import { useRouter } from 'vue-router'

// 스토어 불러오기
const reviewStore = useReviewStore();

// 라우터 설정
const router = useRouter();

// 리뷰할 가게 정보 불러오기
onMounted(()=>{
  const aa = reviewStore.getReviewInfo;
})

// 후기 전송 함수
const escaping = (val) => {
  reviewStore.escape(val);
  const isEscape = reviewStore.escapeStatus;
  if(isEscape){
    router.push("/reviews/detail");
  }
};
</script>

<template>
  <div class="review_start_wrap">
    <div class="review_store_info">
      <strong>{{ reviewStore.getStoreName }}</strong>
      <p>{{ reviewStore.getEpName }}</p>
    </div>
    <p class="escape_question">탈출에 성공 하셨나요?</p>
    <div class="review_store_btns">
      <ul>
        <li>
          <button class="no_border_btn active" type="button" @click="escaping('y')">
            <img src="@/assets/images/reviews/escape_y.png" alt="탈출 성공" />
            <span>탈출 성공~!</span>
          </button>
        </li>
        <li>
          <button class="no_border_btn" type="button" @click="escaping('n')">
            <img src="@/assets/images/reviews/escape_n.png" alt="탈출 실패" />
            <span>아깝다....실패...</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .review_start_wrap{
    padding: 70px 40px 50px;
    box-sizing: border-box;
    
    .escape_question{
      text-align: center;
      font-size: 20px;
      color: #1D1E20;
      margin-bottom: 50px;
    }

    .review_store_btns{
      width:100%;
      display: flex;
      flex-direction: column;

      ul {
        padding:0;
        margin:0;

        li {  
          display: flex;
          flex-direction: column;
          list-style: none;

          &:first-child{
            border-bottom: 1px solid #ddd;
          }
        }
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 25px 0;
        cursor: pointer;

        img {
          width: 102px;
        }

        &.active{
          span{
            border-color: #FF5F00;
            color:#000;
            background-color: #FFEEE3;
          }
        }

        span {
          border: 1px solid #F5F6FA;
          border-radius: 10px;
          background-color: #F5F6FA;
          color:#bcbcbc;
          display: inline-block;
          box-sizing: border-box;
          width:154px;
          font-size: 15px;
          padding: 10px;
          margin-left: 5px;
        }
      }
    }
  }

  .review_store_info{
    text-align: center;
    font-size: 24px;
    color: #393939; 
    padding-bottom: 30px;
  }

  .no_border_btn{
    border: 0;
    background-color: transparent;
    display: flex;
  }
</style>
