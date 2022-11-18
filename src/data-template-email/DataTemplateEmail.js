import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {
    addData,
    addDataSuccess,
    addForm,
    clearAddDataError,
    fetchData,
    fetchDataDetail
} from './dataTemplateEmailservice';
import {AppSwalSuccess} from '../components/modal/SwalSuccess';
import {GetProfileAdmin} from '../components/login/LoginService';

class DataTemplateEmail extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            user_id: "",
            email: "",
            status: "",
            nama_role: null,
            nama_depan: "",
            nama_belakang: "",
            status_dokumen: ""
        }
        this.state = {
            sort_order: "ASC",
            sort_column: "name",
            keyword: '',
            page_number: 1,
            per_page: 10,
            selected: this.initSelected,
            errMsg: this.initSelected,
            loadingForm: false,
        }
    }

    componentDidMount = async () => {
        const response = await GetProfileAdmin();
        if (response.accessToken === null) {
            this.props.history.push("login");
        }
        await this.props.onLoad("?search&limit=" + this.state.per_page + "&start=" + (this.state.page_number - 1));

    }


    editData = async (record) => {
        sessionStorage.removeItem("tipeTemplateEMail");
        if (record) await sessionStorage.setItem('tipeTemplateEMail', record);
        this.props.history.push("edit-template-email");
    }


    render() {
        const {data, isLoading, allowedMenu} = this.props;

        return (
            <div>

                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Data Template Email</h1>
                                </div>
                                {/* /.col */}

                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* /.content-header */}
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    {/* card start */}
                                    <div className="card card-success shadow-lg" style={{"minHeight": "470px"}}>


                                        <div className="card-body">
                                            {data ? (
                                                <Fragment>
                                                    <table className="table table-bordered table-striped">
                                                        <thead>
                                                        <tr key="thead_email">
                                                            <th className="text-center" style={{width: 20}}>No.</th>
                                                            <th className="text-center" style={{width: 150}}>Tipe</th>
                                                            <th className="text-center" style={{width: 200}}>Subject
                                                            </th>
                                                            <th className="text-center">Body</th>
                                                            {allowedMenu && allowedMenu.data_template_email_edit ?
                                                                <th className="text-center"
                                                                    style={{width: 100}}>Action</th> : ''}
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {!isLoading ? (
                                                            <Fragment>
                                                                <tr key="broadcast_email">
                                                                    <td>1.</td>
                                                                    <td>broadcast_email</td>
                                                                    <td>{data.broadcast_email && data.broadcast_email.subject}</td>
                                                                    <td>
                                                                        <div
                                                                            dangerouslySetInnerHTML={{__html: data.broadcast_email && data.broadcast_email.body}}/>
                                                                    </td>
                                                                    {allowedMenu && allowedMenu.data_template_email_edit ?
                                                                        <td>
                                                                            <button
                                                                                onClick={e => this.editData('broadcast_email')}
                                                                                className="btn btn-xs btn-success">
                                                                                <i className="fa fa-edit"></i> Edit
                                                                            </button>
                                                                        </td> : ''}
                                                                </tr>
                                                                <tr key="forgot_password">
                                                                    <td>2.</td>
                                                                    <td>forgot_password</td>
                                                                    <td>{data.forgot_password && data.forgot_password.subject}</td>
                                                                    <td>
                                                                        <div
                                                                            dangerouslySetInnerHTML={{__html: data.forgot_password && data.forgot_password.body}}/>
                                                                    </td>
                                                                    {allowedMenu && allowedMenu.data_template_email_edit ?
                                                                        <td>
                                                                            <button
                                                                                onClick={e => this.editData('forgot_password')}
                                                                                className="btn btn-xs btn-success">
                                                                                <i className="fa fa-edit"></i> Edit
                                                                            </button>
                                                                        </td> : ''}
                                                                </tr>
                                                                <tr key="verifikasi_akun">
                                                                    <td>3.</td>
                                                                    <td>verifikasi_akun</td>
                                                                    <td>{data.verifikasi_akun && data.verifikasi_akun.subject}</td>
                                                                    <td>
                                                                        <div
                                                                            dangerouslySetInnerHTML={{__html: data.verifikasi_akun && data.verifikasi_akun.body}}/>
                                                                    </td>
                                                                    {allowedMenu && allowedMenu.data_template_email_edit ?
                                                                        <td>
                                                                            <button
                                                                                onClick={e => this.editData('verifikasi_akun')}
                                                                                className="btn btn-xs btn-success">
                                                                                <i className="fa fa-edit"></i> Edit
                                                                            </button>
                                                                        </td> : ''}
                                                                </tr>
                                                                <tr key="with_draw">
                                                                    <td>4.</td>
                                                                    <td>with_draw</td>
                                                                    <td>{data.with_draw && data.with_draw.subject}</td>
                                                                    <td>
                                                                        <div
                                                                            dangerouslySetInnerHTML={{__html: data.with_draw && data.with_draw.body}}/>
                                                                    </td>
                                                                    {allowedMenu && allowedMenu.data_template_email_edit ?
                                                                        <td>
                                                                            <button
                                                                                onClick={e => this.editData('with_draw')}
                                                                                className="btn btn-xs btn-success">
                                                                                <i className="fa fa-edit"></i> Edit
                                                                            </button>
                                                                        </td> : ''}
                                                                </tr>
                                                                <tr key="contact_us">
                                                                    <td>5.</td>
                                                                    <td>contact_us</td>
                                                                    <td>{data.contact_us && data.contact_us.subject}</td>
                                                                    <td>
                                                                        <div
                                                                            dangerouslySetInnerHTML={{__html: data.contact_us && data.contact_us.body}}/>
                                                                    </td>
                                                                    {allowedMenu && allowedMenu.data_template_email_edit ?
                                                                        <td>
                                                                            <button
                                                                                onClick={e => this.editData('contact_us')}
                                                                                className="btn btn-xs btn-success">
                                                                                <i className="fa fa-edit"></i> Edit
                                                                            </button>
                                                                        </td> : ''}
                                                                </tr>
                                                                <tr key="free_akun_demo">
                                                                    <td>6.</td>
                                                                    <td>free_akun_demo</td>
                                                                    <td>{data.free_akun_demo && data.free_akun_demo.subject}</td>
                                                                    <td>
                                                                        <div
                                                                            dangerouslySetInnerHTML={{__html: data.free_akun_demo && data.free_akun_demo.body}}/>
                                                                    </td>
                                                                    {allowedMenu && allowedMenu.data_template_email_edit ?
                                                                        <td>
                                                                            <button
                                                                                onClick={e => this.editData('free_akun_demo')}
                                                                                className="btn btn-xs btn-success">
                                                                                <i className="fa fa-edit"></i> Edit
                                                                            </button>
                                                                        </td> : ''}
                                                                </tr>
                                                            </Fragment>
                                                        ) : (<tr key="await_data">
                                                            <td colSpan={4}> Waiting ....</td>
                                                        </tr>)}
                                                        </tbody>
                                                    </table>
                                                </Fragment>
                                            ) : (<p>No Data ...</p>)}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {this.props.showFormSuccess ? (<AppSwalSuccess
                        show={this.props.showFormSuccess}
                        title={this.props.contentMsg}
                        type={this.props.tipeSWAL}
                        handleClose={this.props.closeSwal}
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
        data: state.dataTemplateEmail.data || {},
        isLoading: state.dataTemplateEmail.isLoading,
        isAddLoading: state.dataTemplateEmail.isAddLoading,
        error: state.dataTemplateEmail.error || null,
        errorPriority: state.dataTemplateEmail.errorPriority || null,
        totalData: state.dataTemplateEmail.totalData || 0,
        showFormAdd: state.dataTemplateEmail.showFormAdd,
        contentMsg: state.dataTemplateEmail.contentMsg,
        showFormSuccess: state.dataTemplateEmail.showFormSuccess,
        showFormDelete: state.dataTemplateEmail.showFormDelete,
        showFormApprove: state.dataTemplateEmail.showFormApprove,
        tipeSWAL: state.dataTemplateEmail.tipeSWAL,
        user: state.auth.currentUser,
        allowedMenu: state.auth.currentUser.allowedMenu,
        selected: state.dataTemplateEmail.selected || {}
    }
}

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {

            dispatch(fetchData(queryString));
        },
        onLoadDetail: (queryString) => {
            dispatch(fetchDataDetail(queryString));
        },
        onAdd: (data) => {
            dispatch(addData(data));
        },


        showForm: (data) => {
            dispatch(addForm(data));
        },


        closeSwal: () => {
            const _data = {};
            _data['showFormSuccess'] = false;
            _data['contentMsg'] = null;
            dispatch(addDataSuccess(_data));
            dispatch(fetchData("?search&limit=10&start=0"));
        },
        clearErrProps: () => {
            dispatch(clearAddDataError());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(DataTemplateEmail);