import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
    addDataSuccess,
    addForm,
    apprData,
    clearAddDataError,
    fetchData,
    rejectData,
    showConfirmAppr,
    showConfirmDel,
} from "./dataListApproveService";
import {Col, Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import AppModal from "../components/modal/MyModal";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import ReactDatatable from "@ashvin27/react-datatable";
import "react-datetime/css/react-datetime.css";
import {Link} from "react-router-dom";
import {GetProfileAdmin} from "../components/login/LoginService";
import moment from "moment/moment";

class DataListApprove extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            tipe_akun_id: "",
            nama_tipe_akun: "",
            deposit: "",
            leverage: "",
            lot_minimum: "",
            lot_maximum: "",
            spread: "",
            rate_id: "",
            komisi: "",
        };
        this.state = {
            order: "ASC",
            order_by: "name",
            keyword: "",
            page_number: 1,
            per_page: 10,
            status: "",
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
            "?search=" +
            this.state.keyword +
            "&limit=" +
            this.state.per_page +
            "&start=" +
            (this.state.page_number - 1) +
            "&status=" +
            this.state.status
        );
        this.props.onLoadRate("");
    };

    approveRecord = (record) => {
        this.setState({
            selected: record,
        });
        this.props.showConfirmApprove(true);
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

    handleDelete = async () => {
        await this.props.onDelete(this.state.selected.user_id);
    };

    handleApprove = async () => {
        await this.props.onApprove(this.state.selected.user_id);
    };

    detailRecord = async (record) => {
        await sessionStorage.setItem("user_id", record.user_id);
        await sessionStorage.setItem("data_tipe_akun_id", record.data_tipe_akun_id);
        if (record.tipe === "Pendaftaran") {
            window.location.href = "/admin-magnet/detail-user-cabinet";
        } else {
            window.location.href = "/admin-magnet/detail-list-approve";
        }
    };

    tableChangeHandler = (data) => {
        let queryString = this.state;
        let sorting = '';
        Object.keys(data).map((key) => {
            if (key === "sort_order" && data[key]) {
                queryString.order = data[key].order.toUpperCase();
                queryString.order_by = data[key].column;
                sorting = "&order=" + queryString.order + "&order_by=" + queryString.order_by;
            }
            if (key === "page_number") {
                sorting = '';
                queryString.page_number = data[key];
            }
            if (key === "page_size") {
                sorting = '';
                queryString.per_page = data[key];
            }
            // if (key === "filter_value") {
            // queryString.keyword = data[key];
            // }
            return true;
        });

        this.props.onLoad(
            "?search=" +
            this.state.keyword +
            "&limit=" +
            queryString.per_page +
            "&start=" +
            (queryString.page_number - 1) +
            "&status=" +
            this.state.status + sorting
        );
    };

    handleChange2(event) {
        var {name, value} = event.target;
        var val = value;

        this.setState({
            ...this.state,
            [name]: val,
        });
        if (name === "status")
            this.props.onLoad(
                "?search=" +
                this.state.keyword +
                "&limit=" +
                this.state.per_page +
                "&start=" +
                (this.state.page_number - 1) +
                "&status=" +
                val
            );
        if (name === "keyword")
            this.props.onLoad(
                "?search=" +
                val +
                "&limit=" +
                this.state.per_page +
                "&start=" +
                (this.state.page_number - 1) +
                "&status=" +
                this.state.status
            );
    }

    render() {
        const {data} = this.props;

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
                key: "created_at",
                text: "Tanggal Registrasi",
                width: 150,
                align: "center",
                sortable: true,
                cell: record => {
                    return (moment(new Date(record.created_at)).format('DD-MM-YYYY HH:mm'))
                }
            },
            {
                key: "nama",
                text: "Nama Akun",
                align: "center",
                sortable: true,
                cell: (record) => {
                    return (
                        <Fragment>
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-right">View Detail</Tooltip>}
                            >
                                <Link
                                    to={
                                        record.tipe === "Pendaftaran"
                                            ? "/detail-user-cabinet"
                                            : "/detail-list-approve"
                                    }
                                    onClick={() => this.detailRecord(record)}
                                >
                                    {record.nama}
                                </Link>
                            </OverlayTrigger>
                        </Fragment>
                    );
                },
            },
            {
                key: "email",
                text: "Email",
                align: "center",
                sortable: true,
                width: 270,
            },
            {
                key: "nama_rate",
                text: "Rate",
                align: "center",
                sortable: true,
                width: 120,
            },
            {
                key: "nama_tipe_akun",
                text: "Tipe Akun",
                align: "center",
                sortable: true,
                width: 200,
            },

            {
                key: "status",
                text: "Status",
                width: 150,
                align: "center",
                sortable: true,
                cell: (record) => {
                    return (
                        <Fragment>
                            {record.status}
                            {/* {record.status === 'Menunggu Verifikasi' ? (
								<div>
                                <button
                                    className="btn btn-xs btn-success"
                                    onClick={e => this.approveRecord(record)}
                                    >
                                    <i className="fa fa-check"></i> Approve
                                </button><br/>
                               <button
							   style={{marginTop:'3px', width:70}}
                                    className="btn btn-xs btn-danger"
                                    onClick={e => this.deleteRecord(record)}
                                    >
                                    <i className="fa fa-times"></i> Reject
                                </button></div>) : ''
								} */}
                        </Fragment>
                    );
                },
            },
        ];
        const config = {
            key_column: "_key",
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: false,
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

        const contentDelete = (
            <div
                dangerouslySetInnerHTML={{
                    __html:
                        '<div id="caption" style=padding-bottom:20px;">Apakah anda yakin <br/> <strong>menolak</strong> data ini ?</div>',
                }}
            />
        );

        const contentAppr = (
            <div
                dangerouslySetInnerHTML={{
                    __html:
                        '<div id="caption" style=padding-bottom:20px;">Apakah anda yakin <br/> <strong>menyetujui</strong> data ini ?</div>',
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
                                    <h1 className="m-0">Data Request Account</h1>
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
                                                <div className="pull-right col-6 offset-md-7">
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
                                                                    <option>All Status</option>
                                                                    <option
                                                                        value="Approve"
                                                                        selected={this.state.status === "Approve"}
                                                                    >
                                                                        Approve{" "}
                                                                    </option>
                                                                    <option
                                                                        value="Menunggu Verifikasi"
                                                                        selected={
                                                                            this.state.status ===
                                                                            "Menunggu Verifikasi"
                                                                        }
                                                                    >
                                                                        Menunggu verifikasi{" "}
                                                                    </option>
                                                                    <option
                                                                        value="Reject"
                                                                        selected={this.state.status === "Reject"}
                                                                    >
                                                                        Reject{" "}
                                                                    </option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="keyword">
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
                        title="Reject Data"
                        titleButton="Reject"
                        themeButton="danger"
                        isLoading={this.props.isAddLoading}
                        formSubmit={this.handleDelete.bind(this)}
                    ></AppModal>

                    <AppModal
                        show={this.props.showConfirmAppr}
                        size="sm"
                        form={contentAppr}
                        handleClose={this.handleClose.bind(this)}
                        backdrop="static"
                        keyboard={false}
                        title="Approve Data"
                        titleButton="Approve"
                        themeButton="success"
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
        data: state.dataListApprove.data || [],

        isLoading: state.dataListApprove.isLoading,
        isAddLoading: state.dataListApprove.isAddLoading,
        error: state.dataListApprove.error || null,
        errorPriority: state.dataListApprove.errorPriority || null,
        totalData: state.dataListApprove.totalData || 0,
        showFormAdd: state.dataListApprove.showFormAdd,
        contentMsg: state.dataListApprove.contentMsg,
        showFormSuccess: state.dataListApprove.showFormSuccess,
        showFormDelete: state.dataListApprove.showFormDelete,
        showConfirmAppr: state.dataListApprove.showConfirmAppr,
        tipeSWAL: state.dataListApprove.tipeSWAL,
        user: state.auth.currentUser,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
        },
        onLoadRate: (queryString) => {
        },
        onApprove: (data) => {
            dispatch(apprData(data));
        },
        onDelete: (data) => {
            dispatch(rejectData(data));
        },
        showForm: (data) => {
            dispatch(addForm(data));
        },
        showConfirmDel: (data) => {
            dispatch(showConfirmDel(data));
        },
        showConfirmApprove: (data) => {
            dispatch(showConfirmAppr(data));
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

export default connect(mapStateToProps, mapDispatchToPros)(DataListApprove);
