// Supabase 클라이언트 임포트
import { createClient } from '@supabase/supabase-js';
import { eventHandler, readMultipartFormData, createError } from 'h3';
// Supabase URL 및 API 키 설정
const supabaseUrl = 'https://uqqeqjvjhcotrtdftjvk.supabase.co/functions/v1/generate_invite';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxcWVxanZqaGNvdHJ0ZGZ0anZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNjQ0NjYsImV4cCI6MjA1MTc0MDQ2Nn0.VGbtf6JQgleglVXc6afZDnyFz17chnH5eslVO_uHMJ8';  // 환경변수로 저장하는 것이 좋습니다.

// Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseKey);


export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'POST') {
        // const formData = await readMultipartFormData(event);
        // console.log(formData)
        //
        // const file =  formData[0];
        //
        // const sendFormData = new FormData();
        // console.log("file", formData[0]);
        // sendFormData.append('file', file);
        //
        // console.log("file", file.filename);
        //
        // // 1. File 데이터를 Base64로 변환
        // const base64Data = file.toString('base64'); // 파일 데이터를 Base64로 변환
        //
        // console.log("base64Data", base64Data);

        //----
        // Base64 데이터를 바이너리로 디코딩+
        console.log('asdfasdfasdf')
        const body = await readBody(event);
        console.log('asdfasdfasdf')
        const { base64File, filename, fileType } = body;
        console.log('asdfasdfasdf')
        if (!base64File || !filename || !fileType) {
            throw new Error("Invalid request data");
        }
        console.log('asdfasdfasdf')
        const binaryData = Buffer.from(base64File, "base64");

        // Supabase 스토리지에 파일 업로드
        const timestamp = Date.now();
        const uniqueFileName = `${timestamp}-${filename}`; // 유니크 파일 이름 생성

        console.log(uniqueFileName)
        const storageResponse = await fetch(
            `https://uqqeqjvjhcotrtdftjvk.supabase.co/storage/v1/object/invitePicture/${uniqueFileName}`, // Supabase 스토리지 URL
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${supabaseKey}`, // Supabase 익명 키
                    "Content-Type": "image/png", // 클라이언트에서 전달받은 파일 타입
                },
                body: binaryData,
            }
        );

        const file = await storageResponse.json();

        console.log(`data - ${JSON.stringify(file)}`)
        console.log(`data - ${JSON.stringify(file.Key)}`)

        //---

        console.log(JSON.stringify({
            filename: file.Key,
            // base64: base64Data, // Base64로 변환된 이미지 데이터
        }));

        const { data, error } = await supabase.functions.invoke('generate_invite', {
            body: JSON.stringify({
                filename: file.Key,
                // base64: base64Data, // Base64로 변환된 이미지 데이터
            }),
        })

        console.log(data);  // 응답을 JSON 형태로 처리
        console.log(error);
        return new Response(JSON.stringify({ message: data }), { status: 200 });

    }




});