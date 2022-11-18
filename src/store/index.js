import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import dataUserReducer from './reducers/dataUserReducer';
import dataRoleReducer from './reducers/dataRoleReducer';
import dataBankReducer from './reducers/dataBankReducer';
import dataNegaraReducer from './reducers/dataNegaraReducer';
import dataProvinsiReducer from './reducers/dataProvinsiReducer';
import dataKotaReducer from './reducers/dataKotaReducer';
import dataCabangReducer from './reducers/dataCabangReducer';
import dataRateReducer from './reducers/dataRateReducer';
import dataTipeAkunReducer from './reducers/dataTipeAkunReducer';
import dataSettingReducer from './reducers/dataSettingReducer';
import dataRefCodeReducer from './reducers/dataRefCodeReducer';
import dataAkunTerpisahReducer from './reducers/dataAkunTerpisahReducer';
import susunanPengurusReducer from './reducers/susunanPengurusReducer';
import susunanSahamReducer from './reducers/susunanSahamReducer';
import profilePerusahaanReducer from './reducers/profilePerusahaanReducer';
import legalitasPerusahaanReducer from './reducers/legalitasPerusahaanReducer';
import dataBannerReducer from './reducers/dataBannerReducer';
import dataSetoranReducer from './reducers/dataSetoranReducer';
import dataPenarikanReducer from './reducers/dataPenarikanReducer';
import dataBankPReducer from './reducers/dataBankPReducer';
import dataContactUsReducer from './reducers/dataContactUsReducer';
import dataAkunDemoReducer from './reducers/dataAkunDemoReducer';
import dataTemplateEmailReducer from './reducers/dataTemplateEmailReducer';
import dataArtikelReducer from './reducers/dataArtikelReducer';
import dataListApproveReducer from './reducers/dataListApproveReducer';
import dataTransferReducer from './reducers/dataTransferReducer';
import dataDelBankReducer from './reducers/dataDelBankReducer';
import dataNewBankReducer from './reducers/dataNewBankReducer';
import dataNewEmailReducer from './reducers/dataNewEmailReducer';

const rootReducer = combineReducers({
    dataUser: dataUserReducer,
    dataRole: dataRoleReducer,
    dataSetoran: dataSetoranReducer,
    dataPenarikan: dataPenarikanReducer,
    dataBank: dataBankReducer,
    dataBanner: dataBannerReducer,
    dataNegara: dataNegaraReducer,
    dataProvinsi: dataProvinsiReducer,
    dataKota: dataKotaReducer,
    dataCabang: dataCabangReducer,
    dataRate: dataRateReducer,
    dataTipeAkun: dataTipeAkunReducer,
    dataSetting: dataSettingReducer,
    dataRefCode: dataRefCodeReducer,
    dataAkunTerpisah: dataAkunTerpisahReducer,
    dataSusunanPengurus: susunanPengurusReducer,
    dataSusunanSaham: susunanSahamReducer,
    dataProfilePerusahaan: profilePerusahaanReducer,
    dataLegalitasPerusahaan: legalitasPerusahaanReducer,
    auth: authReducer,
    dataBankPerushaan: dataBankPReducer,
    dataContactUs: dataContactUsReducer,
    dataAkunDemo: dataAkunDemoReducer,
    dataTemplateEmail: dataTemplateEmailReducer,
    dataArtikel: dataArtikelReducer,
    dataListApprove: dataListApproveReducer,
    dataTransfer: dataTransferReducer,
    dataDelBank: dataDelBankReducer,
    dataNewBank: dataNewBankReducer,
    dataEditEmail: dataNewEmailReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
);

/* for development */
const store = createStore(rootReducer, enhancer);

/* for production */
//const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;