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
} from "./dataBankService";
import {Button, Figure, Form} from "react-bootstrap";
import AppModal from "../components/modal/MyModal";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import ReactDatatable from "@ashvin27/react-datatable";
import {GetProfileAdmin} from "../components/login/LoginService";

class DataBank extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            bank_id: "",
            nama_bank: "",
            file: "",
            imgUpload: "",
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
            selected: {...record, imgUpload: record.img},
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
        errors.nama_bank = !this.state.selected.nama_bank
            ? "Nama Bank required"
            : "";
        if (this.state.selected.file) {
            var fileSize = this.state.selected.file.size;
            if (fileSize > 2099200) {
                // satuan bytes 2099200 => 2MB
                errors.file = "File size over 2MB";
            }
        }
        this.setState({errors});
        if (this.validateForm(this.state.errMsg)) {
            await this.props.onAdd(this.state.selected);
            this.props.onLoad(
                "?search=" +
                this.state.keyword +
                "&limit=" +
                this.state.per_page +
                "&start=" +
                (this.state.page_number - 1)
            );
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
        this.props.onDelete(this.state.selected.bank_id);
        this.props.onLoad(
            "?search=" +
            this.state.keyword +
            "&limit=" +
            this.state.per_page +
            "&start=" +
            (this.state.page_number - 1)
        );
    }

    render() {
        const {data, allowedMenu} = this.props;
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
        ];
        if (allowedMenu && (allowedMenu.bank_edit || allowedMenu.bank_delete)) {
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
                                    {allowedMenu && allowedMenu.bank_edit ? (
                                        <button
                                            className="btn btn-xs btn-success"
                                            onClick={(e) => this.editRecord(record)}
                                            style={{marginRight: "5px"}}
                                        >
                                            <i className="fa fa-edit"></i> Edit
                                        </button>
                                    ) : ''}
                                    {allowedMenu && allowedMenu.bank_delete ? (
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
            key_column: "bank_id",
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
                <Form.Group controlId="nama_bank">
                    <Form.Label>Nama Bank</Form.Label>
                    {errMsg.nama_bank ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.nama_bank}
            </span>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        size="sm"
                        autoComplete="off"
                        name="nama_bank"
                        type="text"
                        value={selected.nama_bank}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Nama Bank"
                    />
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    {errMsg.file ? (
                        <span className="float-right text-error badge badge-danger">
              {errMsg.file}
            </span>
                    ) : null}
                    <Form.File
                        size="sm"
                        name="file"
                        setfieldvalue={selected.file}
                        onChange={this.handleChange.bind(this)}
                    />
                </Form.Group>
                {selected.imgUpload ? (
                    <Form.Group controlId="imagePreview">
                        <Figure>
                            <Figure.Image
                                thumbnail
                                width={130}
                                height={100}
                                alt=""
                                src={selected.imgUpload}
                            />
                        </Figure>
                    </Form.Group>
                ) : (
                    ""
                )}
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
                                    <h1 className="m-0">Data Bank</h1>
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
                                        {allowedMenu && allowedMenu.bank_add ? (
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
        data: state.dataBank.data || [],
        isLoading: state.dataBank.isLoading,
        isAddLoading: state.dataBank.isAddLoading,
        error: state.dataBank.error || null,
        errorPriority: state.dataBank.errorPriority || null,
        totalData: state.dataBank.totalData || 0,
        showFormAdd: state.dataBank.showFormAdd,
        contentMsg: state.dataBank.contentMsg,
        showFormSuccess: state.dataBank.showFormSuccess,
        showFormDelete: state.dataBank.showFormDelete,
        tipeSWAL: state.dataBank.tipeSWAL,
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
            dispatch(fetchData("?limit=10&start=" + 0));
        },
        clearErrProps: () => {
            dispatch(clearAddDataError());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToPros)(DataBank);
