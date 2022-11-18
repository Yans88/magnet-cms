import React, {Component} from "react";
import {connect} from "react-redux";
import {
    addData,
    addDataSuccess,
    addForm,
    approveData,
    clearAddDataError,
    deleteData,
    fetchData,
    fetchDataDetail,
    fetchDataError,
    fetchDataLoading,
    showConfirmApprove,
    showConfirmDel,
} from "./dataUserService";
import {fetchData as fetchDataRole} from "../data-role/dataRoleService";
import {fetchData as fetchDataCabang} from "../data-cabang/dataCabangService";
import {Col, Form} from "react-bootstrap";
import AppModal from "../components/modal/MyModal";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import ReactDatatable from "@ashvin27/react-datatable";
import {MultiSelect} from "react-multi-select-component";
import {GetProfileAdmin} from "../components/login/LoginService";
import moment from "moment/moment";

class DataUser extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            user_id: "",
            email: "",
            status: "",
            nama_role: null,
            nama_depan: "",
            nama_belakang: "",
            status_dokumen: "",
        };
        this.state = {
            sort_order: "ASC",
            sort_column: "name",
            keyword: "",
            status: "",
            status_dokumen: "",
            page_number: 1,
            per_page: 10,
            selected: this.initSelected,
            errMsg: this.initSelected,
            loadingForm: false,
        };
    }

    componentDidMount = async () => {
        const response = await GetProfileAdmin();
        if (response.accessToken === null) {
            this.props.history.push("login");
        }
        sessionStorage.removeItem("data_tipe_akun_id");
        sessionStorage.removeItem("user_id");
        this.props.onLoad(
            "?search&limit=" +
            this.state.per_page +
            "&start=" +
            (this.state.page_number - 1)
        );
        this.props.onLoadRole();
        this.props.onLoadCabang();
    };

    editRecord = async (record) => {
        let isLoading = true;
        let dataDetail;
        await fetchDataDetail(record.user_id)
            .then((response) => {
                console.log(response.data);
                if (response.data.error_message === 0) {
                    dataDetail = response.data.payload;
                } else {
                    const errorpayload = {};
                    errorpayload["message"] = "Something wrong";
                    errorpayload["status"] = response.data.error_message;
                    fetchDataError(errorpayload);
                    isLoading = false;
                    fetchDataLoading(isLoading);
                    return {};
                }
            })
            .catch((error) => {
                const errorpayload = {};
                errorpayload["message"] = "Something wrong";
                errorpayload["status"] = error.response ? error.response.status : 404;
                fetchDataError(errorpayload);
                isLoading = false;
                fetchDataLoading(isLoading);
                return {};
            });
        let arrayOpt = [];
        for (let i = 0; i < dataDetail.kode_cabang.length; i++) {
            arrayOpt.push({
                label: dataDetail.kode_cabang[i].nama_cabang,
                value: dataDetail.kode_cabang[i].cabang_id,
            });
        }
        dataDetail.kode_cabang = arrayOpt;
        this.setState({
            errMsg: this.initSelected,
            loadingForm: false,
            selected: dataDetail,
        });
        this.props.showForm(true);
    };

    deleteRecord = (record) => {
        this.setState({
            selected: record,
        });
        this.props.showConfirmDel(true);
    };

    handleClose = () => {
        this.setState({
            errMsg: {},
            selected: this.initSelected,
            loadingForm: false,
        });
        this.props.showForm(false);
        this.props.showConfirmDel(false);
        this.props.showConfirmApprove(false);
    };

    approveData = (record) => {
        console.log("APPROVE");
        this.setState({
            selected: record,
        });
        this.props.showConfirmApprove(true);
    };

    tableChangeHandler = (data) => {
        let queryString = this.state;
        Object.keys(data).map((key) => {
            if (key === "sort_order" && data[key]) {
                queryString.sort_order = data[key].order;
                queryString.sort_column = data[key].column;
            }
            if (key === "page_number") {
                queryString.page_number = data[key];
            }
            if (key === "page_size") {
                queryString.per_page = data[key];
            }
            if (key === "filter_value") {
                queryString.keyword = data[key];

            }

            return true;
        });

        this.props.onLoad(
            "?search=" +
            queryString.keyword +
            "&limit=" +
            this.state.per_page +
            "&start=" +
            (this.state.page_number - 1) +
            "&status=" +
            this.state.status + "&status_dokumen=" + this.state.status_dokumen
        );
    };

    handleChange(event) {
        const {name, value} = event.target;
        var val = value;
        this.props.clearErrProps();
        this.setState({
            loadingForm: false,
            errMsg: {...this.state.errMsg, [name]: ""},
            selected: {
                ...this.state.selected,
                [name]: val,
            },
        });
    }

    discardChanges = () => {
        this.setState({
            errMsg: {},
            selected: this.initSelected,
            loadingForm: false,
        });
        if (!this.state.selected.operator_by)
            this.setState({selected: {...this.state.selected}});
        this.props.showForm(true);
    };

    handleSubmit() {
        var errors = this.state.errMsg;
        this.setState({
            ...this.state,
            loadingForm: true,
        });
        errors.nama_depan = !this.state.selected.nama_depan
            ? "Nama Depan required"
            : "";
        errors.nama_belakang = !this.state.selected.nama_belakang
            ? "Nama Belakang required"
            : "";
        errors.email = !this.state.selected.email ? "Email required" : "";
        errors.role_id = !this.state.selected.role_id ? "Role required" : "";
        // errors.marketing = !this.state.selected.marketing ? "Marketing required" : '';
        // if(this.state.selected.user_id == "" || this.state.selected.user_id == null) {
        errors.password = !this.state.selected.password ? "Password required" : "";
        errors.konfirmasi_password = !this.state.selected.konfirmasi_password
            ? "Konfirmasi Password required"
            : "";
        if (
            this.state.selected.password !== this.state.selected.konfirmasi_password
        ) {
            errors.password = "Password dengan Konfirmasi Password tidak sama";
            errors.konfirmasi_password =
                "Password dengan Konfirmasi Password tidak sama";
        }
        // }
        this.setState({errors});
        if (this.validateForm(this.state.errMsg)) {
            let kode_cabangs = [];
            for (let i = 0; i < this.state.selected.kode_cabang.length; i++) {
                kode_cabangs.push({
                    cabang_id: this.state.selected.kode_cabang[i].value,
                });
            }
            let selected = {
                ...this.state.selected,
                role: this.state.selected.role_id,
                kode_cabang: kode_cabangs,
                // marketing:this.state.selected.marketing,
            };
            this.props.onAdd(selected);
        } else {
            console.error("Invalid Form");
            this.setState({
                loadingForm: false,
            });
        }
    }

    handleChange2(event) {
        var {name, value} = event.target;
        var val = value;

        this.setState({
            ...this.state,
            [name]: val,
        });
        console.log(val);
        if (name === "status")
            this.props.onLoad(
                "?search=" +
                this.state.keyword +
                "&limit=" +
                this.state.per_page +
                "&start=" +
                (this.state.page_number - 1) +
                "&status=" + val + "&status_dokumen=" + this.state.status_dokumen
            );
        if (name === "keyword")
            this.props.onLoad(
                "?search=" +
                val +
                "&limit=" +
                this.state.per_page +
                "&start=0" +
                "&status=" +
                this.state.status + "&status_dokumen=" + this.state.status_dokumen
            );
        if (name === "status_dokumen")
            this.props.onLoad(
                "?search=" +
                this.state.keyword +
                "&limit=" +
                this.state.per_page +
                "&start=0" +
                "&status=" +
                this.state.status + "&status_dokumen=" + val
            );
    }

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }

    handleDelete = async () => {
        await this.props.onDelete(this.state.selected.user_id);
        this.props.onLoad(
            "?search=" +
            this.state.keyword +
            "&limit=" +
            this.state.per_page +
            "&start=" +
            (this.state.page_number - 1)
        );
    };

    handleApprove = async () => {
        await this.props.onApprove(this.state.selected.user_id);
        this.props.onLoad(
            "?search=" +
            this.state.keyword +
            "&limit=" +
            this.state.per_page +
            "&start=" +
            (this.state.page_number - 1)
        );
    };

    detailRecord = async (record) => {
        await sessionStorage.setItem("user_id", record.user_id);
        await sessionStorage.setItem("data_tipe_akun_id", record.data_tipe_akun_id);
        this.props.history.push("/detail-user-cabinet");
    };

    render() {
        const {data, dataRole, dataCabang} = this.props;
        const {selected, errMsg} = this.state;
        const columns = [
            {
                key: "no",
                text: "No.",
                width: 20,
                align: "center",
                sortable: false,
                cell: (row, index) => (
                    <div style={{textAlign: "center"}}>
                        {(this.state.page_number - 1) * this.state.per_page +
                            index +
                            1 +
                            "."}
                    </div>
                ),
                row: 0,
            },
            {
                key: "name",
                text: "Nama",
                align: "center",
                sortable: false,
                cell: (record) => {
                    return <div>{record.nama_depan}</div>;
                },
            },
            {
                key: "email",
                text: "Email",
                align: "center",
                sortable: false,
            },
            {
                key: "no_ref_code",
                text: "No. ref. code",
                align: "center",
                sortable: false,
            },
            {
                key: "created_at",
                text: "tanggal registrasi",
                align: "center",
                sortable: false,
                cell: record => {
                    return (moment(new Date(record.created_at)).format('DD-MM-YYYY HH:mm'))
                }
            },
            {
                key: "status",
                text: "Status",
                align: "center",
                sortable: false,
            },
            {
                key: "status_dokumen",
                text: "Status Dokumen",
                align: "center",
                sortable: false,
            },
            /* {
                 key: "action",
                 text: "Action",
                 width: 140,
                 align: "center",
                 sortable: false,
                 cell: (record) => {
                     return (
                         <div style={{textAlign: "center"}}>
                             <Fragment>

                                 <button
                                     className="btn btn-xs btn-primary"
                                     onClick={(e) => this.detailRecord(record)}
                                     style={{marginRight: "5px"}}
                                 >
                                     <i className="fa fa-eye"></i> View
                                 </button>
                             </Fragment>
                         </div>
                     );
                 },
             },*/
        ];

        const config = {
            key_column: "user_id",
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: false,
            show_pagination: true,
            pagination: "advance",

            language: {
                loading_text: "Please be patient while data loads...",
            },
        };
        const optionsCabang = () => {
            let arrayOpt = [];
            for (let i = 0; i < dataCabang.length; i++) {
                arrayOpt.push({
                    label: dataCabang[i].nama_cabang,
                    value: dataCabang[i].cabang_id,
                });
            }
            return arrayOpt;
        };
        const frmUser = (
            <Form id="myForm">
                <Form.Group controlId="nama_depan">
                    <Form.Label>Nama Depan</Form.Label>
                    {errMsg.nama_depan ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.nama_depan}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="nama_depan"
                        type="text"
                        value={selected.nama_depan}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Nama Depan"
                    />
                </Form.Group>

                <Form.Group controlId="nama_belakang">
                    <Form.Label>Nama Belakang</Form.Label>
                    {errMsg.nama_belakang ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.nama_belakang}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="nama_belakang"
                        type="text"
                        value={selected.nama_belakang}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Nama Belakang"
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    {errMsg.email ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.email}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="email"
                        type="email"
                        value={selected.email}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Email"
                    />
                </Form.Group>

                {/* <Form.Label>Marketing</Form.Label>
            {errMsg.marketing ?
                (<span className="float-right text-error badge badge-danger">{errMsg.marketing}
                </span>) : ''}
            <Form.Control
                size="sm"
                autoComplete="off"
                name="marketing"
                as="select"
                value={selected.marketing}
                onChange={this.handleChange.bind(this)}
                placeholder="marketing" >
                <option key={"Y"} value={"Y"} selected={"Y" == selected.marketing}>Ya</option>
                <option key={"N"} value={"N"} selected={"N" == selected.marketing}>No</option>
            </Form.Control> */}

                <Form.Label>Cabang</Form.Label>
                {errMsg.cabang_id ? (
                    <span className="float-right text-error badge badge-danger">
            {errMsg.cabang_id}
          </span>
                ) : (
                    ""
                )}
                {/* <Form.Control
                size="sm"
                autoComplete="off"
                name="cabang_id"
                as="select"
                onChange={this.handleChange.bind(this)}
                placeholder="Cabang" >
                <option>pilih cabang</option>
                {dataCabang.map((item, index) => {
                    return (
                        <option key={index} value={item.cabang_id} selected={item.cabang_id == selected.kode_cabang}>{"("+item.kode_cabang+") "+item.nama_cabang}</option>
                    )
                })}
                
            </Form.Control> */}

                <MultiSelect
                    options={optionsCabang}
                    value={this.state.selected.kode_cabang}
                    onChange={(val) =>
                        this.setState({
                            selected: {
                                ...this.state.selected,
                                kode_cabang: val,
                            },
                        })
                    }
                    labelledBy="Pilih Cabang"
                />

                <Form.Label>Role</Form.Label>
                {errMsg.role_id ? (
                    <span className="float-right text-error badge badge-danger">
            {errMsg.role_id}
          </span>
                ) : (
                    ""
                )}
                <Form.Control
                    size="sm"
                    autoComplete="off"
                    name="role_id"
                    as="select"
                    onChange={this.handleChange.bind(this)}
                    placeholder="Role"
                >
                    <option>pilih role</option>
                    {dataRole.map((item, index) => {
                        return (
                            <option
                                key={index}
                                value={item.role_id}
                                selected={item.role_id === selected.role_id}
                            >
                                {item.nama_role}
                            </option>
                        );
                    })}
                </Form.Control>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    {errMsg.password ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.password}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="password"
                        type="password"
                        value={selected.password}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Password"
                    />
                </Form.Group>

                <Form.Group controlId="konfirmasi_password">
                    <Form.Label>Konfirmasi Password</Form.Label>
                    {errMsg.konfirmasi_password ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.konfirmasi_password}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="konfirmasi_password"
                        type="password"
                        value={selected.konfirmasi_password}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Konfirmasi Password"
                    />
                </Form.Group>
            </Form>
        );
        const contentDelete = (
            <div
                dangerouslySetInnerHTML={{
                    __html:
                        '<div id="caption" style=padding-bottom:20px;">Apakah anda yakin <br/>akan menghapus data ini ?</div>',
                }}
            />
        );
        const contentApprove = (
            <div
                dangerouslySetInnerHTML={{
                    __html:
                        '<div id="caption" style=padding-bottom:20px;">Apakah anda yakin <br/>akan Approve data ini ?</div>',
                }}
            />
        );

        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Data User Cabinet</h1>
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
                                    <div
                                        className="card card-success shadow-lg"
                                        style={{minHeight: "470px"}}
                                    >
                                        <div className="card-header">

                                            <div className="row">
                                                <div className="pull-right col-8 offset-md-4">
                                                    <Form>
                                                        <Form.Row>

                                                            <Form.Group as={Col} sm={4} controlId="status">
                                                                <Form.Control
                                                                    size="sm"
                                                                    autoComplete="off"
                                                                    name="status"
                                                                    as="select"
                                                                    onChange={this.handleChange2.bind(this)}
                                                                    placeholder="status"
                                                                >
                                                                    <option value="">All Status</option>
                                                                    <option
                                                                        value="Aktif"
                                                                        selected={this.state.status === "Aktif"}
                                                                    >
                                                                        Aktif{" "}
                                                                    </option>
                                                                    <option
                                                                        value="Belum terverifikasi"
                                                                        selected={
                                                                            this.state.status === "Belum Terverifikasi"
                                                                        }
                                                                    >
                                                                        Belum terverifikasi{" "}
                                                                    </option>
                                                                    <option
                                                                        value="Reject"
                                                                        selected={this.state.status === "Reject"}
                                                                    >
                                                                        Reject{" "}
                                                                    </option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={4} controlId="status_dokumen">
                                                                <Form.Control
                                                                    size="sm"
                                                                    autoComplete="off"
                                                                    name="status_dokumen"
                                                                    as="select"
                                                                    onChange={this.handleChange2.bind(this)}
                                                                    placeholder="status_dokumen"
                                                                >
                                                                    <option value="">All Status</option>
                                                                    <option
                                                                        value="Belum Lengkap"
                                                                        selected={
                                                                            this.state.status_dokumen === "Belum Lengkap"
                                                                        }
                                                                    >
                                                                        Belum Lengkap{" "}
                                                                    </option>
                                                                    <option
                                                                        value="Menunggu Verifikasi"
                                                                        selected={this.state.status_dokumen === "Menunggu Verifikasi"}
                                                                    >
                                                                        Menunggu Verifikasi{" "}
                                                                    </option>
                                                                    <option
                                                                        value="Approve"
                                                                        selected={this.state.status_dokumen === "Approve"}
                                                                    >
                                                                        Approve{" "}
                                                                    </option>
                                                                    <option
                                                                        value="Reject"
                                                                        selected={this.state.status_dokumen === "Reject"}
                                                                    >
                                                                        Reject{" "}
                                                                    </option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={4} controlId="keyword">
                                                                <Form.Control
                                                                    size="sm"
                                                                    autoComplete="off"
                                                                    name="keyword"
                                                                    type="text"
                                                                    value={this.state.keyword}
                                                                    onChange={this.handleChange2.bind(this)}
                                                                    placeholder="Search in records..."
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            {data ? (
                                                <ReactDatatable
                                                    config={config}
                                                    records={data}
                                                    columns={columns}
                                                    dynamic={true}
                                                    onChange={this.tableChangeHandler}
                                                    loading={this.props.isLoading}
                                                    total_record={this.props.totalData}
                                                />
                                            ) : (
                                                <p>No Data ...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <AppModal
                        size="sm"
                        show={this.props.showFormAdd}
                        form={frmUser}
                        backdrop="static"
                        keyboard={false}
                        title="Add/Edit"
                        titleButton="Save change"
                        themeButton="success"
                        handleClose={this.handleClose}
                        isLoading={
                            this.props.isAddLoading
                                ? this.props.isAddLoading
                                : this.state.loadingForm
                        }
                        formSubmit={this.handleSubmit.bind(this)}
                    ></AppModal>
                    {this.props.showFormSuccess ? (
                        <AppSwalSuccess
                            show={this.props.showFormSuccess}
                            title={this.props.contentMsg}
                            type={this.props.tipeSWAL}
                            handleClose={this.props.closeSwal}
                        ></AppSwalSuccess>
                    ) : (
                        ""
                    )}
                    <AppModal
                        show={this.props.showFormDelete}
                        size="sm"
                        form={contentDelete}
                        handleClose={this.handleClose.bind(this)}
                        backdrop="static"
                        keyboard={false}
                        title="Delete User"
                        titleButton="Delete User"
                        themeButton="danger"
                        isLoading={this.props.isAddLoading}
                        formSubmit={this.handleDelete.bind(this)}
                    ></AppModal>
                    <AppModal
                        show={this.props.showFormApprove}
                        size="sm"
                        form={contentApprove}
                        handleClose={this.handleClose.bind(this)}
                        backdrop="static"
                        keyboard={false}
                        title="Approve"
                        titleButton="Approve"
                        themeButton="danger"
                        isLoading={this.props.isAddLoading}
                        formSubmit={this.handleApprove.bind(this)}
                    ></AppModal>
                </div>
                <div></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.dataUser.data || [],
        dataRole: state.dataRole.data || [],
        dataCabang: state.dataCabang.data || [],
        isLoading: state.dataUser.isLoading,
        isAddLoading: state.dataUser.isAddLoading,
        error: state.dataUser.error || null,
        errorPriority: state.dataUser.errorPriority || null,
        totalData: state.dataUser.totalData || 0,
        showFormAdd: state.dataUser.showFormAdd,
        contentMsg: state.dataUser.contentMsg,
        showFormSuccess: state.dataUser.showFormSuccess,
        showFormDelete: state.dataUser.showFormDelete,
        showFormApprove: state.dataUser.showFormApprove,
        tipeSWAL: state.dataUser.tipeSWAL,
        user: state.auth.currentUser,
        selected: state.dataUser.selected || {},
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
        },
        onLoadDetail: (queryString) => {
            dispatch(fetchDataDetail(queryString));
        },
        onLoadRole: () => {
            dispatch(fetchDataRole(""));
        },
        onLoadCabang: () => {
            dispatch(fetchDataCabang(""));
        },
        onAdd: (data) => {
            dispatch(addData(data));
        },
        onDelete: (data) => {
            dispatch(deleteData(data));
        },
        onApprove: (data) => {
            dispatch(approveData(data));
        },
        showForm: (data) => {
            dispatch(addForm(data));
        },
        showConfirmDel: (data) => {
            dispatch(showConfirmDel(data));
        },
        showConfirmApprove: (data) => {
            dispatch(showConfirmApprove(data));
        },
        closeSwal: () => {
            const _data = {};
            _data["showFormSuccess"] = false;
            _data["contentMsg"] = null;
            dispatch(addDataSuccess(_data));
            dispatch(fetchData("?search&limit=10&start=0"));
        },
        clearErrProps: () => {
            dispatch(clearAddDataError());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToPros)(DataUser);
