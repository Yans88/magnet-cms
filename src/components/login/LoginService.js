import axios from "axios";
import "moment/locale/id";

const API_URL = process.env.REACT_APP_URL_API;
const CryptoJS = require("crypto-js");
const secretKey = process.env.REACT_APP_SECRET_KEY;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

export const loginAdmin = async (email, pass) => {
    const param = {
        email: email,
        password: pass
    };
    let token = '';
    await axios.post(API_URL + '/api/login', param, {headers: {'x-app-origin': 'backoffice-app'}}).then(res => {
        const response = res.data;

        if (response.error_message === 0) {
            let data = response.payload;
            let accessToken = data.accessToken;
            let tgl = new Date();
            const _token = accessToken + 'Þ' + tgl;
            token = CryptoJS.AES.encrypt(_token, secretKey).toString();
        } else {
            token = '';
        }
    });
    return token;
}


export const GetProfileAdmin = async () => {
    const token = localStorage.getItem(tokenLogin);
    const mbo_token_fcm = localStorage.getItem('mbo_token_fcm_');
    const dt = CryptoJS.AES.decrypt(token, secretKey);
    const dt_res = dt.toString(CryptoJS.enc.Utf8);
    const _dt = dt_res.split('Þ');
    var res = {accessToken: token};
    var param = {fcm_token: mbo_token_fcm};
    await axios.get(API_URL + "/api/profile", {
        headers: {
            'x-app-origin': 'backoffice-app',
            'Authorization': 'Bearer ' + _dt[0]
        }
    })
        .then(response => {
            const data = {};
            res = {accessToken: token, allowedMenu: response.data.payload.allowedMenu};
            if (response.data.error_message === 3) {
                localStorage.removeItem(tokenLogin);
                res = {accessToken: null};
            }
        }).catch(error => {
            const errorpayload = {};
            res = {accessToken: null};
            errorpayload['message'] = 'Something wrong';
            errorpayload['status'] = error.response ? error.response.status : 404;
        });
    if (token && mbo_token_fcm) {
        await axios.post(API_URL + "/back-office/register-notifikasi", param, {
            headers: {
                'x-app-origin': 'backoffice-app',
                'Authorization': 'Bearer ' + _dt[0]
            }
        });
        localStorage.removeItem('mbo_token_fcm_');
    }
    return res;
}
