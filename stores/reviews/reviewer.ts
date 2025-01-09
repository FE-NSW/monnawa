import { defineStore } from 'pinia'

interface reviewr<T = number> {
  invitationId: T; // 초대장 아이디값
  name:string; // 리뷰하는 사람 이름
  age:number; // 리뷰하는 사람 나이
  gender:string; // 리뷰하는 사람 성별
  nickname:string; // 리뷰하는 사람 별명
  grade:string; // 리뷰하는 사람 등급(방장, 초대자)
}


// 스토어 정의
export const useReviewerStore = defineStore('reviewerStore', {
  // 초기 상태 타입 지정
  state: (): reviewr => ({
    invitationId:0,
    name: "",
    age: 0,
    gender: "",
    nickname: "",
    grade:""
  }),

  // 액션 타입은 자동으로 추론됨
  actions: {
  },

  getters: {
    // 리뷰어정보 가져오기
    getReviewr: (state): reviewr => {
      return {
        invitationId:0,
        name: state.name,
        age: state.age,
        gender: state.gender,
        nickname: state.nickname,
        grade: state.gender
      }
    },
  }
})
