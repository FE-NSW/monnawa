import { defineStore } from 'pinia'

// 상태의 타입 정의
interface reviewState {
  storeName: string, // 가게명
  epName: string, // 에피소드 명칭
  timeLimit: number, // 에피소드 제한시간
  resultTime: string, // 진행 시간 (시간을 입력하는게 지점에서 하거나 본인이 할 수 있어서 범용성있게 변경)
  isEscape: string, // 탈출 성공여부 'y', 'n', '' 기본값
  userName: string, // 유저명
  starCore: number, // 별점(1~5)
  level: number, // 난이도(1~10)
  horrorCore: number, // 공포점수(1~10)
  storyCore: number, // 스토리점수(1~10)
  activityCore: number, // 활동점수(1~10)
  scaleCore: number // 스케일점수(1~10)
}

// 스토어 정의
export const useReviewStore = defineStore('reviewStore', {
  // 초기 상태 타입 지정
  state: (): reviewState => ({
    storeName: "",
    epName: "",
    timeLimit: 0,
    resultTime: "",
    isEscape: "",
    userName: "",
    starCore: 0,
    level: 0,
    horrorCore: 0,
    storyCore: 0,
    activityCore: 0,
    scaleCore: 0
  }),

  // 액션 타입은 자동으로 추론됨
  actions: {
    escape(value:string) {
      this.isEscape = value;
    },
    startUpdate(value:number){
      this.starCore = value;
      console.log(this.starCore, value)
    },
    levelUpdate(value:number){
      this.starCore = value;
    }
  },

  getters: {
    getStoreName: (state): string => {
      // return state.storeName;
      return "KEYESCAPE 홍대점"  
    },
    getEpName: (state): string => {
      // return state.getEpName;
      return "Ep.4 주인 없는 낡은 서점"
    },
    getTimeLimit: (state): number => {
      return state.timeLimit;
    },
    getStarCore: (state): number => {
      return state.starCore;
    },
    escapeStatus: (state): string => {
      return state.isEscape;
    }
  }
})
