import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
    addData,
    addDataSuccess,
    addForm,
    clearAddDataError,
    deleteData,
    fetchData,
    fetchDataDetail,
    fetchDataError,
    fetchDataLoading,
    showConfirmDel,
} from "./dataRefCodeService";
import {fetchData as fetchDataCabang} from "../data-cabang/dataCabangService";
import {fetchData as fetchDataTipeAkun} from "../data-tipe-akun/dataTipeAkunService";
import {Button, Form} from "react-bootstrap";
import AppModal from "../components/modal/MyModal";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import ReactDatatable from "@ashvin27/react-datatable";
import {SelectProvMulti} from "../components/modal/MySelect";
import {GetProfileAdmin} from "../components/login/LoginService";

class DataRefCode extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            ref_code_id: "",
            no_ref_code: "",
            cabang_id: "",
            total_akun: 0,
            nama_cabang: "",
            nama_ref_code: "",
            alias: ""
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
            isLoadingSelectedTipeAkun: false,
            selectOptionsTipeAkun: "",
            multiValueTipeAkun: [],
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
        this.setState({isLoadingSelectedTipeAkun: true, multiValueTipeAkun: []});
        let isLoading = true;
        let dataDetail;
        await fetchDataDetail(record.ref_code_id)
            .then((response) => {
                if (response.data.error_message === 0) {
                    dataDetail = response.data.payload;
                    const dataa = dataDetail.detail;
                    const options = this.props.dataTipeAkun.map((d) => ({
                        value: d.tipe_akun_id,
                        label: d.nama_tipe_akun_deskripsi,
                    }));
                    const dtTipeAKun = dataa.map((dta) => ({
                        value: dta.tipe_akun_id,
                        label: dta.nama_tipe_akun,
                    }));

                    setTimeout(() => {
                        this.setState({
                            ...this.state,
                            selectOptionsTipeAkun: options,
                            multiValueTipeAkun: dtTipeAKun,
                            isLoadingSelectedTipeAkun: false,
                        });
                    }, 400);
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
            selectOptionsTipeAkun: "",
            multiValueTipeAkun: [],
            isLoadingSelectedTipeAkun: false,
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
        if (name === "is_default") {
            val = event.target.checked ? "Y" : "N";
        }
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
            isLoadingSelectedTipeAkun: false,
        });
        const options = this.props.dataTipeAkun.map((d) => ({
            value: d.tipe_akun_id,
            label: d.nama_tipe_akun_deskripsi,
        }));

        setTimeout(() => {
            this.setState({
                ...this.state,
                selectOptionsTipeAkun: options,
                isLoadingSelectedTipeAkun: false,
            });
        }, 400);
        this.props.showForm(true);
    };

    handleSubmit = async () => {
        var errors = this.state.errMsg;
        this.setState({
            ...this.state,
            loadingForm: true,
        });
        errors.no_ref_code = !this.state.selected.no_ref_code
            ? "No. Ref Code required and 10 digits"
            : "";
        if (!errors.no_ref_code)
            errors.no_ref_code =
                this.state.selected.no_ref_code.length < 10
                    ? "No. Ref Code must be 10 digit"
                    : errors.no_ref_code;
        errors.cabang_id = !this.state.selected.cabang_id ? "Cabang required" : "";

        this.setState({errors});
        const detail = this.state.multiValueTipeAkun.map((d) => ({
            tipe_akun_id: d.value,
        }));
        const queryString = {
            ref_code_id: this.state.selected.ref_code_id
                ? this.state.selected.ref_code_id
                : "",
            no_ref_code: this.state.selected.no_ref_code
                ? this.state.selected.no_ref_code
                : "",
            is_default: this.state.selected.is_default
                ? this.state.selected.is_default
                : "N",
            cabang: this.state.selected.cabang_id
                ? this.state.selected.cabang_id
                : "",
            detail: detail ? detail : "",
            nama_ref_code: this.state.selected.nama_ref_code ? this.state.selected.nama_ref_code : "",
            alias: this.state.selected.alias ? this.state.selected.alias : "",
        };

        if (this.validateForm(this.state.errMsg)) {
            await this.props.onAdd(queryString);
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
        await this.props.onDelete(this.state.selected.ref_code_id);
    };

    handleMultiChangeTipeAkun(option) {
        this.setState((state) => {
            return {
                multiValueTipeAkun: option,
            };
        });
    }

    render() {
        const {data, dataCabang, allowedMenu} = this.props;
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
                key: "no_ref_code",
                text: "No Ref Code",
                align: "center",
                sortable: true,
            },
            {
                key: "total_akun",
                text: "Total Akun",
                align: "center",
                sortable: true,
            },
            {
                key: "nama_cabang",
                text: "Nama Cabang",
                align: "center",
                sortable: true,
            },
        ];
        if (
            allowedMenu &&
            (allowedMenu.ref_code_edit || allowedMenu.ref_code_delete)
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
                                    {allowedMenu && allowedMenu.ref_code_edit ? (
                                        <button
                                            className="btn btn-xs btn-success"
                                            onClick={(e) => this.editRecord(record)}
                                            style={{marginRight: "5px"}}
                                        >
                                            <i className="fa fa-edit"></i> Edit
                                        </button>
                                    ) : ''}
                                    {allowedMenu && allowedMenu.ref_code_delete ? (
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
            key_column: "ref_code_id",
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
                <Form.Group controlId="no_ref_code">
                    <Form.Label>No. Ref Code</Form.Label>
                    {errMsg.no_ref_code ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.no_ref_code}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        maxLength={10}
                        size="sm"
                        autoComplete="off"
                        name="no_ref_code"
                        type="text"
                        value={selected.no_ref_code}
                        onChange={this.handleChange.bind(this)}
                        placeholder="No. Ref Code"
                    />
                </Form.Group>

                <Form.Group controlId="nama_ref_code">
                    <Form.Label>Nama Ref Code</Form.Label>
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="nama_ref_code"
                        type="text"
                        value={selected.nama_ref_code}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Nama Ref Code"
                    />
                </Form.Group>

                <Form.Group controlId="alias">
                    <Form.Label>Alias</Form.Label>
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="alias"
                        type="text"
                        value={selected.alias}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Alias"
                    />
                </Form.Group>

                <Form.Group controlId="cabang_id">
                    <Form.Label>Cabang</Form.Label>
                    {errMsg.cabang_id ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.cabang_id}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        name="cabang_id"
                        size="sm"
                        value={selected.cabang_id ? selected.cabang_id : ""}
                        onChange={this.handleChange.bind(this)}
                        as="select"
                    >
                        <option value="">Pilih</option>
                        {dataCabang
                            ? dataCabang.map(function (dc) {
                                return (
                                    <option value={dc.cabang_id} key={dc.cabang_id}>
                                        {dc.nama_cabang}
                                    </option>
                                );
                            })
                            : ""}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="detail">
                    <Form.Label>Tipe Akun</Form.Label>
                    <SelectProvMulti
                        myVal={this.state.multiValueTipeAkun}
                        getData={this.state.selectOptionsTipeAkun}
                        isLoading={this.state.isLoadingSelectedTipeAkun}
                        onChange={this.handleMultiChangeTipeAkun.bind(this)}
                    />
                </Form.Group>
                <Form.Group controlId="is_default">
                    <Form.Check
                        checked={selected.is_default === "Y" ? true : false}
                        name="is_default"
                        value="Y"
                        type="checkbox"
                        onChange={this.handleChange.bind(this)}
                        style={{fontWeight: "bold"}}
                        label="Default"
                    />
                </Form.Group>
            </Form>
        );
        const contentDelete = (
            <div
                dangerouslySetInnerHTML={{
                    __html:
                        '<div id="caption" style=padding-bottom:20px;">Apakah anda yakin menghapus ref code ' + this.state.selected.no_ref_code + ' ?</div>',
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
                                    <h1 className="m-0">Data Ref Code</h1>
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
                                        {allowedMenu && allowedMenu.ref_code_add ? (
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
        data: state.dataRefCode.data || [],
        dataCabang: state.dataCabang.data || [],
        dataTipeAkun: state.dataTipeAkun.data || [],
        isLoading: state.dataRefCode.isLoading,
        isAddLoading: state.dataRefCode.isAddLoading,
        error: state.dataRefCode.error || null,
        errorPriority: state.dataRefCode.errorPriority || null,
        totalData: state.dataRefCode.totalData || 0,
        showFormAdd: state.dataRefCode.showFormAdd,
        contentMsg: state.dataRefCode.contentMsg,
        showFormSuccess: state.dataRefCode.showFormSuccess,
        showFormDelete: state.dataRefCode.showFormDelete,
        tipeSWAL: state.dataRefCode.tipeSWAL,
        user: state.auth.currentUser,
        allowedMenu: state.auth.currentUser.allowedMenu,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
            dispatch(fetchDataCabang(""));
            dispatch(fetchDataTipeAkun(""));
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

export default connect(mapStateToProps, mapDispatchToPros)(DataRefCode);
