import React from "react";

import {NavLink,} from "react-router-dom";
// import { FaList, FaGripHorizontal } from "react-icons/fa";
import {BsCardList, BsFillPersonLinesFill, BsHouseFill} from "react-icons/bs";
import {connect} from "react-redux";

const MenuSidebar = ({menuCollapse, allowedMenu}) => {
    // const location = useLocation();
    // const lastPathName = location.pathname.replace("/", "");


    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary">
                {/* Brand Logo */}
                <NavLink to="/" className="brand-link text-center">
          <span className="brand">
            <strong>{menuCollapse ? "ADM" : "Admin Magnet"}</strong>
          </span>
                </NavLink>
                <div className="sidebar">
                    <nav
                        className="mt-2  vh-100 overflow-auto"
                        style={{marginTop: "1rem!important"}}
                    >
                        <ul
                            className="nav nav-pills nav-sidebar text-sm "
                            data-widget="treeview"
                            role="menu"
                            data-accordion="true"
                        >
                            {allowedMenu && allowedMenu.dashboard_view ? (
                                <li className="nav-item">
                                    <NavLink exact={true} to="/" className="nav-link nav-custom">
                                        <BsHouseFill className="nav-icon"/>
                                        <p>Dashboard</p>
                                    </NavLink>
                                </li>
                            ) : (
                                ""
                            )}

                            {allowedMenu && allowedMenu.users_view ? (
                                <li className="nav-item">
                                    <NavLink
                                        to="/data-user-cabinet"
                                        className="nav-link nav-custom"
                                    >
                                        <BsFillPersonLinesFill className="nav-icon"/>
                                        <p>List Users</p>
                                    </NavLink>
                                </li>
                            ) : (
                                ""
                            )}
                            {allowedMenu && allowedMenu.data_transfer_view ? (
                                <li className="nav-item">
                                    <NavLink to="/data-transfer" className="nav-link nav-custom">
                                        <BsFillPersonLinesFill className="nav-icon"/>
                                        <p>Data Internal Transfer</p>
                                    </NavLink>
                                </li>
                            ) : (
                                ""
                            )}
                            {allowedMenu && allowedMenu.data_list_approve_view ? (
                                <li className="nav-item">
                                    <NavLink
                                        to="/data-list-approve"
                                        className="nav-link nav-custom"
                                    >
                                        <BsFillPersonLinesFill className="nav-icon"/>
                                        <p>Data Request Account</p>
                                    </NavLink>
                                </li>
                            ) : (
                                ""
                            )}

                            {allowedMenu &&
                            (allowedMenu.data_setoran_waiting_approve_view ||
                                allowedMenu.data_setoran_approved_view ||
                                allowedMenu.data_setoran_rejected_view) ? (
                                <li className="nav-item">
                                    <a
                                        href="#dataSetoran"
                                        data-toggle="collapse"
                                        aria-expanded="false"
                                        className="nav-link nav-custom"
                                    >
                                        <BsCardList className="nav-icon"/>
                                        <p className="dropdown-toggle">Data Setoran</p>
                                    </a>
                                    <ul className="collapse list-unstyled" id="dataSetoran">
                                        {allowedMenu.data_setoran_waiting_approve_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-setoran"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Waiting Approve</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu.data_setoran_approved_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-setoran-approve"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Approved</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu.data_setoran_rejected_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-setoran-reject"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Rejected</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                    </ul>
                                </li>
                            ) : (
                                ""
                            )}

                            {allowedMenu && allowedMenu.data_transfer_dana_approved_view ? (
                                <li className="nav-item">
                                    <a
                                        href="#dataPenarikan"
                                        data-toggle="collapse"
                                        aria-expanded="false"
                                        className="nav-link nav-custom"
                                    >
                                        <BsCardList className="nav-icon"/>
                                        <p className="dropdown-toggle">Data Transfer Dana</p>
                                    </a>
                                    <ul className="collapse list-unstyled" id="dataPenarikan">
                                        {/* <li className="nav-item">
                                        <NavLink
                                            to='/data-penarikan'
                                            className="nav-link nav-custom">
                                            &nbsp;&nbsp;
                                            <BsCardList className="nav-icon" />
                                            <p>Waiting Approve</p>
                                        </NavLink>
                                    </li> */}
                                        <li className="nav-item">
                                            <NavLink
                                                to="/data-penarikan-approve"
                                                className="nav-link nav-custom"
                                            >
                                                &nbsp;&nbsp;
                                                <BsCardList className="nav-icon"/>
                                                <p>Approved</p>
                                            </NavLink>
                                        </li>

                                        {/*  <li className="nav-item">
                                        <NavLink
                                            to='/data-penarikan-reject'
                                            className="nav-link nav-custom">
                                            &nbsp;&nbsp;
                                            <BsCardList className="nav-icon" />
                                            <p>Rejected</p>
                                        </NavLink>
                                    </li> */}
                                    </ul>
                                </li>
                            ) : (
                                ""
                            )}

                            {allowedMenu &&
                            (allowedMenu.data_new_akun_bank_approved_view ||
                                allowedMenu.data_new_akun_bank_rejected_view ||
                                allowedMenu.data_new_akun_bank_waiting_approve_view) ? (
                                <li className="nav-item">
                                    <a
                                        href="#dataNewBank"
                                        data-toggle="collapse"
                                        aria-expanded="false"
                                        className="nav-link nav-custom"
                                    >
                                        <BsCardList className="nav-icon"/>
                                        <p className="dropdown-toggle">Data New Akun Bank</p>
                                    </a>
                                    <ul className="collapse list-unstyled" id="dataNewBank">
                                        {allowedMenu.data_new_akun_bank_waiting_approve_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-new-bank"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Waiting Approve</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu.data_new_akun_bank_approved_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-new-bank-approve"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Approved</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu.data_new_akun_bank_rejected_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-new-bank-reject"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Rejected</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                    </ul>
                                </li>
                            ) : (
                                ""
                            )}

                            <li className="nav-item">
                                <a
                                    href="#dataEditEmail"
                                    data-toggle="collapse"
                                    aria-expanded="false"
                                    className="nav-link nav-custom"
                                >
                                    <BsCardList className="nav-icon"/>
                                    <p className="dropdown-toggle">Data Edit Email</p>
                                </a>
                                <ul className="collapse list-unstyled" id="dataEditEmail">
                                    <li className="nav-item">
                                        <NavLink
                                            to="/data-edit-email"
                                            className="nav-link nav-custom"
                                        >
                                            &nbsp;&nbsp;
                                            <BsCardList className="nav-icon"/>
                                            <p>Waiting Approve</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/data-edit-email-approve"
                                            className="nav-link nav-custom"
                                        >
                                            &nbsp;&nbsp;
                                            <BsCardList className="nav-icon"/>
                                            <p>Approved</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/data-edit-email-reject"
                                            className="nav-link nav-custom"
                                        >
                                            &nbsp;&nbsp;
                                            <BsCardList className="nav-icon"/>
                                            <p>Rejected</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            {allowedMenu &&
                            (allowedMenu.data_delete_akun_bank_approved_view ||
                                allowedMenu.data_delete_akun_bank_rejected_view ||
                                allowedMenu.data_delete_akun_bank_waiting_approve_view) ? (
                                <li className="nav-item">
                                    <a
                                        href="#dataDelBank"
                                        data-toggle="collapse"
                                        aria-expanded="false"
                                        className="nav-link nav-custom"
                                    >
                                        <BsCardList className="nav-icon"/>
                                        <p className="dropdown-toggle">Data Delete Akun Bank</p>
                                    </a>
                                    <ul className="collapse list-unstyled" id="dataDelBank">
                                        {allowedMenu.data_delete_akun_bank_waiting_approve_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-del-bank"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Waiting Approve</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu.data_delete_akun_bank_approved_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-del-bank-approve"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Approved</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu.data_delete_akun_bank_rejected_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-del-bank-reject"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Rejected</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                    </ul>
                                </li>
                            ) : (
                                ""
                            )}

                            {/*  <li className="nav-item">
                <a
                  href="#dataBannerHome"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="nav-link nav-custom"
                >
                  <BsCardList className="nav-icon" />
                  <p className="dropdown-toggle"> Home </p>
                </a>
                <ul className="collapse list-unstyled" id="dataBannerHome">
                  <li className="nav-item">
                    <NavLink to="/home_banner" className="nav-link nav-custom">
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Banner Home</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/trading_di_magnet"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Trading di Magnet</p>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/teknologi_trading"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Teknologi Trading</p>
                    </NavLink>
                  </li>
                </ul>
              </li>*/}

                            {/* <li className="nav-item">
                <a
                  href="#dataBannerMarketForex"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="nav-link nav-custom"
                >
                  <BsCardList className="nav-icon" />
                  <p className="dropdown-toggle">Market Forex</p>
                </a>
                <ul
                  className="collapse list-unstyled"
                  id="dataBannerMarketForex"
                >
                  <li className="nav-item">
                    <NavLink
                      to="/banner_market_forex"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Banner Market Forex</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/trading_forex_magnet"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Trading Forex Magnet</p>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/siap_cuan_forex"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Siap Cuan Forex</p>
                    </NavLink>
                  </li>
                </ul>
              </li>*/}

                            {/*  <li className="nav-item">
                <a
                  href="#dataBannerMarketCommodities"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="nav-link nav-custom"
                >
                  <BsCardList className="nav-icon" />
                  <p className="dropdown-toggle">Market Commodities</p>
                </a>
                <ul
                  className="collapse list-unstyled"
                  id="dataBannerMarketCommodities"
                >
                  <li className="nav-item">
                    <NavLink
                      to="/banner_market_commodities"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Banner Market Commodities</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/trading_commodities_magnet"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Trading Commodities</p>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/siap_cuan_commodities"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Siap Cuan Commodities</p>
                    </NavLink>
                  </li>
                </ul>
              </li>*/}

                            {/*<li className="nav-item">
                <a
                  href="#dataBannerMarketIndicies"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="nav-link nav-custom"
                >
                  <BsCardList className="nav-icon" />
                  <p className="dropdown-toggle">Market Indicies</p>
                </a>
                <ul
                  className="collapse list-unstyled"
                  id="dataBannerMarketIndicies"
                >
                  <li className="nav-item">
                    <NavLink
                      to="/banner_market_indicies"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Banner Market Indicies</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/trading_indicies_magnet"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Trading Indicies</p>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/siap_cuan_indicies"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Siap Cuan Indicies</p>
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a
                  href="#dataBannerMarketMetal"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="nav-link nav-custom"
                >
                  <BsCardList className="nav-icon" />
                  <p className="dropdown-toggle">Market Metal</p>
                </a>
                <ul
                  className="collapse list-unstyled"
                  id="dataBannerMarketMetal"
                >
                  <li className="nav-item">
                    <NavLink
                      to="/banner_market_metal"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Banner Market Metal</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/trading_metal_magnet"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Trading Market Metal</p>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/siap_cuan_metal"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Siap Cuan Market Metal</p>
                    </NavLink>
                  </li>
                </ul>
              </li>*/}

                            {/*<li className="nav-item">
                <a
                  href="#dataBannerMetatrader5"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="nav-link nav-custom"
                >
                  <BsCardList className="nav-icon" />
                  <p className="dropdown-toggle">Metatrader 5</p>
                </a>
                <ul
                  className="collapse list-unstyled"
                  id="dataBannerMetatrader5"
                >
                  <li className="nav-item">
                    <NavLink to="/metatrader5" className="nav-link nav-custom">
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Banner Metatrader 5</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/benefit_user_metatrader5"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Benefit Metatrader 5</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/pengguna_metatrader5"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Pengguna Metatrader 5</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/key_benefit_metatrader5"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Key Benefit Metatrader 5</p>
                    </NavLink>
                  </li>
                </ul>
              </li>*/}

                            {/* <li className="nav-item">
                <a
                  href="#dataBannerOurCompany"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="nav-link nav-custom"
                >
                  <BsCardList className="nav-icon" />
                  <p className="dropdown-toggle">Our Company</p>
                </a>
                <ul
                  className="collapse list-unstyled"
                  id="dataBannerOurCompany"
                >
                  <li className="nav-item">
                    <NavLink to="/our_company" className="nav-link nav-custom">
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Banner Our Company</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/benefit_company"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Benefit Our Company</p>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/siap_cuan_company"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Siap Cuan our_company</p>
                    </NavLink>
                  </li>
                </ul>
              </li>*/}

                            {/*<li className="nav-item">
                <a
                  href="#dataArtikel"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="nav-link nav-custom"
                >
                  <BsCardList className="nav-icon" />
                  <p className="dropdown-toggle">Data Artikel</p>
                </a>
                <ul className="collapse list-unstyled" id="dataArtikel">
                  <li className="nav-item">
                    <NavLink
                      to="/data-artikel-education"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Education</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/data-artikel-news"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>News</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/data-artikel-blog"
                      className="nav-link nav-custom"
                    >
                      &nbsp;&nbsp;
                      <BsCardList className="nav-icon" />
                      <p>Blog</p>
                    </NavLink>
                  </li>
                </ul>
              </li>*/}

                            {allowedMenu &&
                            (allowedMenu.data_role_view ||
                                allowedMenu.data_user_admin_view ||
                                allowedMenu.bank_view ||
                                allowedMenu.negara_view ||
                                allowedMenu.provinsi_view ||
                                allowedMenu.kota_view ||
                                allowedMenu.cabang_view ||
                                allowedMenu.data_rate_view ||
                                allowedMenu.setting_view ||
                                allowedMenu.tipe_akun_view ||
                                allowedMenu.ref_code_view ||
                                allowedMenu.akun_terpisah_view) ? (
                                <li className="nav-item">
                                    <a
                                        href="#pageSubmenu"
                                        data-toggle="collapse"
                                        aria-expanded="false"
                                        className="nav-link nav-custom"
                                    >
                                        <BsCardList className="nav-icon"/>
                                        <p className="dropdown-toggle">Master Data</p>
                                    </a>
                                    <ul className="collapse list-unstyled" id="pageSubmenu">
                                        {allowedMenu && allowedMenu.data_user_admin_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-user"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsFillPersonLinesFill className="nav-icon"/>
                                                    <p>Data User Admin</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.data_role_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-role"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Data Role</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.bank_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-bank"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Bank</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.negara_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-negara"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Negara</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.provinsi_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-provinsi"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Provinsi</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.kota_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-kota"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Kota</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.cabang_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-cabang"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Cabang</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.data_rate_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-rate"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Data Rate</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.setting_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-setting"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Setting</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.tipe_akun_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-tipe-akun"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Tipe Akun</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.ref_code_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-ref-code"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Ref Code</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.akun_terpisah_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-akun-terpisah"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Akun Terpisah</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                    </ul>
                                </li>
                            ) : (
                                ""
                            )}

                            {allowedMenu &&
                            (allowedMenu.susunan_pengurus_view ||
                                allowedMenu.susunan_saham_view ||
                                allowedMenu.profile_perusahaan_view ||
                                allowedMenu.legalitas_perusahaan_view ||
                                allowedMenu.bank_perusahaan_view) ? (
                                <li className="nav-item">
                                    <a
                                        href="#dataPerusahaan"
                                        data-toggle="collapse"
                                        aria-expanded="false"
                                        className="nav-link nav-custom"
                                    >
                                        <BsCardList className="nav-icon"/>
                                        <p className="dropdown-toggle">Data Perusahaan</p>
                                    </a>
                                    <ul className="collapse list-unstyled" id="dataPerusahaan">
                                        {allowedMenu && allowedMenu.susunan_pengurus_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-susunan-pengurus"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Susunan Pengurus</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.susunan_saham_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-susunan-saham"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Susunan Saham</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.profile_perusahaan_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-profile-perusahaan"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Profile Perusahaan</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.legalitas_perusahaan_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-legalitas-perusahaan"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Legalitas Perusahaan</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {allowedMenu && allowedMenu.bank_perusahaan_view ? (
                                            <li className="nav-item">
                                                <NavLink
                                                    to="/data-bank-perusahaan"
                                                    className="nav-link nav-custom"
                                                >
                                                    &nbsp;&nbsp;
                                                    <BsCardList className="nav-icon"/>
                                                    <p>Bank Perusahaan</p>
                                                </NavLink>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                    </ul>
                                </li>
                            ) : (
                                ""
                            )}
                            {allowedMenu && allowedMenu.data_contact_us_view ? (
                                <li className="nav-item">
                                    <NavLink
                                        to="/data-contact-us"
                                        className="nav-link nav-custom"
                                    >
                                        <BsCardList className="nav-icon"/>
                                        <p>Data Contact us</p>
                                    </NavLink>
                                </li>
                            ) : (
                                ""
                            )}
                            {allowedMenu && allowedMenu.data_akun_demo_view ? (
                                <li className="nav-item">
                                    <NavLink to="/data-akun-demo" className="nav-link nav-custom">
                                        <BsCardList className="nav-icon"/>
                                        <p>Data Akun Demo</p>
                                    </NavLink>
                                </li>
                            ) : (
                                ""
                            )}
                            {allowedMenu && allowedMenu.data_template_email_view ? (
                                <li className="nav-item">
                                    <NavLink
                                        to="/data-template-email"
                                        className="nav-link nav-custom"
                                    >
                                        <BsCardList className="nav-icon"/>
                                        <p>Data Template Email</p>
                                    </NavLink>
                                </li>
                            ) : (
                                ""
                            )}
                            {/*
                            <li className="nav-item">
                                <NavLink
                                    to='/setting'
                                    className="nav-link nav-custom">
                                    <BsGearFill className="nav-icon" />
                                    <p>Settings</p>
                                </NavLink>
                            </li> */}
                        </ul>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </nav>
                </div>
            </aside>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.currentUser,
    allowedMenu: state.auth.allowedMenu,
});
export default connect(mapStateToProps, "")(MenuSidebar);
