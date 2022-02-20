import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { update_auth_from_cookies } from '../store/auth/authActions';

const useAuthCookies = () => {
  function handleSelector (state: { auth: { user_id: any; username: any; name: string }; }) {
    const user_id = state.auth.user_id;
    const username = state.auth.username;
    const name = state.auth.name;
    return { user_id, username, name }
  }
  const store = useSelector(handleSelector);
  const dispatch = useDispatch()
  
  if(store.user_id === "" || store.username === "" || store.name === "") {
    const user_id = Cookies.get('user_id');
    const username = Cookies.get("username");
    const name = Cookies.get("name");
    const obj = {
      username,
      user_id,
      name
    }
    dispatch(update_auth_from_cookies(obj));
  }
}

export default useAuthCookies;