import { supabase } from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {

    try {
        // 요청에서 데이터 가져오기
        const body = await readBody(event);
        const { auth_id, email, name, profile_image } = body;

        // 필드 유효성 검사
        if (!auth_id || !email) {
            throw new Error('auth_id와 email은 필수입니다.');
        }

        // Supabase에 데이터 삽입
        const { data, error } = await supabase.from('users').insert([
            {
                auth_id,
                email,
                name,
                profile_image,
            },
        ]);

        // 에러 처리
        if (error) {
            throw error;
        }

        // 성공적으로 추가된 데이터 반환
        return {
            success: true,
            data,
        };
    } catch (error) {
        // 에러 응답
        return {
            success: false,
            error: error.message,
        };
    }
});
