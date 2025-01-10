import { supabase } from '~/server/utils/supabase';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {

    // Authorization 헤더에서 토큰을 추출
    const token = event.node.req.headers['authorization']?.split(' ')[1];  // 헤더 이름은 'authorization'이므로 소문자로 확인
    const decoded = jwt.decode(token);
    console.log(JSON.stringify(decoded.sub))

    try {

        // POST 요청의 body 데이터를 읽음
        const body = await readBody(event);

        // id를 확인
        const invite_id = body?.id;
        if (!invite_id) {
            return {
                status: 400,
                message: "Room ID is required.",
            };
        }

        console.log(invite_id);
        var user_id = decoded.sub;
        console.log("user_id" + user_id);
        // 데이터 조회
        const { data, error } = await supabase
            .from('invite_user') // 조회할 테이블 이름
            .insert([
                {
                    invite_id,
                    user_id,
                },
            ]);

        if (error) {
            return { status: 500, message: 'Failed to fetch data', error };
        }

        return { status: 200, data };
    } catch (err) {
        return { status: 500, message: 'Unexpected error', error: err.message };
    }
});
