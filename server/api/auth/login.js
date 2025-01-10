import { supabase } from '~/server/utils/supabase';  // Supabase 클라이언트

export default defineEventHandler(async (event) => {

    const body = await readBody(event);  // 카카오 액세스 토큰 받기
    const { kakaoAccessToken } = body;
    console.log("kakaoAccessToken" + kakaoAccessToken)
    if (!kakaoAccessToken) {
        return new Response("Kakao access token is missing", { status: 400 });
    }

    try {
        // 카카오 액세스 토큰으로 Supabase 인증 시도
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'kakao',
            token: kakaoAccessToken,  // 카카오 액세스 토큰 사용
        });

        if (error) {
            return new Response(error.message, { status: 500 });
        }

        console.log(JSON.stringify(data))

        const { user, error: userError } = await supabase.auth.getUser();


        console.log(JSON.stringify(user))
        // 인증 성공 후 JWT 토큰을 쿠키에 저장
        const { access_token } = data.session;  // Supabase에서 반환된 access_token

        // 쿠키에 JWT를 저장
        event.node.res.setHeader('Set-Cookie', `sb-access-token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Strict`);

        // 인증된 사용자 반환
        return { status: 200, user: data.user };  // 객체 형식으로 반환
    } catch (error) {
        return { status: 500, message: error.message };  // 객체 형식으로 반환
    }
});
