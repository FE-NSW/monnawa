import { supabase } from '~/server/utils/supabase';
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const token = event.node.req.headers['authorization']?.split(' ')[1];  // 헤더 이름은 'authorization'이므로 소문자로 확인
    const decoded = jwt.decode(token);
    console.log(JSON.stringify(decoded.sub))
    const user_id = decoded.sub;
    const {
        invite_id,
        clear_status,
        difficulty,
        horror_level,
        story_rating,
        activity_level,
        scale_rating,
        lock_rating,
        device_rating,
        tags,
        review_content,
        remaining_time,
        success_status
    } = body;

    // reviews 테이블에 데이터 삽입
    const { data: reviewData, error: reviewError } = await supabase
        .from('reviews')
        .insert([
            {
                user_id,
                invite_id,
                clear_status,
                difficulty,
                horror_level,
                story_rating,
                activity_level,
                scale_rating,
                lock_rating,
                device_rating,
                tags,
                review_content,
            },
        ])
        .select();

    if (reviewError) {
        return { status: 500, message: 'Failed to insert review data', error: reviewError };
    }

    // invite_results 테이블에 데이터 삽입
    const { data: resultData, error: resultError } = await supabase
        .from('invite_results')
        .insert([
            {
                invite_id,
                remaining_time,
                success_status,
            },
        ])
        .select();

    if (resultError) {
        return { status: 500, message: 'Failed to insert invite results', error: resultError };
    }

    return { status: 200, message: 'Review and invite results saved successfully', reviewData, resultData };
});
