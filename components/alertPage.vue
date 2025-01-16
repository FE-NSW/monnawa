<template>
  <div class="alert_page_wrap">
    <div class="alert_page">
      <div v-if="imgSrc" class="icon-wrapper">
        <img :src="imgSrc" alt="" />
      </div>
      <div class="text-wrapper">
        <strong>{{ title }}</strong>
        <p>{{ description }}</p>
      </div>
      <button
        v-if= "buttonText"
        class="action-button"
        @click="buttonAction"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // 제목
  imgSrc: {
    type: String,
    default: '/images/alert_default.png',
  },
  // 제목
  title: {
    type: String,
    required: true,
    default: '제목 없음',
  },
  // 설명
  description: {
    type: String,
    required: true,
    default: '설명이 없습니다.',
  },
  // 버튼 텍스트
  buttonText: {
    default: '버튼',
  },
  // 버튼 클릭 시 동작할 함수
  buttonAction: {
    default: () => {
      console.log('버튼이 클릭되었습니다.');
    },
  },
})
</script>

<style scoped>
.alert_page_wrap {
  min-height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.alert_page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.icon-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.text-wrapper strong {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text-wrapper p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.action-button {
  background: #ff5733;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.action-button:hover {
  background: #e14b28;
}
</style>
