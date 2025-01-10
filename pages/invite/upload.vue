<script setup>
import { ref } from "vue";
import { sessionUtil } from '~/services/sessionUtil';

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
  setReservationData(selectedFile);
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
const setReservationData = async (file) => {


  try {
    // 파일을 Base64로 변환
    const base64File = await convertFileToBase64(file);
    debugger
    const token = await sessionUtil().getToken();

    // 서버에 업로드
    const response = await fetch("/api/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        base64File,
        filename: file.name,
        fileType: file.type,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      var result = data; // 서버 응답 저장

      const getRoomInfo = await fetch("/api/room/find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: JSON.parse(data.message).savedData.id,
        }),
      });

      const getRoomInfoResponse = await getRoomInfo.json();

      if(getRoomInfo.ok) {
        console.log(getRoomInfoResponse)
        result = getRoomInfoResponse;

      }

      console.log(result);
      reservationDate.value = result.data[0].date + " " + result.data[0].time
      reservationStore.value = result.data[0].company
      reservationEp.value = result.data[0].theme

      debugger
      window.Kakao.init('e12eae1007e7f69c2299165cf951acf4');

      const url = 'https://service.monnawa.com'
      // const url = 'https://localhost:3000'

      window.Kakao.Share.createDefaultButton({
        container: '.share_btn', // 버튼을 띄울 container ID
        objectType: 'feed', // 피드를 사용할 경우
        content: {
          title: '방탈출 초대', // 초대 메시지 제목
          description: '함께 방탈출 게임에 참여하세요!', // 초대 메시지 설명
          imageUrl: 'https://i.namu.wiki/i/U1qmv3XECFOncsb0JFpMQbPn72UJ3VxNuZWrlBry5h36wdWM1CMmk2wt7QWpTSKcTVjPAnPwTFjxkzWS_phXfg.webp', // 초대에 사용할 이미지 URL
          link: {
            mobileWebUrl: 'https://www.monnawa.com/', // 모바일 웹 URL
            webUrl: 'https://www.monnawa.com/', // 데스크탑 웹 URL
          },
        },
        itemContent: {
          profileText: '방탈출 초대', // 프로필 텍스트
          profileImageUrl: 'https://media.istockphoto.com/id/1218944059/ko/%EB%B2%A1%ED%84%B0/%EB%B9%88-%EA%B2%BD%EC%B0%B0-%EC%BA%90%EB%B9%84%EB%8B%9B-%ED%8F%89%EB%A9%B4-%EB%B2%A1%ED%84%B0-%EA%B7%B8%EB%A6%BC%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%83%88%EC%B6%9C-%EB%B0%A9-%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4-%ED%83%90%EC%A0%95-%EC%A7%81%EC%9E%A5-%EB%B2%94%EC%A3%84-%EC%88%98%EC%82%AC-%EB%AF%B8%EC%8A%A4%ED%84%B0%EB%A6%AC-%ED%95%B4%EA%B2%B0-%ED%80%98%EC%8A%A4%ED%8A%B8-%EB%A3%B8-%ED%98%84%EB%8C%80-%EC%97%94%ED%84%B0%ED%85%8C%EC%9D%B8%EB%A8%BC%ED%8A%B8-%EC%A1%B0%EC%82%AC-%EA%B2%8C%EC%9E%84.jpg?s=612x612&w=0&k=20&c=27d-8S47AYftovRz355Id1wq777VYWVaOxSw0hlx140=', // 프로필 이미지 URL
          titleImageUrl: 'https://media.istockphoto.com/id/1218944059/ko/%EB%B2%A1%ED%84%B0/%EB%B9%88-%EA%B2%BD%EC%B0%B0-%EC%BA%90%EB%B9%84%EB%8B%9B-%ED%8F%89%EB%A9%B4-%EB%B2%A1%ED%84%B0-%EA%B7%B8%EB%A6%BC%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%83%88%EC%B6%9C-%EB%B0%A9-%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4-%ED%83%90%EC%A0%95-%EC%A7%81%EC%9E%A5-%EB%B2%94%EC%A3%84-%EC%88%98%EC%82%AC-%EB%AF%B8%EC%8A%A4%ED%84%B0%EB%A6%AC-%ED%95%B4%EA%B2%B0-%ED%80%98%EC%8A%A4%ED%8A%B8-%EB%A3%B8-%ED%98%84%EB%8C%80-%EC%97%94%ED%84%B0%ED%85%8C%EC%9D%B8%EB%A8%BC%ED%8A%B8-%EC%A1%B0%EC%82%AC-%EA%B2%8C%EC%9E%84.jpg?s=612x612&w=0&k=20&c=27d-8S47AYftovRz355Id1wq777VYWVaOxSw0hlx140=', // 제목 이미지 URL
          titleImageText: reservationEp.value, // 제목 이미지 텍스트
          titleImageCategory: reservationDate.value, // 제목 이미지 카테고리
          items: [
            {
              item: '장소', // 항목 이름
              itemOp: reservationStore.value
            },
            {
              item: '테마',
              itemOp: reservationEp.value
            },
            {
              item: '날짜',
              itemOp: reservationDate.value
            },
          ],
        },
        buttons: [
          {
            title: '초대 수락하기', // 버튼 제목
            link: {
              mobileWebUrl: `${url}/invite/invitation?roomId=${result.data[0].id}`, // 모바일 웹 예약 링크
              webUrl: `${url}/invite/invitation?roomId=${result.data[0].id}`, // 데스크탑 웹 예약 링크
            },
          }
        ],
      });

    } else {
      console.error("업로드 실패:", data);
      alert("업로드 중 오류가 발생했습니다!");
    }
  } catch (error) {
    console.error("업로드 중 에러 발생:", error);
    alert("업로드 중 오류가 발생했습니다!");
  } finally {
    // this.isUploading = false;
  }


//   //더미 데이터
//   reservationDate.value = "2025. 1. 11 (토) 오후 5시"
//   reservationStore.value = "KEYESCAPE 홍대점"
//   reservationEp.value = "Ep.4 주인 없는 낡은 서점"
}

const convertFileToBase64 =  (file) => {

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]); // Base64 데이터만 추출
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

const loadKakaoSDK = async () => {
  return new Promise((resolve, reject) => {
    console.log("window.Kakao" + window.Kakao)
    if (window.Kakao) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.onload = resolve;
      script.onerror = reject;


      document.head.appendChild(script);
    }
  });
}

loadKakaoSDK()
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



