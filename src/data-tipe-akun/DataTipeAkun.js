import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
    addData,
    addDataSuccess,
    addForm,
    clearAddDataError,
    deleteData,
    fetchData,
    fetchDataListGroup,
    showConfirmDel,
} from "./dataTipeAkunService";
import {fetchData as fetchDataRate} from "../data-rate/dataRateService";
import {Button, Col, Form} from "react-bootstrap";
import AppModal from "../components/modal/MyModal";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import ReactDatatable from "@ashvin27/react-datatable";
import "react-datetime/css/react-datetime.css";
import NumberFormat from "react-number-format";
import {GetProfileAdmin} from "../components/login/LoginService";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

class DataTipeAkun extends Component {
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
            komisi: "",
            ketentuan: "",
            deskripsi: "",
            groupdemo: "",
            groupreal10k: "",
            groupreal14k: "",
            grouprealusd: "",
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
        this.props.onLoadRate("");
    };

    editRecord = (record) => {
        this.setState({
            loadingForm: false,
            errMsg: this.initSelected,
            selected: {...record, rate: record.rate_id},
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

    handleChangeDesk(name, value) {
        const dt = {};
        dt["key"] = name;
        dt["value"] = value;
        this.setState({
            loadingForm: false,
            errMsg: {...this.state.errMsg, [name]: ""},
            selected: {
                ...this.state.selected,
                [name]: value,
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
        errors.nama_tipe_akun = !this.state.selected.nama_tipe_akun
            ? "Required"
            : "";
        errors.deposit = !this.state.selected.deposit ? "Required" : "";
        errors.leverage = !this.state.selected.leverage ? "Required" : "";
        errors.lot_minimum = !this.state.selected.lot_minimum ? "Required" : "";
        errors.lot_maximum = !this.state.selected.lot_maximum ? "Required" : "";
        errors.spread = !this.state.selected.spread ? "Required" : "";
        //errors.rate_id = !this.state.selected.rate_id ? "Required" : "";
        errors.komisi = !this.state.selected.komisi ? "Required" : "";
        this.setState({errors});
        if (this.validateForm(this.state.errMsg)) {
            const saveData = {
                ...this.state.selected,
                // rate: this.state.selected.rate_id,
                deposit: parseInt(
                    this.state.selected.deposit
                        ? this.state.selected.deposit.toString().replace(/,/g, "")
                        : 0
                ),
            };
            await this.props.onAdd(saveData);
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
        await this.props.onDelete(this.state.selected.tipe_akun_id);
    };

    render() {
        const {data, dataRate, allowedMenu, listReal, listDemo} = this.props;
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
                key: "nama_tipe_akun",
                text: "Nama Tipe Akun",
                align: "center",
                sortable: true,
            },
            {
                key: "deposit",
                text: "Deposit",
                align: "center",
                sortable: true,
                cell: (record) => {
                    return (
                        <div style={{textAlign: "right"}}>
                            <Fragment>
                                <NumberFormat
                                    value={record.deposit}
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
                key: "leverage",
                text: "Leverage",
                align: "center",
                sortable: true,
            },
            {
                key: "lot_minimum",
                text: "Lot Minimum",
                align: "center",
                sortable: true,
            },
            {
                key: "lot_maximum",
                text: "Lot Maximum",
                align: "center",
                sortable: true,
            },
            {
                key: "spread",
                text: "Spread",
                align: "center",
                sortable: true,
            },
            {
                key: "komisi",
                text: "Komisi",
                align: "center",
                sortable: true,
            },
        ];

        if (
            allowedMenu &&
            (allowedMenu.tipe_akun_edit || allowedMenu.tipe_akun_delete)
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
                                    {allowedMenu && allowedMenu.tipe_akun_edit ? (
                                        <button
                                            className="btn btn-xs btn-success"
                                            onClick={(e) => this.editRecord(record)}
                                            style={{marginRight: "5px"}}
                                        >
                                            <i className="fa fa-edit"></i> Edit
                                        </button>
                                    ) : ''}
                                    {allowedMenu && allowedMenu.tipe_akun_delete ? (
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
            key_column: "tipe_akun_id",
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
                <Form.Row>
                    <Form.Group as={Col} xs={6} controlId="nama_tipe_akun">
                        <Form.Label>Nama Tipe Akun</Form.Label>
                        {errMsg.nama_tipe_akun ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.nama_tipe_akun}
              </span>
                        ) : (
                            ""
                        )}
                        <Form.Control
                            size="sm"
                            autoComplete="off"
                            name="nama_tipe_akun"
                            type="text"
                            value={selected.nama_tipe_akun}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Nama Tipe Akun"
                        />
                    </Form.Group>

                    <Form.Group as={Col} xs={6} controlId="deposit">
                        <Form.Label>Deposit</Form.Label>
                        {errMsg.deposit ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.deposit}
              </span>
                        ) : (
                            ""
                        )}
                        <NumberFormat
                            name="deposit"
                            onChange={this.handleChange.bind(this)}
                            className="form-control form-control-sm"
                            value={selected.deposit}
                            thousandSeparator={true}
                            decimalScale={2}
                            inputMode="numeric"
                            required
                            autoComplete="off"
                            placeholder="Deposit"
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} xs={6} controlId="leverage">
                        <Form.Label>Leverage</Form.Label>
                        {errMsg.leverage ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.leverage}
              </span>
                        ) : (
                            ""
                        )}
                        <Form.Control
                            size="sm"
                            autoComplete="off"
                            name="leverage"
                            type="text"
                            value={selected.leverage}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Leverage"
                        />
                    </Form.Group>

                    <Form.Group as={Col} xs={6} controlId="lot_minimum">
                        <Form.Label>Lot Minimum</Form.Label>
                        {errMsg.lot_minimum ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.lot_minimum}
              </span>
                        ) : (
                            ""
                        )}
                        <Form.Control
                            size="sm"
                            autoComplete="off"
                            name="lot_minimum"
                            type="text"
                            value={selected.lot_minimum}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Lot Minimum"
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} xs={6} controlId="spread">
                        <Form.Label>Spread</Form.Label>
                        {errMsg.spread ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.spread}
              </span>
                        ) : (
                            ""
                        )}
                        <Form.Control
                            size="sm"
                            autoComplete="off"
                            name="spread"
                            type="text"
                            value={selected.spread}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Spread"
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={6} controlId="lot_maximum">
                        <Form.Label>Lot Maximum</Form.Label>
                        {errMsg.lot_maximum ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.lot_maximum}
              </span>
                        ) : (
                            ""
                        )}
                        <Form.Control
                            size="sm"
                            autoComplete="off"
                            name="lot_maximum"
                            type="text"
                            value={selected.lot_maximum}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Lot Maximum"
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>


                    <Form.Group as={Col} xs={12} controlId="komisi">
                        <Form.Label>Komisi</Form.Label>
                        {errMsg.komisi ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.komisi}
              </span>
                        ) : (
                            ""
                        )}
                        <Form.Control
                            size="sm"
                            autoComplete="off"
                            name="komisi"
                            type="text"
                            value={selected.komisi}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Komisi"
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} xs={6} controlId="groupdemo">
                        <Form.Label>Group Demo</Form.Label>
                        {errMsg.groupdemo ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.groupdemo}
              </span>
                        ) : (
                            ""
                        )}
                        <Form.Control
                            size="sm"
                            autoComplete="off"
                            name="groupdemo"
                            as="select"
                            value={selected.groupdemo}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Group Demo"
                        >
                            <option>Pilih Group Demo</option>
                            {listDemo.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} xs={6} controlId="groupreal10k">
                        <Form.Label>Group Real 10k</Form.Label>
                        {errMsg.groupreal10k ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.groupreal10k}
              </span>
                        ) : (
                            ""
                        )}
                        <Form.Control
                            size="sm"
                            autoComplete="off"
                            name="groupreal10k"
                            as="select"
                            value={selected.groupreal10k}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Group Real 10k"
                        >
                            <option>Pilih Group Real 10k</option>
                            {listReal.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} xs={6} controlId="groupreal14k">
                        <Form.Label>Group Real 14k</Form.Label>
                        {errMsg.groupreal14k ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.groupreal14k}
              </span>
                        ) : (
                            ""
                        )}
                        <Form.Control
                            size="sm"
                            autoComplete="off"
                            name="groupreal14k"
                            as="select"
                            value={selected.groupreal14k}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Group Real 14k"
                        >
                            <option>Pilih Group Real 14k</option>
                            {listReal.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} xs={6} controlId="grouprealusd">
                        <Form.Label>Group Real USD</Form.Label>
                        {errMsg.grouprealusd ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.grouprealusd}
              </span>
                        ) : (
                            ""
                        )}
                        <Form.Control
                            size="sm"
                            autoComplete="off"
                            name="grouprealusd"
                            as="select"
                            value={selected.grouprealusd}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Group Real USD"
                        >
                            <option>Pilih Group Real USD</option>
                            {listReal.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>


                    <Form.Group as={Col} xs={12} controlId="deskripsi">
                        <Form.Label>Deskripsi</Form.Label>
                        {errMsg.deskripsi ? (
                            <span className="float-right text-error badge badge-danger">
                {errMsg.deskripsi}
              </span>
                        ) : (
                            ""
                        )}
                        <Form.Control
                            size="sm"
                            autoComplete="off"
                            name="deskripsi"
                            type="text"
                            value={selected.deskripsi}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Deskripsi"
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group controlId="ketentuan">
                        <Form.Label>Ketentuan</Form.Label>
                        <SunEditor
                            defaultValue={selected.ketentuan}
                            setContents={selected.ketentuan}
                            onChange={this.handleChangeDesk.bind(this, "ketentuan")}
                            setOptions={{
                                placeholder: "Ketentuan ...",
                                maxHeight: 200,
                                height: 200,
                                buttonList: [
                                    [
                                        "fontSize",
                                        "formatBlock",
                                        "bold",
                                        "underline",
                                        "italic",
                                        "align",
                                        "horizontalRule",
                                        "list",
                                        "lineHeight",
                                        "link",
                                        "strike",
                                        "subscript",
                                        "superscript",
                                        "codeView",
                                        "undo",
                                        "redo",
                                        "fontColor",
                                        "hiliteColor",
                                        "textStyle",
                                        "paragraphStyle",
                                        "blockquote",
                                        "removeFormat",
                                    ],
                                ],
                            }}
                        />
                    </Form.Group>
                </Form.Row>
            </Form>
        );
        const contentDelete = (
            <div
                dangerouslySetInnerHTML={{
                    __html:
                        '<div id="caption" style=padding-bottom:20px;">Apakah anda yakin menghapus tipe akun ' + this.state.selected.nama_tipe_akun + ' ?</div>',
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
                                    <h1 className="m-0">Data Tipe Akun</h1>
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
                                        {allowedMenu && allowedMenu.tipe_akun_add ? (
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
                        size="lg"
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
                            handleClose={this.props.tipeSWAL === 'success' ? this.props.closeSwal : this.props.closeSwalError}
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
        data: state.dataTipeAkun.data || [],
        dataRate: state.dataRate.data || [],
        listDemo: state.dataTipeAkun.dataListGroup.demo || [],
        listReal: state.dataTipeAkun.dataListGroup.real || [],
        isLoading: state.dataTipeAkun.isLoading,
        isAddLoading: state.dataTipeAkun.isAddLoading,
        error: state.dataTipeAkun.error || null,
        errorPriority: state.dataTipeAkun.errorPriority || null,
        totalData: state.dataTipeAkun.totalData || 0,
        showFormAdd: state.dataTipeAkun.showFormAdd,
        contentMsg: state.dataTipeAkun.contentMsg,
        showFormSuccess: state.dataTipeAkun.showFormSuccess,
        showFormDelete: state.dataTipeAkun.showFormDelete,
        tipeSWAL: state.dataTipeAkun.tipeSWAL,
        user: state.auth.currentUser,
        allowedMenu: state.auth.currentUser.allowedMenu,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
            dispatch(fetchDataListGroup());
        },
        onLoadRate: (queryString) => {
            dispatch(fetchDataRate(queryString));
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
        closeSwalError: () => {
            const _data = {};
            _data["showFormSuccess"] = false;
            _data["contentMsg"] = null;
            dispatch(addDataSuccess(_data));
            dispatch(addForm(true));
        },
        clearErrProps: () => {
            dispatch(clearAddDataError());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToPros)(DataTipeAkun);
