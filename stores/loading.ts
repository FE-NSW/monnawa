import { defineStore } from 'pinia'

// 상태의 타입 정의
interface loadingState {
  isLoading: boolean // 로딩중 true, 로딩끝 false
}


// 스토어 정의
export const useLoadingStore = defineStore('loadingStore', {
  // 초기 상태 타입 지정
  state: (): loadingState => ({
    isLoading: false
  }),

  // 액션 타입은 자동으로 추론됨
  actions: {
    loadingUpdate(value:boolean){
      this.isLoading = value;
    }
  },

  getters: {
    getLoading: (state): boolean => {
      return state.isLoading;
    },
  }
})
