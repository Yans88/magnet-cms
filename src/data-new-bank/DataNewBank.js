import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {addDataSuccess, addForm, clearAddDataError, fetchData, showConfirmDel, updData,} from "./dataNewBankService";
import AppModal from "../components/modal/MyModal";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import ReactDatatable from "@ashvin27/react-datatable";
import {Figure, Form} from "react-bootstrap";
import moment from "moment/moment";

class DataNewBank extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            akun_bank_id: "",
            status: "",
            keterangan: "",
            showImage: false,
        };
        this.state = {
            sort_order: "ASC",
            sort_column: "name",
            start: 1,
            limit: 10,
            search: "",
            status: "Pending",
            selected: this.initSelected,
            errMsg: this.initSelected,
            loadingForm: false,
            start_date: "",
            end_date: "",
        };
    }

    componentDidMount() {
        const queryString =
            "?search&limit=" +
            this.state.limit +
            "&start=" +
            (this.state.start - 1) +
            "&status=" +
            this.state.status;
        this.props.onLoad(queryString);
    }

    rejectRecord = (record) => {
        this.setState({
            selected: {
                ...record,
                status: "Reject",
            },
        });
        this.props.showConfirmDel(true);
    };

    showImg = (record) => {
        this.setState({
            selected: {
                ...record,
                showImage: true,
            },
        });
    };

    approveRecord = (record) => {
        this.setState({
            selected: {
                ...record,
                status: "Approve",
            },
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
    };

    handleCloseSwal = () => {
        this.setState({
            errMsg: {},
            selected: this.initSelected,
            loadingForm: false,
        });
        this.props.showForm(false);
        this.props.showConfirmDel(false);
        this.props.closeSwal();
        const queryString =
            "?search&limit=" +
            this.state.limit +
            "&start=" +
            (this.state.start - 1) +
            "&status=" +
            this.state.status;
        this.props.onLoad(queryString);
    };

    tableChangeHandler = (data) => {
        let queryString = this.state;
        Object.keys(data).map((key) => {
            if (key === "sort_order" && data[key]) {
                queryString.sort_order = data[key].order;
                queryString.sort_column = data[key].column;
            }
            if (key === "page_number") {
                queryString.start = data[key];
            }
            if (key === "page_size") {
                queryString.limit = data[key];
            }
            if (key === "filter_value") {
                queryString.search = data[key];
            }
            return true;
        });

        const Qs =
            "?search=" +
            this.state.search +
            "&limit=" +
            this.state.limit +
            "&start=" +
            (this.state.start - 1) +
            "&status=" +
            this.state.status;
        this.props.onLoad(Qs);
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

    handleDelete = async () => {
        var errors = this.state.errMsg;
        this.setState({
            ...this.state,
            loadingForm: true,
        });

        this.setState({errors});
        if (this.validateForm(this.state.errMsg)) {
            await this.props.onDelete(
                "?akun_bank_id=" +
                this.state.selected.akun_bank_id +
                "&act=" +
                this.state.selected.status +
                "&notes=" +
                this.state.selected.keterangan
            );
        } else {
            console.error("Invalid Form");
            this.setState({
                loadingForm: false,
            });
        }
    };

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }

    handleSearch(event) {
        this.setState({
            ...this.state,
            search: event.target.value,
        });
        const queryString =
            "?search=" +
            event.target.value +
            "&limit=" +
            this.state.limit +
            "&start=" +
            (this.state.start - 1) +
            "&start_date=" +
            this.state.start_date +
            "&end_date=" +
            this.state.end_date +
            "&status=" +
            this.state.status;
        this.props.onLoad(queryString);
        const Qs2 =
            "?search=" +
            event.target.value +
            "&start=" +
            (this.state.start - 1) +
            "&start_date=" +
            this.state.start_date +
            "&end_date=" +
            this.state.end_date +
            "&status=" +
            this.state.status;
        this.props.onDownload(Qs2);
    }

    render() {
        const {data, allowedMenu} = this.props;
        const {selected} = this.state;

        var columns = [
            {
                key: "",
                text: "Tanggal",
                width: 150,
                align: "center",
                sortable: false,
                cell: (record) => {
                    return moment(new Date(record.timestamp)).format("DD-MM-YYYY HH:mm:ss");
                },
            },
            {
                key: "nama_pemilik",
                text: "Nama pemilik rekening",
                width: 200,
                align: "center",
                sortable: false,
            },
            {
                key: "email",
                text: "Email",
                align: "center",
                width: 200,
                sortable: false,
            },
            {
                key: "nama_bank",
                text: "Bank",
                align: "center",
                width: 200,
                sortable: false,
            },

            {
                key: "no_rek",
                text: "No. Rekening",
                align: "center",
                width: 220,
                sortable: false,
                cell: (record) => {
                    return (
                        <Fragment>
                            No. Rekening : {record.no_rek} <br/>
                            Jenis akun : {record.jenis_akun_bank}
                        </Fragment>
                    );
                },
            },
            {
                key: "cover_buku",
                text: "Cover buku tabungan",
                align: "center",
                sortable: false,

                cell: (record) => {
                    return (
                        <div style={{textAlign: "center"}}>
                            <Figure onClick={(e) => this.showImg(record)} style={{marginTop: ".3rem", marginBottom: 0}}>
                                <Figure.Image
                                    thumbnail
                                    width={150}
                                    height={120}
                                    src={record.cover_buku}
                                />
                            </Figure>
                        </div>
                    );
                },
            },


        ];
        if (allowedMenu && (allowedMenu.data_new_akun_bank_waiting_approve_approve || allowedMenu.data_new_akun_bank_waiting_approve_reject)) {
            columns = [
                ...columns,
                {
                    key: "action",
                    text: "Action",
                    width: 140,
                    align: "center",
                    sortable: false,
                    cell: (record) => {
                        return (
                            <div style={{textAlign: "center"}}>
                                <Fragment>
                                    {allowedMenu && allowedMenu.data_new_akun_bank_waiting_approve_approve ? (
                                        <button
                                            className="btn btn-xs btn-success"
                                            onClick={(e) => this.approveRecord(record)}
                                            style={{width: 70, marginBottom: 5}}
                                        >
                                            <i className="fa fa-check"></i> Approve
                                        </button>
                                    ) : ''}
                                    {allowedMenu && allowedMenu.data_new_akun_bank_waiting_approve_reject ? (
                                        <button
                                            className="btn btn-danger btn-xs"
                                            onClick={() => this.rejectRecord(record)}
                                            style={{width: 70}}
                                        >
                                            <i className="fa fa-times"></i> Reject
                                        </button>
                                    ) : ''}
                                </Fragment>
                            </div>
                        );
                    },
                },
            ];
        }
        const config = {
            key_column: "akun_bank_id",
            page_size: 10,
            length_menu: [10, 20, 50],

            show_pagination: true,
            pagination: "advance",
            button: {
                excel: false,
                print: false,
            },
            language: {
                loading_text: "Please be patient while data loads...",
            },
        };

        const contentDeleteReject = (
            <Form id="myForm">
                <div id="caption">Apakah anda yakin ? <b><span style={{color: "#dc3545"}}>REJECT</span></b> <br/>
                    {selected.nama_pemilik}, {selected.email}, {selected.nama_bank}, {selected.no_rek}
                </div>

            </Form>
        );

        const contentDelete = (
            <Form id="myForm">
                <div id="caption">Apakah anda yakin ? <b><span style={{color: "#28a745"}}>APPROVE</span></b> <br/>
                    {selected.nama_pemilik}, {selected.email}, {selected.nama_bank}, {selected.no_rek}
                </div>

            </Form>
        );

        const showImg = (
            <Figure style={{marginTop: ".3rem", marginBottom: 0}}>
                <Figure.Image
                    width={450}
                    height={400}
                    src={selected.cover_buku ? selected.cover_buku : ""}
                />
            </Figure>
        );

        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Data New Akun Bank - Waiting Approve</h1>
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

                    {this.props.showFormSuccess ? (
                        <AppSwalSuccess
                            show={this.props.showFormSuccess}
                            title={this.props.contentMsg}
                            type={this.props.tipeSWAL}
                            handleClose={this.handleCloseSwal.bind(this)}
                        ></AppSwalSuccess>
                    ) : (
                        ""
                    )}
                    <AppModal
                        show={this.props.showFormDelete}
                        size="sm"
                        form={this.state.selected.status === "Approve" ? contentDelete : contentDeleteReject}
                        handleClose={this.handleClose.bind(this)}
                        backdrop="static"
                        keyboard={false}
                        title="Confirm"
                        titleButton={this.state.selected.status}
                        themeButton={
                            this.state.selected.status === "Approve" ? "success" : "danger"
                        }
                        isLoading={this.props.isAddLoading}
                        formSubmit={this.handleDelete.bind(this)}
                    ></AppModal>

                    <AppModal
                        show={selected.showImage}
                        form={showImg}
                        handleClose={this.handleClose.bind(this)}
                        keyboard={false}
                        title="View Photo"
                        isLoading={this.props.isAddLoading}
                        formSubmit={this.handleDelete.bind(this)}
                        modalFooter="none"
                    ></AppModal>

                </div>
                <div></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.dataNewBank.data || [],
        isLoading: state.dataNewBank.isLoading,
        isAddLoading: state.dataNewBank.isAddLoading,
        error: state.dataNewBank.error || null,
        errorPriority: state.dataNewBank.errorPriority || null,
        totalData: state.dataNewBank.totalData || 0,
        showFormAdd: state.dataNewBank.showFormAdd,
        contentMsg: state.dataNewBank.contentMsg,
        showFormSuccess: state.dataNewBank.showFormSuccess,
        showFormDelete: state.dataNewBank.showFormDelete,
        tipeSWAL: state.dataNewBank.tipeSWAL,
        user: state.auth.currentUser,
        allowedMenu: state.auth.allowedMenu,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
        },

        onDelete: (data) => {
            dispatch(updData(data));
        },
        showForm: (data) => {
            dispatch(addForm(data));
        },
        showConfirmDel: (data) => {
            dispatch(showConfirmDel(data));
        },
        closeSwal: () => {
            const _data = {};
            _data["showFormSuccess"] = false;
            _data["contentMsg"] = null;
            dispatch(addDataSuccess(_data));
        },
        clearErrProps: () => {
            dispatch(clearAddDataError());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToPros)(DataNewBank);
