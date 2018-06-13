import { store } from '../store';

export default (to, from, next) => {
  if (localStorage.getItem('user')) next()
  else next('/signin');
}
