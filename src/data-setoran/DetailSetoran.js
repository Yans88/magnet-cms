import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
    addDataSuccess,
    addForm,
    clearAddDataError,
    fetchDataDetail,
    showConfirmDel,
    updData,
} from "./dataSetoranService";
import {Button, Figure, Form} from "react-bootstrap";
import AppModal from "../components/modal/MyModal";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import moment from "moment";
import "moment/locale/id";
import "react-datetime/css/react-datetime.css";
import NumberFormat from "react-number-format";

class DetailSetoran extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            setor_id: "",
            keterangan: "",
            status: "",
            showImage: false,
        };
        this.state = {
            showImage: false,
            setor_id: "",
            status: "",
            login: "",
            name: "",
            setor: "",
            rate: "",
            created_at: "",
            file_bukti_setor: "",
            selected: this.initSelected,
            errMsg: this.initSelected,
            loadingForm: false,
        };
    }

    componentDidMount = async () => {
        let isLoading = true;
        const setor_id = sessionStorage.getItem("setor_id");
        this.setState({setor_id: setor_id});
        await fetchDataDetail(setor_id)
            .then((response) => {
                let dataRes = response.data;
                if (dataRes.error_message === 0) {
                    let payload = dataRes.payload;
                    this.setState({
                        login: payload.login,
                        name: payload.name,
                        setor: payload.setor,
                        rate: payload.rate,
                        file_bukti_setor: payload.file_bukti_setor,
                        created_at: payload.created_at,
                        status: payload.status,
                    });
                    isLoading = false;
                    // fetchDataLoading(isLoading);
                } else {
                    const errorpayload = {};
                    errorpayload["message"] = "Something wrong";
                    errorpayload["status"] = response.data.error_message;
                    // fetchDataError(errorpayload);
                    isLoading = false;
                    // fetchDataLoading(isLoading);
                    //this.props.history.goBack();
                }
            })
            .catch((error) => {
                const errorpayload = {};
                errorpayload["message"] = "Something wrong";
                errorpayload["status"] = error.response ? error.response.status : 404;
                // fetchDataError(errorpayload);
                isLoading = false;
                // fetchDataLoading(isLoading);
                //this.props.history.goBack();
            });
    };

    rejectRecord = (record) => {
        this.setState({
            selected: {
                setor_id: this.state.setor_id,
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
                setor_id: this.state.setor_id,
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
        window.location.reload();
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
        errors.keterangan = !this.state.selected.keterangan ? "Required" : "";
        this.setState({errors});
        if (this.validateForm(this.state.errMsg)) {
            const queryString = {
                setor_id: this.state.selected.setor_id,
                status: this.state.selected.status,
                keterangan: this.state.selected.keterangan,
            };
            await this.props.onDelete(queryString);
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

    detailRecord = async (record) => {
        await sessionStorage.setItem("setor_id", record.setor_id);
        window.location.href = "/admin-magnet/detail-setoran";
    };

    render() {
        const {data, allowedMenu} = this.props;
        const {selected, errMsg} = this.state;

        const contentDelete = (
            <Form id="myForm">
                <div id="caption">Apakah anda yakin ?</div>
                {errMsg.keterangan ? (
                    <span className="float-right text-error badge badge-danger">
            {errMsg.keterangan}
          </span>
                ) : (
                    ""
                )}
                <Form.Group controlId="keterangan">
                    <Form.Control
                        rows={5}
                        name="keterangan"
                        size="sm"
                        autoComplete="off"
                        as="textarea"
                        value={selected.keterangan ? selected.keterangan : ""}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Keterangan . . ."
                    />
                </Form.Group>
            </Form>
        );

        const showImg = (
            <Figure style={{marginTop: ".3rem", marginBottom: 0}}>
                <Figure.Image
                    width={450}
                    height={400}
                    src={this.state.file_bukti_setor ? this.state.file_bukti_setor : ""}
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
                                    <h1 className="m-0">Detail Setoran</h1>
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
                                            <table className="table">
                                                <tbody>
                                                <tr>
                                                    <td
                                                        className="text-center text-bold table-active"
                                                        colSpan="3"
                                                    >
                                                        DATA SETORAN
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold" width="35%">
                                                        Tanggal
                                                    </td>
                                                    <td className="text-bold" width="1%">
                                                        :
                                                    </td>
                                                    <td>{this.state.created_at ? moment(new Date(this.state.created_at)).format("DD-MM-YYYY") : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold" width="35%">
                                                        Login
                                                    </td>
                                                    <td className="text-bold" width="1%">
                                                        :
                                                    </td>
                                                    <td>{this.state.login}</td>
                                                </tr>

                                                <tr>
                                                    <td className="text-bold" width="35%">
                                                        Nama
                                                    </td>
                                                    <td className="text-bold" width="1%">
                                                        :
                                                    </td>
                                                    <td>{this.state.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold" width="35%">
                                                        Rate
                                                    </td>
                                                    <td className="text-bold" width="1%">
                                                        :
                                                    </td>
                                                    <td><NumberFormat
                                                        value={this.state.rate}
                                                        thousandSeparator={true}
                                                        decimalScale={2}
                                                        displayType={"text"}
                                                    /></td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold" width="35%">
                                                        Jumlah
                                                    </td>
                                                    <td className="text-bold" width="1%">
                                                        :
                                                    </td>
                                                    <td><NumberFormat
                                                        value={this.state.setor}
                                                        thousandSeparator={true}
                                                        decimalScale={2}
                                                        displayType={"text"}
                                                    /></td>
                                                </tr>
                                                {this.state.rate > 0 && (
                                                    <tr>
                                                        <td className="text-bold" width="35%">
                                                            Nominal IDR
                                                        </td>
                                                        <td className="text-bold" width="1%">
                                                            :
                                                        </td>
                                                        <td><NumberFormat
                                                            value={this.state.setor * this.state.rate}
                                                            thousandSeparator={true}
                                                            decimalScale={2}
                                                            displayType={"text"}
                                                        /></td>
                                                    </tr>)}

                                                <tr>
                                                    <td className="text-bold" width="35%">
                                                        Bukti Setor
                                                    </td>
                                                    <td className="text-bold" width="1%">
                                                        :
                                                    </td>
                                                    <td>
                                                        <Figure
                                                            onClick={(e) => this.showImg(this.state.file_bukti_setor)}
                                                            style={{marginTop: ".3rem", marginBottom: 0}}
                                                        >
                                                            <Figure.Image thumbnail width={150} height={120}
                                                                          src={this.state.file_bukti_setor}/>
                                                        </Figure>

                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <Button
                                                variant="primary"
                                                onClick={() => this.props.history.goBack()}
                                            >
                                                <i className="fa fa-arrow-left"></i> Back
                                            </Button>
                                            &nbsp;

                                            {this.state.status === "Waiting Approve" && (

                                                <Fragment>
                                                    {allowedMenu && allowedMenu.data_setoran_waiting_approve_approve ? (
                                                        <Button
                                                            variant="danger"
                                                            onClick={this.rejectRecord.bind(this)}
                                                        >
                                                            <i className="fa fa-times"></i> Reject
                                                        </Button>
                                                    ) : ''}
                                                    &nbsp;
                                                    {allowedMenu && allowedMenu.data_setoran_waiting_approve_reject ? (
                                                        <Button
                                                            variant="success"
                                                            onClick={this.approveRecord.bind(this)}
                                                        >
                                                            <i className="fa fa-check"></i> Approve
                                                        </Button>) : ''}
                                                    &nbsp;
                                                </Fragment>
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
                        form={contentDelete}
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
        data: state.dataSetoran.data || [],
        data_report_setor: state.dataSetoran.data_report_setor || [],
        isLoading: state.dataSetoran.isLoading,
        isAddLoading: state.dataSetoran.isAddLoading,
        error: state.dataSetoran.error || null,
        errorPriority: state.dataSetoran.errorPriority || null,
        totalData: state.dataSetoran.totalData || 0,
        showFormAdd: state.dataSetoran.showFormAdd,
        contentMsg: state.dataSetoran.contentMsg,
        showFormSuccess: state.dataSetoran.showFormSuccess,
        showFormDelete: state.dataSetoran.showFormDelete,
        tipeSWAL: state.dataSetoran.tipeSWAL,
        user: state.auth.currentUser,
        allowedMenu: state.auth.allowedMenu,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        // onLoad: (queryString) => {
        // dispatch(fetchData(queryString));
        // },
        // onDownload: (queryString) => {
        // dispatch(fetchExportHeader(queryString));
        // },
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

export default connect(mapStateToProps, mapDispatchToPros)(DetailSetoran);
