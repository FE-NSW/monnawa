import { sessionUtil } from '~/services/sessionUtil';
export default defineNuxtRouteMiddleware( async (to, from) => {
  
  //로그인 토큰 여부 확인
  const token = await sessionUtil().getToken();

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token && to.path !== '/login') {
    console.log('No token found. Redirecting to login.');

    let redirectUrl;
    
    // 리다이렉트 url없으면 루트로 보냄
    if(to.query.redirectUrl) {
      redirectUrl = to.query.redirectUrl;
    } else {
      redirectUrl = "/";
    }
    debugger
    return navigateTo(`/login?redirectUrl=${redirectUrl}`);
  }

  // 로그인 상태에서 redirectUrl이 있는 경우 해당 URL로 리다이렉트
  if (token && to.query.redirectUrl) {
    console.log('Redirecting to:', to.query.redirectUrl);
    return navigateTo(to.query.redirectUrl as string);
  }
});
