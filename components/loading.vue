<template>
  <div class="loading_area">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loading_area{
  width:100%;
  height:100vh;
  background-color: #fff;
  position: absolute;
  left:0;
  top:0;
  overflow:hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loader {
  width: 128px;
  height: 128px;
  background: url("@/assets/images/loading.png");
  background-size:cover;
  animation: loading 1.8s steps(3) infinite;
}
@keyframes loading {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -384px 0;
  }
}
</style>