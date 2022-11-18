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
} from "./dataBankPService";
import {fetchData as fetchDataBank} from "../data-bank/dataBankService";
import {Button, Form} from "react-bootstrap";
import AppModal from "../components/modal/MyModal";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import ReactDatatable from "@ashvin27/react-datatable";
import {GetProfileAdmin} from "../components/login/LoginService";

class DataBankPerusahaan extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            data_bank_perusahaan_id: "",
            bank: "",
            bank_id: "",
            nama_bank: "",
            no_rek: "",
            no_rek_usd: "",
            cabang: "",
            atas_nama: "",
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
        this.setState({
            errMsg: this.initSelected,
            loadingForm: false,
            selected: {...record, bank: record.bank_id},
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
        if (event.target.name === "file") {
            val = event.target.files[0];
            this.setState({
                selected: {...this.state.selected, imgUpload: "", file: ""},
            });
            if (!val) return;
            if (!val.name.match(/\.(jpg|jpeg|png)$/)) {
                this.setState({
                    loadingForm: true,
                    errMsg: {
                        ...this.state.errMsg,
                        file: "Please select valid image(.jpg .jpeg .png)",
                    },
                });

                //setLoading(true);
                return;
            }
            if (val.size > 2099200) {
                this.setState({
                    loadingForm: true,
                    errMsg: {...this.state.errMsg, file: "File size over 2MB"},
                });

                //setLoading(true);
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(val);
            reader.onloadend = () => {
                this.setState({
                    loadingForm: false,
                    selected: {
                        ...this.state.selected,
                        imgUpload: reader.result,
                        file: val,
                    },
                });
            };
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
        });
        this.props.showForm(true);
    };

    handleSubmit = async () => {
        var errors = this.state.errMsg;
        this.setState({
            ...this.state,
            loadingForm: true,
        });
        errors.bank = !this.state.selected.bank ? "Nama Bank required" : "";
        if (this.state.selected.file) {
            var fileSize = this.state.selected.file.size;
            if (fileSize > 2099200) {
                // satuan bytes 2099200 => 2MB
                errors.file = "File size over 2MB";
            }
        }
        this.setState({errors});
        if (this.validateForm(this.state.errMsg)) {
            const saveData = {
                ...this.state.selected,
                bank: this.state.selected.bank_id,
            };
            await this.props.onAdd(this.state.selected);
            // this.props.onLoad("?search="+this.state.keyword+"&limit="+this.state.per_page+"&start="+(this.state.page_number - 1));
        } else {
            console.error("Invalid Form");
        }
    };

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }

    handleDelete() {
        this.props.onDelete(this.state.selected.data_bank_perusahaan_id);
        //this.props.onLoad("?search="+this.state.keyword+"&limit="+this.state.per_page+"&start="+(this.state.page_number - 1));
    }

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
        const {data, dataBank, allowedMenu} = this.props;
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
                key: "nama_bank",
                text: "Nama Bank",
                align: "center",
                sortable: true,
                cell: (record) => {
                    return (
                        <Fragment>
                            {record.nama_bank} <br/> Cabang : {record.cabang}
                            <br/> a.n : {record.atas_nama}
                        </Fragment>
                    );
                },
            },
            {
                key: "no_rek",
                text: "No. Rekening",
                align: "center",
                sortable: true,
                cell: (record) => {
                    return (
                        <Fragment>
                            IDR : {record.no_rek} <br/> USD : {record.no_rek_usd}
                        </Fragment>
                    );
                },
            },
            {
                key: "file",
                text: "Image",
                align: "center",
                sortable: true,
                cell: (record) => {
                    return (
                        <div>
                            <img src={record.file} height={100} alt=""/>
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
            (allowedMenu.bank_perusahaan_edit || allowedMenu.bank_perusahaan_delete)
        ) {
            columns = [
                ...columns,
                {
                    key: "action",
                    text: "Action",
                    width: 80,
                    align: "center",
                    sortable: false,
                    cell: (record) => {
                        return (
                            <div style={{textAlign: "center"}}>
                                <Fragment>
                                    {allowedMenu && allowedMenu.bank_perusahaan_edit ? (
                                        <div>
                                            <button
                                                className="btn btn-xs btn-success"
                                                onClick={(e) => this.editRecord(record)}
                                                style={{marginBottom: "5px", width: 60}}
                                            >
                                                <i className="fa fa-edit"></i> Edit
                                            </button>
                                            <br/>
                                        </div>
                                    ) : ''}
                                    {allowedMenu && allowedMenu.bank_perusahaan_delete ? (
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
            key_column: "data_bank_perusahaan_id",
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
                <Form.Group controlId="bank">
                    <Form.Label>Nama Bank</Form.Label>
                    {errMsg.bank ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.bank}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="bank"
                        as="select"
                        value={selected.bank}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Bank"
                    >
                        <option>Pilih Bank</option>
                        {dataBank.map((item, index) => {
                            return (
                                <option key={index} value={item.bank_id}>
                                    {item.nama_bank}
                                </option>
                            );
                        })}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="cabang">
                    <Form.Label>Cabang</Form.Label>
                    {errMsg.cabang ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.cabang}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="cabang"
                        type="text"
                        value={selected.cabang}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Cabang"
                    />
                </Form.Group>

                <Form.Group controlId="atas_nama">
                    <Form.Label>Atas Nama</Form.Label>
                    {errMsg.atas_nama ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.atas_nama}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="atas_nama"
                        type="text"
                        value={selected.atas_nama}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Atas Nama"
                    />
                </Form.Group>

                <Form.Group controlId="no_rek">
                    <Form.Label>No.Rekening IDR</Form.Label>
                    {errMsg.no_rek ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.no_rek}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="no_rek"
                        type="text"
                        value={selected.no_rek}
                        onChange={this.handleChange.bind(this)}
                        placeholder="No.Rekening IDR"
                    />
                </Form.Group>

                <Form.Group controlId="no_rek_usd">
                    <Form.Label>No.Rekening USD</Form.Label>
                    {errMsg.no_rek_usd ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.no_rek_usd}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="no_rek_usd"
                        type="text"
                        value={selected.no_rek_usd}
                        onChange={this.handleChange.bind(this)}
                        placeholder="No.Rekening USD"
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
                                    <h1 className="m-0">Data Bank Perushaan</h1>
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
                                        {allowedMenu && allowedMenu.bank_perusahaan_add ? (
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
        data: state.dataBankPerushaan.data || [],
        dataBank: state.dataBank.data || [],
        isLoading: state.dataBankPerushaan.isLoading,
        isAddLoading: state.dataBankPerushaan.isAddLoading,
        error: state.dataBankPerushaan.error || null,
        errorPriority: state.dataBankPerushaan.errorPriority || null,
        totalData: state.dataBankPerushaan.totalData || 0,
        showFormAdd: state.dataBankPerushaan.showFormAdd,
        contentMsg: state.dataBankPerushaan.contentMsg,
        showFormSuccess: state.dataBankPerushaan.showFormSuccess,
        showFormDelete: state.dataBankPerushaan.showFormDelete,
        tipeSWAL: state.dataBankPerushaan.tipeSWAL,
        user: state.auth.currentUser,
        allowedMenu: state.auth.currentUser.allowedMenu,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
            dispatch(fetchDataBank(""));
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
            dispatch(fetchData("?limit=10&start=" + 0));
        },
        clearErrProps: () => {
            dispatch(clearAddDataError());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToPros)(DataBankPerusahaan);
