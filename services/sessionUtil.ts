import { useNuxtApp } from '#app';
import { useSupabase } from '~/utils/supabase';

export const sessionUtil = () => {
  const { $axios } = useNuxtApp();

  // 토큰 가져오는 api
  const getToken = async () => {
    const { data: session, error } = await useSupabase().auth.getSession();
    if(session.session){
      return session.session.access_token
    }

    return null;
  };

  const getUser = async () => {
    const { data: session, error } = await useSupabase().auth.getSession();

    if(session.session){
      return session.session.user
    }

    return null;
  };

  return {
    getToken, getUser
  };
};
