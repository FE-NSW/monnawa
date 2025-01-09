import { supabase } from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {

    // Authorization 헤더에서 토큰을 추출
    const token = event.node.req.headers['authorization']?.split(' ')[1];  // 헤더 이름은 'authorization'이므로 소문자로 확인

    console.log(token)

    try {

        // POST 요청의 body 데이터를 읽음
        const body = await readBody(event);

        // id를 확인
        const userId = body?.id;
        console.log(JSON.stringify(body))
        if (!userId) {
            return {
                status: 400,
                message: "userId is required.",
            };
        }
        console.log("123123")

        const { data: user, error } = await supabase.auth.admin.getUserById(body.id);

        console.log(user)

        if (error) {
            return { status: 500, message: 'Failed to fetch data', error };
        }

        return { status: 200, user };
    } catch (err) {
        return { status: 500, message: 'Unexpected error', error: err.message };
    }
});
