import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { update_auth_from_cookies } from '../store/auth/authActions';

const useAuthCookies = () => {
  function handleSelector (state: { auth: { user_id: any; username: any; }; }) {
    const user_id = state.auth.user_id;
    const username = state.auth.username;
    return { user_id, username }
  }
  const store = useSelector(handleSelector);
  const dispatch = useDispatch()
  
  if(store.user_id === "" || store.username === "") {
    const user_id = Cookies.get('user_id');
    const username = Cookies.get("username");
    const obj = {
      username,
      user_id
    }
    dispatch(update_auth_from_cookies(obj));
  }
}

export default useAuthCookies;