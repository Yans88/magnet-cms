import React, {Component} from 'react'
import {Alert, Col, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import AppButton from '../components/button/Button';
import Loading from '../components/loading/MyLoading';
// import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {AppSwalSuccess} from '../components/modal/SwalSuccess';
import {addData, addDataSuccess, chgProps, fetchData} from './dataLegalitasPerusahaanService';
import {GetProfileAdmin} from '../components/login/LoginService';

class DataLegalitasPerusahaan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errMsg: {email: '', perusahaan: ''},
        };
    }

    componentDidMount = async () => {
        const response = await GetProfileAdmin();
        if (response.accessToken === null) {
            this.props.history.push("login");
        }
        this.props.onLoad();
    }

    handleChange(evt) {
        this.setState({errMsg: {email: ''}});
        const name = evt.target.name;
        var value = evt.target.value;
        const dt = {};
        dt['key'] = name;
        dt['value'] = value;
        this.props.changeProps(dt);
    }

    handleChangeDesk(name, value) {
        const dt = {};
        dt['key'] = name;
        dt['value'] = value;
        this.props.changeProps(dt);
    }

    handleSubmit() {
        var errors = this.state.errMsg;
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        //console.log(this.props.data.send_mail);
        if (this.props.data.send_mail) {
            if (!pattern.test(this.props.data.send_mail)) {
                errors.email = "Please enter valid email address";
            }
        }

        this.setState({errors});
        if (this.validateForm(this.state.errMsg)) {
            this.props.onAdd(this.props.data);
        } else {
            console.error('Invalid Form')
        }

    }

    validateForm(errors) {

        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    closeSwal() {
        this.props.closeSwal();
    }

    render() {
        const {data, allowedMenu} = this.props;
        const {errMsg} = this.state;
        return (

            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Legalitas Perusahaan</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    {this.props.isLoading ? (<Loading/>) :
                                        (
                                            <div className="card shadow-lg">
                                                <Form>
                                                    <div className="card-body my-card-body">

                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="nomer_izin_bappebti">
                                                                {errMsg.nomer_izin_bappebti ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.nomer_izin_bappebti}
                                                                    </span>) : ''}
                                                                <Form.Label>NOMOR IZIN USAHA BAPPEBTI</Form.Label>
                                                                <Form.Control
                                                                    value={data.nomer_izin_bappebti}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="nomer_izin_bappebti"
                                                                    type="text"
                                                                    placeholder="NOMOR IZIN USAHA BAPPEBTI"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="nomer_anggota_bkdi">
                                                                {errMsg.nomer_anggota_bkdi ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.nomer_anggota_bkdi}
                                                                    </span>) : ''}
                                                                <Form.Label>NOMOR KEANGGOTAAN BKDI</Form.Label>
                                                                <Form.Control
                                                                    value={data.nomer_anggota_bkdi}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="nomer_anggota_bkdi"
                                                                    type="text"
                                                                    placeholder="NOMOR KEANGGOTAAN BKDI"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="nomer_anggota_ich">
                                                                {errMsg.nomer_anggota_ich ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.nomer_anggota_ich}
                                                                    </span>) : ''}
                                                                <Form.Label>NOMOR KEANGGOTAAN ICH</Form.Label>
                                                                <Form.Control
                                                                    value={data.nomer_anggota_ich}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="nomer_anggota_ich"
                                                                    type="text"
                                                                    placeholder="NOMOR KEANGGOTAAN ICH"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6}
                                                                        controlId="perdagangan_alternatif">
                                                                {errMsg.perdagangan_alternatif ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.perdagangan_alternatif}
                                                                    </span>) : ''}
                                                                <Form.Label>NOMOR DAN TANGGAL PERSETUJUAN PESERTA
                                                                    PERDAGANGAN ALTERNATIF</Form.Label>
                                                                <Form.Control
                                                                    value={data.perdagangan_alternatif}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="perdagangan_alternatif"
                                                                    type="text"
                                                                    placeholder="NOMOR DAN TANGGAL PERSETUJUAN PESERTA PERDAGANGAN ALTERNATIF"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="nama_penyelenggara">
                                                                {errMsg.nama_penyelenggara ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.nama_penyelenggara}
                                                                    </span>) : ''}
                                                                <Form.Label>NAMA PENYELENGGARA SISTEM PERDAGANGAN
                                                                    ALTERNATIF</Form.Label>
                                                                <Form.Control
                                                                    value={data.nama_penyelenggara}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="nama_penyelenggara"
                                                                    type="text"
                                                                    placeholder="NAMA PENYELENGGARA SISTEM PERDAGANGAN ALTERNATIF"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </div>
                                                </Form>
                                                {allowedMenu && allowedMenu.legalitas_perusahaan_edit ?
                                                    <div>
                                                        <div className="card-footer">
                                                            {errMsg.email ?
                                                                (<Alert variant="danger" show={true}>Error
                                                                    : {errMsg.email}</Alert>) : ''}
                                                            <AppButton
                                                                onClick={this.handleSubmit.bind(this)}
                                                                isLoading={this.props.isAddLoading}
                                                                type="button"
                                                                theme="success">
                                                                Update Data
                                                            </AppButton>
                                                        </div>
                                                    </div>
                                                    : ''}
                                            </div>
                                        )}

                                </div>
                            </div>
                        </div>
                    </section>

                    {this.props.showFormSuccess ? (<AppSwalSuccess
                        show={this.props.showFormSuccess}
                        title={this.props.contentMsg}
                        type={this.props.tipeSWAL}
                        handleClose={this.closeSwal.bind(this)}
                    >
                    </AppSwalSuccess>) : ''}


                </div>
                <div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.dataLegalitasPerusahaan.data || {},
        isLoading: state.dataLegalitasPerusahaan.isLoading,
        isAddLoading: state.dataLegalitasPerusahaan.isAddLoading,
        error: state.dataLegalitasPerusahaan.error || null,
        contentMsg: state.dataLegalitasPerusahaan.contentMsg,
        showFormSuccess: state.dataLegalitasPerusahaan.showFormSuccess,
        tipeSWAL: state.dataLegalitasPerusahaan.tipeSWAL,
        user: state.auth.currentUser,
        allowedMenu: state.auth.currentUser.allowedMenu
    }
}

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {

            dispatch(fetchData());
        },
        changeProps: (data) => {
            dispatch(chgProps(data));
        },
        onAdd: (data) => {
            dispatch(addData(data))
        },
        closeSwal: () => {
            const _data = {};
            _data['showFormSuccess'] = false;
            _data['isAddLoading'] = false;
            _data['contentMsg'] = null;
            dispatch(addDataSuccess(_data));
            dispatch(fetchData());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(DataLegalitasPerusahaan);