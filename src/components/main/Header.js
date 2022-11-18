import React, {useEffect, useState} from 'react'
import {Link, NavLink, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from "axios";
import moment from 'moment';
import "moment/locale/id";

const API_URL = process.env.REACT_APP_URL_API;
const CryptoJS = require("crypto-js");
const secretKey = process.env.REACT_APP_SECRET_KEY;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

const Header = ({toggleMenuSidebar, user, onUserLogout}) => {
    const [notifList, setNotifList] = useState([]);
    const [cntRead, setCntRead] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const getNotifikasi = async () => {
            const token = localStorage.getItem(tokenLogin);
            const dt = CryptoJS.AES.decrypt(token, secretKey);
            const dt_res = dt.toString(CryptoJS.enc.Utf8);
            const _dt = dt_res.split('Þ');
            var res = {accessToken: token};

            await axios.get(API_URL + "/back-office/notifikasi", {
                headers: {
                    'x-app-origin': 'backoffice-app',
                    'Authorization': 'Bearer ' + _dt[0]
                }
            })
                .then(response => {
                    if (response.data.error_message === 0) {
                        setCntRead(response.data.read);
                        setNotifList(response.data.payload);
                    }
                }).catch(error => {
                    console.log(error);
                });

        };
        getNotifikasi();
        const interval = setInterval(() => {
            getNotifikasi();
        }, 15000);
        return () => clearInterval(interval);

    }, []);


    const logOut = (event) => {
        event.preventDefault();
        onUserLogout();
        history.push('/login');
    };

    async function detailUser(event, notif) {
        event.preventDefault();
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("setor_id");
        if (notif.read === '0' || notif.read === 0) await readNotifikasi(notif.id);
        if (notif.msg_type === 1) {
            sessionStorage.setItem('user_id', notif.created_by);
            sessionStorage.setItem('data_tipe_akun_id', notif.id_transaksi);
            window.location.href = "/admin-magnet/detail-user-cabinet";
        }
        if (notif.msg_type === 2) {
            await sessionStorage.setItem("setor_id", notif.id_transaksi);
            window.location.href = "/admin-magnet/detail-setoran";
        }
        if (notif.msg_type === 3) {
            history.push('/data-penarikan-approve');
        }
        if (notif.msg_type === 4) {
            history.push('/data-new-bank');
        }
        if (notif.msg_type === 5) {
            history.push('/data-del-bank');
        }
        if (notif.msg_type === 6) {
            history.push('/data-contact-us');
        }
        if (notif.msg_type === 7) {
            history.push('/data-edit-email');
        }
    }

    const readNotifikasi = async (id) => {
        const token = localStorage.getItem(tokenLogin);
        const dt = CryptoJS.AES.decrypt(token, secretKey);
        const dt_res = dt.toString(CryptoJS.enc.Utf8);
        const _dt = dt_res.split('Þ');
        var res = {accessToken: token};

        await axios.get(API_URL + "/back-office/read-notifikasi/" + id, {
            headers: {
                'x-app-origin': 'backoffice-app',
                'Authorization': 'Bearer ' + _dt[0]
            }
        })
            .then(response => {
                if (response.data.error_message === 0) {
                    setCntRead(response.data.read);
                    setNotifList(response.data.payload);
                }
            }).catch(error => {
                console.log(error);
            });

    };


    return (

        <nav className="main-header navbar navbar-expand navbar-dark navbar-primary text-sm border-bottom-0">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="#" className="nav-link" onClick={toggleMenuSidebar} data-widget="pushmenu"
                             role="button">
                        <i className="fas fa-bars"/>
                    </NavLink>

                </li>


            </ul>

            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown notifications-menu" style={{paddingRight: '20px!important'}}>
                    <NavLink

                        to="#"
                        type="button"
                        className="nav-link"
                        data-toggle="dropdown">
                        <i className="fa fa-bell"/>
                        {cntRead === '0' || cntRead === 0 && <span class="icon-button__badge"></span>}
                    </NavLink>

                    <div className="dropdown-menu dropdown-menu-notifications">
                        {notifList ? notifList.map((notif, i) =>


                            <Link
                                key={notif.id}
                                onClick={(e) => detailUser(e, notif)}
                                to={notif.msg_type === 1 ? '/detail-user-cabinet' : notif.msg_type === 2 ? '/data-setoran' : notif.msg_type === 3 ? '/data-penarikan-approve' : notif.msg_type === 7 ? '/data-edit-email' : notif.msg_type === 6 ? '/data-contact-us' : notif.msg_type === 5 ? '/data-del-bank' : ''}
                                className={notif.read === '0' || notif.read === 0 ? "dropdown-item dropdown-item-notifications msg_bold" : "dropdown-item dropdown-item-notifications"}>
                                {notif.message}<br/>
                                <small><i
                                    className="fa fa-clock"></i> {moment(new Date(notif.created_at)).format('DD-MM-YYYY HH:mm')}
                                </small>
                            </Link>) : <Link
                            to="#"
                            className="dropdown-item dropdown-item-notifications">
                            Tidak ada pesan
                        </Link>}


                    </div>
                </li>

                <li className="nav-item dropdown">
                    <NavLink
                        to="#"
                        type="button"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown">
                        <i className="far fa-user"/> {user.name ? (user.name) : ("Logout")}
                    </NavLink>

                    <div className="dropdown-menu">
                        <Link
                            to="/"
                            onClick={logOut}
                            className="dropdown-item">
                            <i className="fa fa-sign-out-alt"></i> Logout
                        </Link>

                    </div>
                </li>
            </ul>
        </nav>
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    onUserLogout: () => dispatch({type: "LOGOUT_USER"})
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);