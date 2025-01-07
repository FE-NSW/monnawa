import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const { data } = await useFetch('/api/auth/me');
      // this.user = data.value;
    },
  },
});
