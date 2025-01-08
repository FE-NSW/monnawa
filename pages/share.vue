<template>
  <div class="page-container">
    <h1>이미지 업로드 및 카카오 공유</h1>
    <p class="description">
      이미지를 업로드하고 결과를 확인한 후, 카카오톡으로 공유해보세요!
    </p>

    <!-- 이미지 업로드 폼 -->
    <div class="upload-container">
      <input type="file" @change="handleFileUpload" />
      <button @click="submitImage" :disabled="isUploading">
        {{ isUploading ? "업로드 중..." : "이미지 업로드" }}
      </button>
    </div>

    <!-- 결과 섹션 -->
    <div v-show="result" class="result-container">
      <p><strong>서버 응답:</strong></p>
      <pre>{{ result }}</pre>
      <button id="kakaotalk-sharing-btn"  class="kakao-share-button">
        카카오톡으로 공유
      </button>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedFile: null,
      isUploading: false,
      result: null, // 서버 응답 저장
      isLoadKakao: false
    };
  },
  mounted() {
     this.loadKakaoSDK()
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    },
    async submitImage() {
      if (!this.selectedFile) {
        alert("이미지를 선택해주세요!");
        return;
      }

      this.isUploading = true;

      try {
        // 파일을 Base64로 변환
        const base64File = await this.convertFileToBase64(this.selectedFile);

        // 서버에 업로드
        const response = await fetch("/api/invite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            base64File,
            filename: this.selectedFile.name,
            fileType: this.selectedFile.type,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          this.result = data; // 서버 응답 저장
          this.shareToKakao()
        } else {
          console.error("업로드 실패:", data);
          alert("업로드 중 오류가 발생했습니다!");
        }
      } catch (error) {
        console.error("업로드 중 에러 발생:", error);
        alert("업로드 중 오류가 발생했습니다!");
      } finally {
        this.isUploading = false;
      }
    },
    convertFileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]); // Base64 데이터만 추출
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    },
    async loadKakaoSDK() {
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
    },
    async shareToKakao() {


      if(! this.isLoadKakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init('e12eae1007e7f69c2299165cf951acf4');
        }
            // .then(() => {
            //
            //   window.Kakao.init('e12eae1007e7f69c2299165cf951acf4'); // 카카오 JavaScript SDK 키
            //   console.log('카카오 SDK 초기화 성공');
            //
            // })
            // .catch((error) => {
            //   console.error('카카오 SDK 로드 실패:', error);
            //   return
            // });
        this.isLoadKakao = true;
      }


          if (!window.Kakao) {
              alert('카카오 SDK가 로드되지 않았습니다.');
            console.log("카카오 SDK가 로드되지 않았습니다.")
              return;
          }

          window.Kakao.Share.createDefaultButton({
              container: '#kakaotalk-sharing-btn', // 버튼을 띄울 container ID
              objectType: 'feed', // 피드를 사용할 경우
              content: {
                  title: '방탈출 초대!', // 초대 메시지 제목
                  description: '함께 방탈출 게임에 참여하세요!', // 초대 메시지 설명
                  imageUrl: 'https://example.com/escape_room_image.jpg', // 초대에 사용할 이미지 URL
                  link: {
                      mobileWebUrl: 'https://your-website.com/escape-room', // 모바일 웹 URL
                      webUrl: 'https://your-website.com/escape-room', // 데스크탑 웹 URL
                  },
              },
              itemContent: {
                  profileText: '방탈출 초대', // 프로필 텍스트
                  profileImageUrl: 'https://example.com/profile_image.jpg', // 프로필 이미지 URL
                  titleImageUrl: 'https://example.com/escape_room_image.jpg', // 제목 이미지 URL
                  titleImageText: '방탈출 초대', // 제목 이미지 텍스트
                  titleImageCategory: '게임', // 제목 이미지 카테고리
                  items: [
                      {
                          item: '방탈출 1', // 항목 이름
                          itemOp: '1인 10,000원', // 항목 가격 또는 옵션
                      },
                      {
                          item: '방탈출 2',
                          itemOp: '1인 15,000원',
                      },
                      {
                          item: '방탈출 3',
                          itemOp: '2인 25,000원',
                      },
                  ],
                  sum: '총 금액', // 총 금액
                  sumOp: '35,000원', // 총 금액 옵션
              },
              social: {
                  likeCount: 100, // 좋아요 수
                  commentCount: 50, // 댓글 수
                  sharedCount: 200, // 공유 수
              },
              buttons: [
                  {
                      title: '웹으로 예약', // 버튼 제목
                      link: {
                          mobileWebUrl: 'https://your-website.com/escape-room', // 모바일 웹 예약 링크
                          webUrl: 'https://your-website.com/escape-room', // 데스크탑 웹 예약 링크
                      },
                  },
                  {
                      title: '앱으로 예약', // 앱으로 이동하는 버튼 제목
                      link: {
                          mobileWebUrl: 'https://your-website.com/escape-room', // 앱 예약 링크
                          webUrl: 'https://your-website.com/escape-room', // 데스크탑 웹 예약 링크
                      },
                  },
              ],
          });


    },
  },
};
</script>
<style scoped>
.page-container {
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
  font-family: Arial, sans-serif;
}

.description {
  margin-bottom: 1rem;
  color: #555;
}

.upload-container {
  margin-bottom: 2rem;
}

.upload-container input {
  margin-right: 1rem;
}

.upload-container button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.upload-container button:disabled {
  background-color: #aaa;
}

.result-container {
  margin-top: 2rem;
  text-align: left;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.kakao-share-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f7e600;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
