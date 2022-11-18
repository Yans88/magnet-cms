import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
    addData,
    addDataSuccess,
    addForm,
    clearAddDataError,
    deleteData,
    fetchData,
    showConfirmDel,
} from "./dataRateService";
import {Button, Form} from "react-bootstrap";
import AppModal from "../components/modal/MyModal";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import ReactDatatable from "@ashvin27/react-datatable";
import NumberFormat from "react-number-format";
import {GetProfileAdmin} from "../components/login/LoginService";

class DataRate extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            rate_id: "",
            nama_rate: "",
            value: "",
            priority: "",
        };
        this.state = {
            sort_order: "ASC",
            sort_column: "name",
            keyword: "",
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
        this.props.onLoad(
            "?search=" +
            this.state.keyword +
            "&limit=" +
            this.state.per_page +
            "&start=" +
            (this.state.page_number - 1)
        );
    };

    editRecord = async (record) => {
        /* let dataDetail;
            await fetchDataDetail(record.rate_id).then((response) => {

                console.log(response.data)
                if (response.data.error_message === 0) {
                    dataDetail = response.data.payload;
                } else {

                    const errorpayload = {};
                    errorpayload['message'] = 'Something wrong';
                    errorpayload['status'] = response.data.error_message;
                    fetchDataError(errorpayload);
                    isLoading = false;
                    fetchDataLoading(isLoading);
                    return {};
                }
            }).catch((error) => {
                const errorpayload = {};
                errorpayload['message'] = 'Something wrong';
                errorpayload['status'] = error.response ? error.response.status : 404;
                fetchDataError(errorpayload);
                isLoading = false;
                fetchDataLoading(isLoading);
                return {};
            }) */
        this.setState({
            errMsg: this.initSelected,
            loadingForm: false,
            selected: record,
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
            queryString.per_page +
            "&start=" +
            (queryString.page_number - 1)
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
        this.props.showForm(true);
    };

    handleSubmit = async () => {
        var errors = this.state.errMsg;
        this.setState({
            ...this.state,
            loadingForm: true,
        });
        errors.nama_rate = !this.state.selected.nama_rate
            ? "Nama Rate required"
            : "";
        errors.priority = !this.state.selected.priority
            ? "Priority Number required"
            : "";
        errors.value = !this.state.selected.value ? "Value required" : "";
        this.setState({errors});
        if (this.validateForm(this.state.errMsg)) {
            var x = !Number.isInteger(this.state.selected.value)
                ? this.state.selected.value.replace(/,/g, "")
                : this.state.selected.value;
            var val = parseInt(this.state.selected.value ? x : 0);
            const qs = {
                ...this.state.selected,
                value: val,
            };
            await this.props.onAdd(qs);
            //this.props.onLoad("?search" + this.state.keyword + "&limit=" + this.state.per_page + "&start=" + (this.state.page_number - 1));
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

    handleDelete = async () => {
        await this.props.onDelete(this.state.selected.rate_id);
        this.props.onLoad(
            "?search" +
            this.state.keyword +
            "&limit=" +
            this.state.per_page +
            "&start=" +
            (this.state.page_number - 1)
        );
    };

    handleChangeNumberOnly = (evt) => {
        const number = evt.target.validity.valid
            ? evt.target.value
            : this.state.selected.priority;
        if (evt.target.validity.valid) {
            this.setState({
                loadingForm: false,
                errMsg: {...this.state.errMsg, priority: ""},
            });
        }
        this.setState({selected: {...this.state.selected, priority: number}});
    };

    render() {
        const {data, user, allowedMenu} = this.props;
        const {selected, errMsg} = this.state;
        var columns = [
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
                key: "nama_rate",
                text: "Nama Rate",
                align: "center",
                sortable: false,
            },
            {
                key: "value",
                text: "Value",
                align: "center",
                sortable: false,
                cell: (record) => {
                    return (
                        <div style={{textAlign: "right"}}>
                            <Fragment>
                                <NumberFormat
                                    value={record.value}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    displayType={"text"}
                                />
                            </Fragment>
                        </div>
                    );
                },
            },
            {
                key: "priority",
                text: "Priority",
                align: "center",
                sortable: false,
            },
        ];
        if (
            allowedMenu &&
            (allowedMenu.data_rete_edit || allowedMenu.data_rete_delete)
        ) {
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
                                    {allowedMenu && allowedMenu.data_rete_edit ? (
                                        <button
                                            className="btn btn-xs btn-success"
                                            onClick={(e) => this.editRecord(record)}
                                            style={{marginRight: "5px"}}
                                        >
                                            <i className="fa fa-edit"></i> Edit
                                        </button>
                                    ) : ''}
                                    {allowedMenu && allowedMenu.data_rete_delete ? (
                                        <button
                                            className="btn btn-danger btn-xs"
                                            onClick={() => this.deleteRecord(record)}
                                        >
                                            <i className="fa fa-trash"></i> Delete
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
            key_column: "rate_id",
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
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
        const frmUser = (
            <Form id="myForm">
                <Form.Group controlId="priority_number">
                    <Form.Label>Priority Number</Form.Label>
                    {this.props.errorPriority ? (
                        <span className="float-right text-error badge badge-danger">
              {this.props.errorPriority}
            </span>
                    ) : (
                        ""
                    )}
                    {errMsg.priority ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.priority}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="priority"
                        type="text"
                        pattern="[0-9]*"
                        onInput={this.handleChangeNumberOnly.bind(this)}
                        value={selected.priority}
                        onChange={this.handleChangeNumberOnly.bind(this)}
                        placeholder="Priority Number"
                    />
                </Form.Group>
                <Form.Group controlId="nama_rate">
                    <Form.Label>Nama Rate</Form.Label>
                    {errMsg.nama_rate ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.nama_rate}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="nama_rate"
                        type="text"
                        value={selected.nama_rate}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Nama Rate"
                    />
                </Form.Group>
                <Form.Group controlId="value">
                    <Form.Label>Value</Form.Label>
                    {errMsg.value ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.value}
            </span>
                    ) : (
                        ""
                    )}
                    <NumberFormat
                        value={selected.value ? selected.value : ""}
                        autoComplete="off"
                        onChange={this.handleChange.bind(this)}
                        className="form-control form-control-sm"
                        size="sm"
                        name="value"
                        thousandSeparator={true}
                        decimalScale={2}
                        inputMode="numeric"
                        placeholder="Value"
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

        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Data Rate</h1>
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
                                        {allowedMenu && allowedMenu.data_rete_add ? (
                                            <div className="card-header">
                                                <Button variant="success" onClick={this.discardChanges}>
                                                    <i className="fa fa-plus"></i> Add
                                                </Button>
                                            </div>
                                        ) : (
                                            ""
                                        )}

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
                        title="Delete Data"
                        titleButton="Delete"
                        themeButton="danger"
                        isLoading={this.props.isAddLoading}
                        formSubmit={this.handleDelete.bind(this)}
                    ></AppModal>
                </div>
                <div></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.dataRate.data || [],
        isLoading: state.dataRate.isLoading,
        isAddLoading: state.dataRate.isAddLoading,
        error: state.dataRate.error || null,
        errorPriority: state.dataRate.errorPriority || null,
        totalData: state.dataRate.totalData || 0,
        showFormAdd: state.dataRate.showFormAdd,
        contentMsg: state.dataRate.contentMsg,
        showFormSuccess: state.dataRate.showFormSuccess,
        showFormDelete: state.dataRate.showFormDelete,
        tipeSWAL: state.dataRate.tipeSWAL,
        user: state.auth.currentUser,
        allowedMenu: state.auth.currentUser.allowedMenu,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
        },
        onAdd: (data) => {
            dispatch(addData(data));
        },
        onDelete: (data) => {
            dispatch(deleteData(data));
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
            dispatch(fetchData("?search&limit=10&start=0"));
        },
        clearErrProps: () => {
            dispatch(clearAddDataError());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToPros)(DataRate);
