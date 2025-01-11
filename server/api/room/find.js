import { supabase } from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {

    // Authorization 헤더에서 토큰을 추출
    const token = event.node.req.headers['authorization']?.split(' ')[1];  // 헤더 이름은 'authorization'이므로 소문자로 확인

    console.log(token)

    try {

        // POST 요청의 body 데이터를 읽음
        const body = await readBody(event);

        // id를 확인
        const roomId = body?.id;
        console.log(JSON.stringify(body))
        if (!roomId) {
            return {
                status: 400,
                message: "Room ID is required.",
            };
        }

        console.log(roomId);

        // 데이터 조회
        const { data, error } = await supabase
            .from('invites') // 조회할 테이블 이름
            .select('*') // 필요한 컬럼 선택
            .match({id: roomId}); // 조건 필터 (예: { id: 1 })

        if (error) {
            return { status: 500, message: 'Failed to fetch data', error };
        }

        console.log("new id " + roomId)
        // 데이터 조회
        // const { data : data2, error: error2 } = await supabase
        //     .from('invite_user') // 조회할 테이블 이름
        //     .select('*') // 필요한 컬럼 선택
        //     .match({invite_id: roomId}); // 조건 필터 (예: { id: 1 })

        const { data: inviteData, error: inviteError } = await supabase
            .from('invite_user')
            .select('*')
            .eq('invite_id', roomId);

        if (inviteError) {
            console.error('Invite error:', inviteError);
            return;
        }

        // inviteData에 대한 유저 정보를 하나씩 조회하여 병합
        const mergedData = await Promise.all(
            inviteData.map(async (invite) => {
                // 각 invite에 해당하는 user 정보를 가져오기
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('profile_image')
                    .eq('auth_id', invite.user_id)
                    .single(); // 유저가 하나만 반환될 경우 .single() 사용

                if (userError) {
                    console.error('User error:', userError);
                    return null; // 에러 발생 시 null 반환
                }

                // invite 데이터와 user 데이터를 병합
                return {
                    ...invite,
                    profile_image: userData?.profile_image, // 유저의 프로필 이미지 포함
                };
            })
        );


        const validData = mergedData.filter(item => item !== null);


        if (error) {
            return { status: 500, message: 'Failed to fetch data', error };
        }

        console.log("new id " + JSON.stringify(data))
        console.log("new id " + JSON.stringify(validData))
        data.push({'users' : validData})
        console.log("new id " + JSON.stringify(data))
        return { status: 200, data };
    } catch (err) {
        return { status: 500, message: 'Unexpected error', error: err.message };
    }
});
