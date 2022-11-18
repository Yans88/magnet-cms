import "./App.css";

import React, {Component, Fragment} from "react";
import {Toast} from "react-bootstrap";
import Main from "../src/components/main/Main";
import Login from "../src/components/login/Login";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import PublicRoute from "./router/PublicRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import PageLoading from "./components/main/PageLoading";

import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";

const DataUser = React.lazy(() => import("./data-user/DataUser"));
const Forbidden = React.lazy(() => import("./components/main/Forbidden"));
const DataUserCabinet = React.lazy(() =>
    import("./data-user-cabinet/DataUser")
);
const DetailUserCabinet = React.lazy(() =>
    import("./data-user-cabinet/DetailUser")
);
const DataRole = React.lazy(() => import("./data-role/DataRole"));
const DetailRole = React.lazy(() => import("./data-role/DetailRole"));
const DataSetoran = React.lazy(() => import("./data-setoran/DataSetoran"));
const DataSetoranApprove = React.lazy(() =>
    import("./data-setoran/DataSetoranApprove")
);
const DataSetoranReject = React.lazy(() =>
    import("./data-setoran/DataSetoranReject")
);
const DataBank = React.lazy(() => import("./data-bank/DataBank"));
const DataNegara = React.lazy(() => import("./data-negara/DataNegara"));
const DataProvinsi = React.lazy(() => import("./data-provinsi/DataProvinsi"));
const DataKota = React.lazy(() => import("./data-kota/DataKota"));
const DataCabang = React.lazy(() => import("./data-cabang/DataCabang"));
const DataRate = React.lazy(() => import("./data-rate/DataRate"));
const DataSusunanSaham = React.lazy(() =>
    import("./data-susunan-saham/SusunanSaham")
);
const DataSetting = React.lazy(() => import("./data-setting/DataSetting"));
const DataTipeAkun = React.lazy(() => import("./data-tipe-akun/DataTipeAkun"));
const DataAkunTerpisah = React.lazy(() =>
    import("./data-akun-terpisah/DataAkunTerpisah")
);
const DataSusunanPengurus = React.lazy(() =>
    import("./data-susunan-pengurus/DataSusunanPengurus")
);
const DataProfilePerusahaan = React.lazy(() =>
    import("./data-profile-perusahaan/DataProfilePerusahaan")
);
const DataLegalitasPerusahaan = React.lazy(() =>
    import("./data-legalitas-perusahaan/DataLegalitasPerusahaan")
);
const DataRefCode = React.lazy(() => import("./data-ref-code/DataRefCode"));
const Dashboard = React.lazy(() => import("./dashboard"));
const NotFound = React.lazy(() => import("./dashboard/notfound"));
const DataBanner = React.lazy(() => import("./data-banner/DataBanner"));
const DataBannerForex = React.lazy(() =>
    import("./data-banner/DataBannerForex")
);
const DataBannerForexTrading = React.lazy(() =>
    import("./data-banner/DataBannerForexTrading")
);
const DataBannerForexCuan = React.lazy(() =>
    import("./data-banner/DataBannerForexCuan")
);
const DataBannerMetal = React.lazy(() =>
    import("./data-banner/DataBannerMetal")
);
const DataBannerMetalTrading = React.lazy(() =>
    import("./data-banner/DataBannerMetalTrading")
);
const DataBannerMetalCuan = React.lazy(() =>
    import("./data-banner/DataBannerMetalCuan")
);
const DataBannerHomeTradingMagnet = React.lazy(() =>
    import("./data-banner/DataBannerHomeTradingMagnet")
);
const DataBannerHomeTeknologiTrading = React.lazy(() =>
    import("./data-banner/DataBannerHomeTeknologiTrading")
);
const DataBannerCommodities = React.lazy(() =>
    import("./data-banner/DataBannerCommodities")
);
const DataBannerCommoditiesTrading = React.lazy(() =>
    import("./data-banner/DataBannerCommoditiesTrading")
);
const DataBannerCommoditiesCuan = React.lazy(() =>
    import("./data-banner/DataBannerCommoditiesCuan")
);
const DataBannerIndicies = React.lazy(() =>
    import("./data-banner/DataBannerIndicies")
);
const DataBannerIndiciesTrading = React.lazy(() =>
    import("./data-banner/DataBannerIndiciesTrading")
);
const DataBannerIndiciesCuan = React.lazy(() =>
    import("./data-banner/DataBannerIndiciesCuan")
);
const DataBannerMetatrader5 = React.lazy(() =>
    import("./data-banner/DataBannerMetatrader5")
);
const DataBannerMetatrader5Benefit = React.lazy(() =>
    import("./data-banner/DataBannerMetatrader5Benefit")
);
const DataBannerMetatrader5Pengguna = React.lazy(() =>
    import("./data-banner/DataBannerMetatrader5Pengguna")
);
const DataBannerMetatrader5Key = React.lazy(() =>
    import("./data-banner/DataBannerMetatrader5Key")
);
const DataBannerCompany = React.lazy(() =>
    import("./data-banner/DataBannerCompany")
);
const DataBannerCompanyBenefit = React.lazy(() =>
    import("./data-banner/DataBannerCompanyBenefit")
);
const DataBannerCompanyCuan = React.lazy(() =>
    import("./data-banner/DataBannerCompanyCuan")
);
const FrmBanner = React.lazy(() => import("./data-banner/FrmBanner"));
const DataBankPerusahaan = React.lazy(() =>
    import("./bank-perusahaan/DataBankPerusahaan")
);
const DataContact = React.lazy(() => import("./data-contact-us/DataContact"));
const DataAkunDemo = React.lazy(() => import("./data-akun-demo/DataAkunDemo"));
const DataTemplateEmail = React.lazy(() =>
    import("./data-template-email/DataTemplateEmail")
);
const FrmTemplateEmail = React.lazy(() =>
    import("./data-template-email/FrmTemplateEmail")
);
/* const DataPenarikan = React.lazy(() =>
  import("./data-penarikan/DataPenarikan")
); */
const DataPenarikanApprove = React.lazy(() =>
    import("./data-penarikan/DataPenarikanApprove")
);
/* const DataPenarikanReject = React.lazy(() =>
  import("./data-penarikan/DataPenarikanReject")
); */
const DataEducation = React.lazy(() => import("./data-artikel/DataEducation"));
const DataNews = React.lazy(() => import("./data-artikel/DataNews"));
const DataBlog = React.lazy(() => import("./data-artikel/DataBlog"));
const FrmArtikel = React.lazy(() => import("./data-artikel/FrmArtikel"));
const DataListApprove = React.lazy(() =>
    import("./data-list-approve/DataListApprove")
);
const DetailUserListAppr = React.lazy(() =>
    import("./data-list-approve/DetailUserListAppr")
);
const DataTransfer = React.lazy(() => import("./data-transfer/DataTransfer"));
const DataDelBank = React.lazy(() => import("./data-delete-bank/DataDelBank"));
const DataDelBankApprove = React.lazy(() =>
    import("./data-delete-bank/DataDelBankApprove")
);
const DataDelBankReject = React.lazy(() =>
    import("./data-delete-bank/DataDelBankReject")
);

const DataNewBank = React.lazy(() => import("./data-new-bank/DataNewBank"));
const DataNewBankApprove = React.lazy(() =>
    import("./data-new-bank/DataNewBankApprove")
);
const DataNewBankReject = React.lazy(() =>
    import("./data-new-bank/DataNewBankReject")
);

const DataEditEmail = React.lazy(() => import("./data-edit-email/DataNewEmail"));
const DataEditEmailApprove = React.lazy(() =>
    import("./data-edit-email/DataNewEmailApprove")
);
const DataEditEmailReject = React.lazy(() =>
    import("./data-edit-email/DataNewEmailReject")
)
const DetailSetoran = React.lazy(() =>
    import("./data-setoran/DetailSetoran")
);
const getBasename = () => {
    return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};

// const getBasename = path => path.substr(0, path.lastIndexOf('/'));
const firebaseConfig = {
    apiKey: "AIzaSyB5PTUFKw7Rrdzw0jVEfnvEgf33BFlsk4I",
    authDomain: "magnetfx-5a6ac.firebaseapp.com",
    projectId: "magnetfx-5a6ac",
    storageBucket: "magnetfx-5a6ac.appspot.com",
    messagingSenderId: "321695921297",
    appId: "1:321695921297:web:f11615c0eedffd62f57b30",
    measurementId: "G-FQZ86N2RR7",
};
const fapp = initializeApp(firebaseConfig);
const messaging = getMessaging(fapp);

class App extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            title: "",
            body: "",
            type: "",
        };
        this.state = {
            selected: this.initSelected,
            showNotif: false,
        };
        this.openPushNotification = this.openPushNotification.bind(this);
    }

    componentDidMount() {
        this.resetUI();
    }

    resetUI = () => {
        getToken(messaging, {
            vapidKey:
                "BPeV3TmWNbAqs0QcRT3t8b2t-3R1GXbBdgENXHihg_Kq01D_OKFQ1a94vGmAvA19ueavdLvh4ILdttSNaJIFtz0",
        })
            .then((currentToken) => {
                if (currentToken) {
                    localStorage.setItem("mbo_token_fcm_", currentToken);
                    console.log(currentToken);
                } else {
                    // Show permission request UI
                    this.requestPermission();
                    console.log(
                        "No registration token available. Request permission to generate one."
                    );
                }
            })
            .catch((err) => {
                this.requestPermission();
                console.log("An error occurred while retrieving token. ", err);
            });

        onMessage(messaging, (payload) => {
            const notificationOptions = {
                title: payload.notification.title,
                body: payload.notification.body,
                type: payload.data.type,
            };
            this.setState({
                selected: notificationOptions,
                showNotif: true,
            });
            return setTimeout(
                function () {
                    this.setState({showNotif: false});
                }.bind(this),
                3500
            );
        });
    };

    requestPermission = () => {
        console.log("Requesting permission...");
        localStorage.removeItem("mbo_token_fcm_");
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
                this.resetUI();
            } else {
                console.log("Unable to get permission to notify.");
            }
        });
    };

    openPushNotification = (dt, closedt) => {
        if (dt && closedt === 0) {
            const basename = getBasename(window.location.pathname);
            const to =
                dt === "1"
                    ? "/data-user-cabinet"
                    : dt === "2"
                        ? "/data-setoran"
                        : dt === "3"
                            ? "/data-penarikan"
                            : "";
            window.location.href = basename + "" + to;
        }
        this.setState({showNotif: false});
    };

    render() {
        const {selected, showNotif} = this.state;
        console.log(this.state);
        return (
            <Fragment>
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    style={{
                        position: "relative",
                        minHeight: "100px",
                    }}
                >
                    <Router basename={getBasename(window.location.pathname)}>
                        <Switch>
                            <PublicRoute exact path="/login">
                                <Login/>
                            </PublicRoute>

                            <ProtectedRoute path="/">
                                <Main>
                                    <React.Suspense fallback={<PageLoading/>}>
                                        <Switch>
                                            <Route exact path="/" component={Dashboard}/>
                                            <Route exact path="/data-user" component={DataUser}/>
                                            <Route exact path="/data-role" component={DataRole}/>
                                            <Route exact path="/detail-role" component={DetailRole}/>
                                            <Route exact path="/data-bank" component={DataBank}/>
                                            <Route exact path="/home_banner" component={DataBanner}/>
                                            <Route
                                                exact
                                                path="/trading_di_magnet"
                                                component={DataBannerHomeTradingMagnet}
                                            />
                                            <Route
                                                exact
                                                path="/teknologi_trading"
                                                component={DataBannerHomeTeknologiTrading}
                                            />
                                            <Route
                                                exact
                                                path="/banner_market_forex"
                                                component={DataBannerForex}
                                            />
                                            <Route
                                                exact
                                                path="/trading_forex_magnet"
                                                component={DataBannerForexTrading}
                                            />
                                            <Route
                                                exact
                                                path="/siap_cuan_forex"
                                                component={DataBannerForexCuan}
                                            />
                                            <Route
                                                exact
                                                path="/banner_market_commodities"
                                                component={DataBannerCommodities}
                                            />
                                            <Route
                                                exact
                                                path="/trading_commodities_magnet"
                                                component={DataBannerCommoditiesTrading}
                                            />
                                            <Route
                                                exact
                                                path="/siap_cuan_commodities"
                                                component={DataBannerCommoditiesCuan}
                                            />
                                            <Route
                                                exact
                                                path="/banner_market_indicies"
                                                component={DataBannerIndicies}
                                            />
                                            <Route
                                                exact
                                                path="/trading_indicies_magnet"
                                                component={DataBannerIndiciesTrading}
                                            />
                                            <Route
                                                exact
                                                path="/siap_cuan_indicies"
                                                component={DataBannerIndiciesCuan}
                                            />
                                            <Route
                                                exact
                                                path="/banner_market_metal"
                                                component={DataBannerMetal}
                                            />
                                            <Route
                                                exact
                                                path="/trading_metal_magnet"
                                                component={DataBannerMetalTrading}
                                            />
                                            <Route
                                                exact
                                                path="/siap_cuan_metal"
                                                component={DataBannerMetalCuan}
                                            />
                                            <Route
                                                exact
                                                path="/metatrader5"
                                                component={DataBannerMetatrader5}
                                            />
                                            <Route
                                                exact
                                                path="/benefit_user_metatrader5"
                                                component={DataBannerMetatrader5Benefit}
                                            />
                                            <Route
                                                exact
                                                path="/pengguna_metatrader5"
                                                component={DataBannerMetatrader5Pengguna}
                                            />
                                            <Route
                                                exact
                                                path="/key_benefit_metatrader5"
                                                component={DataBannerMetatrader5Key}
                                            />
                                            <Route
                                                exact
                                                path="/our_company"
                                                component={DataBannerCompany}
                                            />
                                            <Route
                                                exact
                                                path="/benefit_company"
                                                component={DataBannerCompanyBenefit}
                                            />
                                            <Route
                                                exact
                                                path="/siap_cuan_company"
                                                component={DataBannerCompanyCuan}
                                            />
                                            <Route exact path="/add-banner" component={FrmBanner}/>
                                            <Route exact path="/data-negara" component={DataNegara}/>
                                            <Route
                                                exact
                                                path="/data-provinsi"
                                                component={DataProvinsi}
                                            />
                                            <Route exact path="/data-kota" component={DataKota}/>
                                            <Route exact path="/data-cabang" component={DataCabang}/>
                                            <Route exact path="/data-rate" component={DataRate}/>
                                            <Route
                                                exact
                                                path="/data-setting"
                                                component={DataSetting}
                                            />
                                            <Route
                                                exact
                                                path="/data-del-bank"
                                                component={DataDelBank}
                                            />
                                            <Route
                                                exact
                                                path="/data-del-bank-approve"
                                                component={DataDelBankApprove}
                                            />
                                            <Route
                                                exact
                                                path="/data-del-bank-reject"
                                                component={DataDelBankReject}
                                            />
                                            <Route
                                                exact
                                                path="/data-new-bank"
                                                component={DataNewBank}
                                            />
                                            <Route
                                                exact
                                                path="/data-new-bank-approve"
                                                component={DataNewBankApprove}
                                            />
                                            <Route
                                                exact
                                                path="/data-new-bank-reject"
                                                component={DataNewBankReject}
                                            />
                                            <Route
                                                exact
                                                path="/data-edit-email"
                                                component={DataEditEmail}
                                            />
                                            <Route
                                                exact
                                                path="/data-edit-email-approve"
                                                component={DataEditEmailApprove}
                                            />
                                            <Route
                                                exact
                                                path="/data-edit-email-reject"
                                                component={DataEditEmailReject}
                                            />
                                            <Route
                                                exact
                                                path="/data-tipe-akun"
                                                component={DataTipeAkun}
                                            />
                                            <Route
                                                exact
                                                path="/data-akun-terpisah"
                                                component={DataAkunTerpisah}
                                            />
                                            <Route
                                                exact
                                                path="/data-ref-code"
                                                component={DataRefCode}
                                            />
                                            <Route
                                                exact
                                                path="/data-susunan-saham"
                                                component={DataSusunanSaham}
                                            />
                                            <Route
                                                exact
                                                path="/data-susunan-pengurus"
                                                component={DataSusunanPengurus}
                                            />
                                            <Route
                                                exact
                                                path="/data-profile-perusahaan"
                                                component={DataProfilePerusahaan}
                                            />
                                            <Route
                                                exact
                                                path="/data-legalitas-perusahaan"
                                                component={DataLegalitasPerusahaan}
                                            />
                                            <Route
                                                exact
                                                path="/data-user-cabinet"
                                                component={DataUserCabinet}
                                            />
                                            <Route
                                                exact
                                                path="/detail-user-cabinet"
                                                component={DetailUserCabinet}
                                            />
                                            <Route
                                                exact
                                                path="/data-setoran"
                                                component={DataSetoran}
                                            />
                                            <Route
                                                exact
                                                path="/detail-setoran"
                                                component={DetailSetoran}
                                            />
                                            <Route
                                                exact
                                                path="/data-setoran-approve"
                                                component={DataSetoranApprove}
                                            />
                                            <Route
                                                exact
                                                path="/data-setoran-reject"
                                                component={DataSetoranReject}
                                            />
                                            <Route
                                                exact
                                                path="/data-bank-perusahaan"
                                                component={DataBankPerusahaan}
                                            />
                                            <Route
                                                exact
                                                path="/data-contact-us"
                                                component={DataContact}
                                            />
                                            <Route
                                                exact
                                                path="/data-akun-demo"
                                                component={DataAkunDemo}
                                            />
                                            <Route
                                                exact
                                                path="/data-template-email"
                                                component={DataTemplateEmail}
                                            />
                                            <Route
                                                exact
                                                path="/edit-template-email"
                                                component={FrmTemplateEmail}
                                            />
                                            {/* <Route
                    exact
                    path="/data-penarikan"
                    component={DataPenarikan}
                  /> */}
                                            <Route
                                                exact
                                                path="/data-penarikan-approve"
                                                component={DataPenarikanApprove}
                                            />
                                            {/* <Route
                    exact
                    path="/data-penarikan-reject"
                    component={DataPenarikanReject}
                  /> */}
                                            <Route
                                                exact
                                                path="/data-artikel-education"
                                                component={DataEducation}
                                            />
                                            <Route
                                                exact
                                                path="/data-artikel-news"
                                                component={DataNews}
                                            />
                                            <Route
                                                exact
                                                path="/data-artikel-blog"
                                                component={DataBlog}
                                            />
                                            <Route exact path="/add-artikel" component={FrmArtikel}/>
                                            <Route
                                                exact
                                                path="/data-list-approve"
                                                component={DataListApprove}
                                            />
                                            <Route
                                                exact
                                                path="/detail-list-approve"
                                                component={DetailUserListAppr}
                                            />
                                            <Route
                                                exact
                                                path="/data-transfer"
                                                component={DataTransfer}
                                            />
                                            <Route exact path="*" component={NotFound}/>
                                        </Switch>
                                    </React.Suspense>

                                    <Toast
                                        onClick={(e) => this.openPushNotification(selected.type, 0)}
                                        show={showNotif}
                                        autohide={true}
                                        animation={true}
                                        delay={3000}
                                        style={{
                                            cursor: "pointer",
                                            position: "absolute",
                                            bottom: "5%",
                                            right: "1%",
                                            zIndex: 1,
                                        }}
                                    >
                                        <Toast.Header
                                            onClose={() =>
                                                this.openPushNotification(selected.type, 1)
                                            }
                                        >
                                            <strong className="mr-auto">{selected.title}</strong>
                                        </Toast.Header>
                                        <Toast.Body
                                            style={{
                                                backgroundColor: "#e2e3e5",
                                            }}
                                        >
                                            {selected.body}
                                        </Toast.Body>
                                    </Toast>
                                </Main>
                            </ProtectedRoute>
                            <Redirect from="*" to="/"/>
                            {/* <Route component={Main} /> */}
                        </Switch>
                    </Router>
                </div>
            </Fragment>
        );
    }
}

export default App;
