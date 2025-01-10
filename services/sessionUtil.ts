import { useNuxtApp } from '#app';
import { useSupabase } from '~/utils/supabase';

export const sessionUtil = () => {
  const { $axios } = useNuxtApp();

  // 리뷰 데이터를 가져오는 API 호출 함수
  const getToken = async () => {
debugger
    const { data: session, error } = await useSupabase().auth.getSession();
    
    return session.session.access_token
  };

  return {
    getToken
  };
};
