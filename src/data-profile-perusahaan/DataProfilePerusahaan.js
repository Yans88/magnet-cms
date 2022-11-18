import React, {Component} from 'react'
import {Alert, Col, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import AppButton from '../components/button/Button';
import Loading from '../components/loading/MyLoading';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {AppSwalSuccess} from '../components/modal/SwalSuccess';
import {addData, addDataSuccess, chgProps, fetchData} from './dataProfilePerusahaanService';
import {GetProfileAdmin} from '../components/login/LoginService';
import NumberFormat from "react-number-format";

class DataProfilePerusahaan extends Component {
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
                                    <h1 className="m-0">Profile Perusahaan</h1>
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
                                                            <Form.Group as={Col} xs={6} controlId="perusahaan">
                                                                {errMsg.perusahaan ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.perusahaan}
                                                                    </span>) : ''}
                                                                <Form.Label>Perusahaan</Form.Label>
                                                                <Form.Control
                                                                    value={data.perusahaan}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="perusahaan"
                                                                    type="text"
                                                                    placeholder="Perusahaan"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={12} controlId="alamat">
                                                                <Form.Label>Alamat</Form.Label>
                                                                <SunEditor
                                                                    defaultValue={data.alamat}
                                                                    setContents={data.alamat}
                                                                    onChange={this.handleChangeDesk.bind(this, 'alamat')}
                                                                    setOptions={{
                                                                        placeholder: "alamat ...",
                                                                        maxHeight: 250,
                                                                        height: 250,
                                                                        buttonList: [
                                                                            ['fontSize', 'formatBlock', 'bold', 'underline', 'italic', 'align', 'horizontalRule', 'list', 'lineHeight', 'link', 'strike', 'subscript', 'superscript', 'codeView', 'undo', 'redo', 'fontColor', 'hiliteColor', 'textStyle', 'paragraphStyle', 'blockquote', 'removeFormat']
                                                                        ]
                                                                    }}
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="telp">
                                                                {errMsg.telp ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.telp}
                                                                    </span>) : ''}
                                                                <Form.Label>Telpon</Form.Label>
                                                                <Form.Control
                                                                    value={data.telp}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="telp"
                                                                    type="text"
                                                                    placeholder="Telpon"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="fax">
                                                                {errMsg.fax ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.fax}
                                                                    </span>) : ''}
                                                                <Form.Label>Fax</Form.Label>
                                                                <Form.Control
                                                                    value={data.fax}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="fax"
                                                                    type="text"
                                                                    placeholder="Fax"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="email">
                                                                {errMsg.email ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.email}
                                                                    </span>) : ''}
                                                                <Form.Label>Email</Form.Label>
                                                                <Form.Control
                                                                    value={data.email}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="email"
                                                                    type="text"
                                                                    placeholder="Email"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="website">
                                                                {errMsg.website ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.website}
                                                                    </span>) : ''}
                                                                <Form.Label>Website</Form.Label>
                                                                <Form.Control
                                                                    value={data.website}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="website"
                                                                    type="text"
                                                                    placeholder="Website"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="telp_dealing">
                                                                {errMsg.telp_dealing ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.telp_dealing}
                                                                    </span>) : ''}
                                                                <Form.Label>Telpon Dealing</Form.Label>
                                                                <Form.Control
                                                                    value={data.telp_dealing}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="telp_dealing"
                                                                    type="text"
                                                                    placeholder="Telpon Dealing"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="email_dealing">
                                                                {errMsg.email_dealing ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.email_dealing}
                                                                    </span>) : ''}
                                                                <Form.Label>Email Dealing</Form.Label>
                                                                <Form.Control
                                                                    value={data.email_dealing}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="email_dealing"
                                                                    type="text"
                                                                    placeholder="Email Dealing"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="telp_compliance">
                                                                {errMsg.telp_compliance ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.telp_compliance}
                                                                    </span>) : ''}
                                                                <Form.Label>Telpon Compliance</Form.Label>
                                                                <Form.Control
                                                                    value={data.telp_compliance}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="telp_compliance"
                                                                    type="text"
                                                                    placeholder="Telpon Compliance"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="email_compliance">
                                                                {errMsg.email_compliance ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.email_compliance}
                                                                    </span>) : ''}
                                                                <Form.Label>Email Compliance</Form.Label>
                                                                <Form.Control
                                                                    value={data.email_compliance}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="email_compliance"
                                                                    type="text"
                                                                    placeholder="Email Compliance"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6}
                                                                        controlId="wakil_pialang_caller">
                                                                {errMsg.wakil_pialang_caller ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.wakil_pialang_caller}
                                                                    </span>) : ''}
                                                                <Form.Label>Wakil Pialang Caller</Form.Label>
                                                                <NumberFormat
                                                                    value={data.wakil_pialang_caller ? data.wakil_pialang_caller : ""}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    className="form-control form-control-sm"
                                                                    size="sm"
                                                                    name="wakil_pialang_caller"
                                                                    thousandSeparator={false}
                                                                    decimalScale={0}
                                                                    inputMode="numeric"
                                                                    placeholder="Wakil Pialang Caller"
                                                                />

                                                            </Form.Group>
                                                        </Form.Row>
                                                    </div>

                                                </Form>
                                                {allowedMenu && allowedMenu.profile_perusahaan_edit ?
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
                                                    </div> : ''
                                                }
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
        data: state.dataProfilePerusahaan.data || {},
        isLoading: state.dataProfilePerusahaan.isLoading,
        isAddLoading: state.dataProfilePerusahaan.isAddLoading,
        error: state.dataProfilePerusahaan.error || null,
        contentMsg: state.dataProfilePerusahaan.contentMsg,
        showFormSuccess: state.dataProfilePerusahaan.showFormSuccess,
        tipeSWAL: state.dataProfilePerusahaan.tipeSWAL,
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
export default connect(mapStateToProps, mapDispatchToPros)(DataProfilePerusahaan);