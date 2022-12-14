import {loginAdmin} from '../components/login/LoginService'

const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
export const loginByAuth = async (email, password) => {
    const token = await loginAdmin(email, password);
    localStorage.setItem(tokenLogin, token);
    document.getElementById('root').classList.remove('login-page');
    document.getElementById('root').classList.remove('hold-transition');
    return token;
};

