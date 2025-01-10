<script setup>
import { ref } from "vue";

const isDragging = ref(false);
const file = ref(null);
const filePreview = ref("");
const fileInput = ref(null); // file input 참조
const errorMessage = ref(""); // 에러 메시지

// 예약 정보
const reservationDate = ref("")
const reservationStore = ref("")
const reservationEp = ref("")


// 드래그 앤 드롭 이벤트 핸들러
const onDragOver = () => {
  isDragging.value = true;
};
const onDragLeave = () => {
  isDragging.value = false;
};
const onDrop = (event) => {
  const droppedFile = event.dataTransfer.files[0];
  if (droppedFile) {
    validateAndSetFile(droppedFile);
  }
  // 예약정보 가져오기(더미데이터 가져오기)
  setReservationData();

  isDragging.value = false;
};

// 파일 선택 이벤트 핸들러
const onFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    validateAndSetFile(selectedFile);
  }

  // 예약정보 가져오기(더미데이터 가져오기)
  setReservationData();
  isDragging.value = false;
};

// 클릭 시 파일 선택 트리거
const triggerFileInput = () => {
  fileInput.value.click();
};

// 파일 유효성 검사 및 설정
const validateAndSetFile = (selectedFile) => {
  if (selectedFile.type.startsWith("image/")) {
    file.value = selectedFile;
    filePreview.value = URL.createObjectURL(selectedFile);
    errorMessage.value = ""; // 에러 메시지 초기화
  } else {
    errorMessage.value = "이미지 파일만 업로드할 수 있습니다.";
    file.value = null;
    filePreview.value = "";
  }
};

// 공유하기
const kakaoShare = () => {
  // 예약 날짜, 가게, 테마가 없으면 공유못하게 막기
  if(!reservationDate.value || !reservationStore.value || !reservationEp.value){
    alert("예약 정보가 없습니다. 이미지를 다시 넣어주세요!")
    return;
  }

  //공유 정보 로직
};

//이미지 정보 가져오기
const setReservationData = () => {
  //더미 데이터
  reservationDate.value = "2025. 1. 11 (토) 오후 5시"
  reservationStore.value = "KEYESCAPE 홍대점"
  reservationEp.value = "Ep.4 주인 없는 낡은 서점"
}
</script>

<template>
  <div class="mobile_wrap">
    <div class="container">
      <strong class="upload_title">MONNAWA 초대장보내기</strong>
      <!-- 드래그 앤 드롭 영역 -->
      <div
        class="dropzone"
        @dragover.prevent="onDragOver"
        @dragleave="onDragLeave"
        @drop.prevent="onDrop"
        @click="triggerFileInput"
        :class="{ 'dropzone--active': isDragging }"
      >
        <div v-if="!file" class="placeholder">
          <img class="drop_icon" src="@/assets/images/invite/upload_icon.png" alt="Upload Icon" width="118" />
          <p>예약 이미지를 첨부해주세요.</p>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
        <div v-else class="uploaded-info">
          <img :src="filePreview" alt="Uploaded Preview" />
        </div>
        <input type="file" class="file-input" ref="fileInput" @change="onFileChange" accept=".gif, .jpg, .png, .webp, .jpeg" />
      </div>
      <hr />

      <!-- 예약 정보 -->
      <!-- 이미지 분석후 파일 데이터 추가 -->
      <div class="info_wrap">
        <div v-if="file"  class="info">
          <strong>예약정보를 확인해주세요.</strong>
          <div class="details">
            <p><strong>날짜</strong><span>{{ reservationDate }}</span></p>
            <p><strong>장소</strong><span>{{ reservationStore }}</span></p>
            <p><strong>테마</strong><span>{{ reservationEp }}</span></p>
          </div>
          <p class="note">*예약정보가 틀리면 다시 한번 이미지를 첨부해주세요.</p>
        </div>
        <div v-else>
          <p class="info_message">파일을 업로드 해주시면 예약정보가 나타납니다.</p>
        </div>
      </div>
      <button class="share_btn" @click="kakaoShare">카카오톡 공유하기</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
  font-family: 'Noto Sans', sans-serif;
}

.upload_title{
  font-size: 20px;
  font-weight: 600;
}

.dropzone {
  padding: 20px 20px 10px;
  margin: 20px auto 0px;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.3s;
  font-size: 16px;
}

hr {
  box-shadow: 0px 5px 4px #ccc;
  border:0;
  padding-bottom: 10px;
  position: relative;
}

.drop_icon{
  border: 2px dashed #CBCDD0;
  padding:20px;
  background-color: #F8F8F8;
  border-radius: 8px;
}

.dropzone--active .drop_icon{
  border-color: #FF624E;
}

.placeholder {
  text-align: center;
  color: #666;
}

.placeholder img {
  width: 50px;
  margin-bottom: 10px;
}

.uploaded-info img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
}

.file-input {
  display: none;
}

.info_wrap {
  background: #f8f8f8;
  padding: 20px;
  margin: 0px auto 20px auto;
  border-radius: 0 0 8px 8px;
  width: 300px;
  margin-top: -8px;
}

.details{
  padding:20px;
  font-size:16px;
  font-weight: 400;
}

.details p {
  margin: 5px 0;
  border-bottom: 1px solid #E1E1E1;
  display: flex;
  justify-content: flex-start;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
}

.details p strong{
  padding-right: 20px;
}

.details p span {
  display: block;
  overflow-wrap: anywhere;
  flex: 1;
  text-align: left;
}

.info_wrap strong, .details p strong{
 font-weight: 400;
}

.note {
  font-size: 14px;
  color: #1D1E20;
}

.error{
  color:#FF624E
}

.share_btn{
  display: block;
  width:100%;
  background-color: #FF624E;
  font-size: 16px;
  border-radius: 8px;
  overflow: hidden;
  border: 0;
  padding:15px 20px;
  color:#fff;
}
</style>



