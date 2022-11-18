import {
    ADD_DATA_ERROR,
    ADD_DATA_LOADING,
    ADD_DATA_SUCCESS,
    CLEAR_ADD_DATA_ERROR,
    FETCH_DATA_ERROR,
    FETCH_DATA_LOADING,
    FETCH_DATA_SETORAN,
    FETCH_DATA_SUCCESS_EXPORT_SETORAN,
    FORM_DATA,
    FORM_DELETE
} from './types';

const defaultState = {
    data: [],
    totalData: 0,
    error: null,
    isLoading: false,
    isAddLoading: false,
    errorPriority: null,
    contentMsg: null,
    showFormAdd: false,
    showFormSuccess: false,
    showFormDelete: false,
    tipeSWAL: "success",
    waktu_server: new Date(),
    selected: {}
}

const dataSetoranReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_DATA_SETORAN:
            return {
                ...state,
                data: action.payload.data,
                totalData: action.payload.total_data,
                waktu_server: action.payload.waktu_server
            }
        case FETCH_DATA_SUCCESS_EXPORT_SETORAN:
            return {...state, data_report_setor: action.payload.data_report, waktu_server: action.payload.waktu_server}
        case FETCH_DATA_LOADING:
            return {...state, isLoading: action.payload}
        case FORM_DATA:
            return {
                ...state,
                isAddLoading: action.payload.isAddLoading,
                showFormAdd: action.payload.showFormAdd,
                errorPriority: action.payload.errorPriority
            }
        case FORM_DELETE:
            return {
                ...state,
                isAddLoading: action.payload.isAddLoading,
                showFormDelete: action.payload.showFormDelete,
                errorPriority: action.payload.errorPriority
            }
        case ADD_DATA_LOADING:
            return {...state, isAddLoading: action.payload}
        case FETCH_DATA_ERROR:
            return {...state, error: action.payload}
        case ADD_DATA_ERROR:
            return {...state, errorPriority: action.payload}
        case ADD_DATA_SUCCESS:
            return {
                ...state,
                tipeSWAL: action.payload.tipeSWAL,
                showFormSuccess: action.payload.showFormSuccess,
                contentMsg: action.payload.contentMsg
            }
        case CLEAR_ADD_DATA_ERROR:
            return {...state, errorPriority: null, isAddLoading: false}
        default:
            return state
    }
}

export default dataSetoranReducer;