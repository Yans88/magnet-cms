import {
    ADD_DATA_ERROR,
    ADD_DATA_LOADING,
    ADD_DATA_SUCCESS,
    CHG_PROPS,
    CLEAR_ADD_DATA_ERROR,
    FETCH_DATA_ERROR,
    FETCH_DATA_LOADING,
    FETCH_DATA_TEMPLATE_EMAIL,
    FORM_DATA,
    FORM_DELETE
} from './types';

const defaultState = {
    data: {},
    totalData: 0,
    error: null,
    isLoading: true,
    isAddLoading: false,
    errorPriority: null,
    contentMsg: null,
    showFormAdd: false,
    showFormSuccess: false,
    showFormDelete: false,
    showFormApprove: false,
    tipeSWAL: "success"
}

const dataContactUsReducer = (state = defaultState, action) => {

    switch (action.type) {
        case FETCH_DATA_TEMPLATE_EMAIL:
            return {...state, data: action.payload.data, totalData: action.payload.total_data}
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
        case CHG_PROPS:

            return {
                ...state, data: {
                    ...state.data, [action.payload.tipe]: {
                        ...state.data[action.payload.tipe], [action.payload.key]: action.payload.value
                    }
                }
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

export default dataContactUsReducer;