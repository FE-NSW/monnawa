export default defineNuxtRouteMiddleware((to, from) => {

  console.log('Navigating from:', from.path, 'to:', to.path);
  const token = useCookie('auth_token');

  // if (!token.value && to.path !== '/login') {
  //   return navigateTo('/login');
  // } else {
  //   return navigateTo('/reviews')
  // }

});
