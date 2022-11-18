import axios from 'axios';
import {
    ADD_DATA_ERROR,
    ADD_DATA_LOADING,
    ADD_DATA_SUCCESS,
    CLEAR_ADD_DATA_ERROR,
    FETCH_DATA_BANNER,
    FETCH_DATA_ERROR,
    FETCH_DATA_LOADING,
    FORM_DATA,
    FORM_DELETE
} from '../store/reducers/types';

const API_URL = process.env.REACT_APP_URL_API;
const CryptoJS = require("crypto-js");
const secretKey = process.env.REACT_APP_SECRET_KEY;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

export const fetchDataSuccess = (data) => {
    return {
        type: FETCH_DATA_BANNER,
        payload: data
    }
}

export const fetchDataLoading = (data) => {
    return {
        type: FETCH_DATA_LOADING,
        payload: data
    }
}

export const fetchAddDataLoading = (data) => {
    return {
        type: ADD_DATA_LOADING,
        payload: data
    }
}

export const fetchDataError = (data) => {
    return {
        type: FETCH_DATA_ERROR,
        payload: data
    }
}

export const addDataError = (data) => {
    return {
        type: ADD_DATA_ERROR,
        payload: data
    }
}

export const clearAddDataError = (data) => {
    return {
        type: CLEAR_ADD_DATA_ERROR,
        payload: data
    }
}

export const addDataSuccess = (data) => {
    return {
        type: ADD_DATA_SUCCESS,
        payload: data
    }
}

export const fetchData = (param) => {
    let isLoading = true;
    const token = localStorage.getItem(tokenLogin);
    const dt = CryptoJS.AES.decrypt(token, secretKey);
    const dt_res = dt.toString(CryptoJS.enc.Utf8);
    const _dt = dt_res.split('Þ');
    return async (dispatch) => {
        dispatch(fetchDataLoading(isLoading));
        return await axios.get(API_URL + "/back-office/data-banner" + param, {
            headers: {
                'x-app-origin': 'backoffice-app',
                'Authorization': 'Bearer ' + _dt[0]
            }
        })
            .then(response => {
                const data = {};
                if (response.data.error_message === 0) {
                    data['data'] = response.data.payload.data
                    data['total_data'] = response.data.payload.total_data
                    dispatch(fetchDataSuccess(data));
                    isLoading = false;
                    dispatch(fetchDataLoading(isLoading));
                } else {
                    const errorpayload = {};
                    errorpayload['message'] = 'Something wrong';
                    errorpayload['status'] = response.data.error_message;
                    dispatch(fetchDataError(errorpayload));
                    isLoading = false;
                    dispatch(fetchDataLoading(isLoading));
                }
            }).catch(error => {
                const errorpayload = {};
                errorpayload['message'] = 'Something wrong';
                errorpayload['status'] = error.response ? error.response.status : 404;
                dispatch(fetchDataError(errorpayload));
                isLoading = false;
                dispatch(fetchDataLoading(isLoading));
            })
    }
}


export const addForm = (dt) => {
    const data = {};
    data['errorPriority'] = null;
    data['showFormAdd'] = dt;
    data['isAddLoading'] = false;
    return {
        type: FORM_DATA,
        payload: data
    }
}

export const showConfirmDel = (dt) => {
    const data = {};
    data['errorPriority'] = null;
    data['showFormDelete'] = dt;
    data['isAddLoading'] = false;
    return {
        type: FORM_DELETE,
        payload: data
    }
}

export const addData = (param) => {
    let isLoading = true;
    const token = localStorage.getItem(tokenLogin);
    const dt = CryptoJS.AES.decrypt(token, secretKey);
    const dt_res = dt.toString(CryptoJS.enc.Utf8);
    const _dt = dt_res.split('Þ');
    const form = Object.keys(param).reduce((f, k) => {
        f.append(k, param[k]);
        return f;
    }, new FormData());
    return async (dispatch) => {
        dispatch(fetchAddDataLoading(isLoading));
        const _data = {};
        await axios.post(API_URL + "/back-office/action-data-banner", form, {
            headers: {
                'x-app-origin': 'backoffice-app',
                'Authorization': 'Bearer ' + _dt[0]
            }
        })
            .then(response => {
                const err_code = response.data.error_message;
                if (err_code === 0) {
                    dispatch(addForm(false));
                    _data['showFormSuccess'] = true;
                    _data['tipeSWAL'] = "success";
                    _data['contentMsg'] = <div
                        dangerouslySetInnerHTML={{__html: '<div style="font-size:20px; text-align:center;"><strong>Success</strong>, Data berhasil disimpan</div>'}}/>;
                    dispatch(addDataSuccess(_data));
                }

            }).catch(error => {
                console.log(error);
                dispatch(addForm(false));
                isLoading = false;
                _data['showFormSuccess'] = true;
                _data['tipeSWAL'] = "error";
                _data['contentMsg'] = <div
                    dangerouslySetInnerHTML={{__html: '<div style="font-size:20px; text-align:center;"><strong>Failed</strong>, Something wrong</div>'}}/>;
                dispatch(addDataSuccess(_data));
                dispatch(fetchAddDataLoading(isLoading));
            })
    }

}

export const deleteData = (param) => {
    let isLoading = true;
    const token = localStorage.getItem(tokenLogin);
    const dt = CryptoJS.AES.decrypt(token, secretKey);
    const dt_res = dt.toString(CryptoJS.enc.Utf8);
    const _dt = dt_res.split('Þ');
    return async (dispatch) => {
        dispatch(fetchAddDataLoading(isLoading));
        const _data = {};
        await axios.get(API_URL + "/back-office/delete-data-banner/" + param, {
            headers: {
                'x-app-origin': 'backoffice-app',
                'Authorization': 'Bearer ' + _dt[0]
            }
        })
            .then(response => {
                dispatch(showConfirmDel(false));
                const err_code = response.data.error_message;
                if (err_code === 0) {
                    _data['showFormSuccess'] = true;
                    _data['tipeSWAL'] = "success";
                    _data['contentMsg'] = <div
                        dangerouslySetInnerHTML={{__html: '<div style="font-size:20px; text-align:center;"><strong>Success</strong>, Data berhasil dihapus</div>'}}/>;
                    dispatch(addDataSuccess(_data));
                } else {
                    let isLoading = false;
                    _data['showFormSuccess'] = true;
                    _data['tipeSWAL'] = "error";
                    _data['contentMsg'] = <div
                        dangerouslySetInnerHTML={{__html: '<div style="font-size:20px; text-align:center;"><strong>Failed</strong>, Something wrong</div>'}}/>;
                    dispatch(addDataSuccess(_data));
                    dispatch(fetchAddDataLoading(isLoading));
                }

            }).catch(error => {
                console.log(error);
                let isLoading = false;
                dispatch(showConfirmDel(false));
                _data['showFormSuccess'] = true;
                _data['tipeSWAL'] = "error";
                _data['contentMsg'] = <div
                    dangerouslySetInnerHTML={{__html: '<div style="font-size:20px; text-align:center;"><strong>Failed</strong>, Something wrong</div>'}}/>;
                dispatch(addDataSuccess(_data));
                dispatch(fetchAddDataLoading(isLoading));
            })
    }

}

export const postData = async (param, action) => {
    const token = localStorage.getItem(tokenLogin);
    const dt = CryptoJS.AES.decrypt(token, secretKey);
    const dt_res = dt.toString(CryptoJS.enc.Utf8);
    const _dt = dt_res.split('Þ');
    switch (action) {
        case "VIEW_DETAIL":
            return await axios.get(API_URL + "/back-office/edit-data-banner/" + param, {
                headers: {
                    'x-app-origin': 'backoffice-app',
                    'Authorization': 'Bearer ' + _dt[0]
                }
            })
        default:
            return await axios.get(API_URL + "/back-office/edit-data-banner/" + param, {
                headers: {
                    'x-app-origin': 'backoffice-app',
                    'Authorization': 'Bearer ' + _dt[0]
                }
            })
    }
}