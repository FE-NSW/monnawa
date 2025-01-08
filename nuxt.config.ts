// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Roboto: true,         // 기본 Roboto 폰트
      'Open+Sans': [300, 400, 600], // Open Sans 폰트의 다양한 굵기
    },
  },
})
