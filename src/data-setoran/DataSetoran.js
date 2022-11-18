import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
    addDataSuccess,
    addForm,
    clearAddDataError,
    fetchData,
    fetchExportHeader,
    showConfirmDel,
    updData,
} from "./dataSetoranService";
import {Figure, Form} from "react-bootstrap";
import AppModal from "../components/modal/MyModal";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import ReactDatatable from "@ashvin27/react-datatable";
import moment from "moment";
import "moment/locale/id";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import NumberFormat from "react-number-format";
import ReactExport from "react-data-export";
import AppButton from "../components/button/Button";

var yesterday = moment();
var valid_startDate = function (current) {
    return current.isBefore(yesterday);
};

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class DataSetoran extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            setor_id: "",
            keterangan: "",
            status: "",
            showImage: false,
        };
        this.state = {
            validSd: valid_startDate,
            validEd: valid_startDate,
            sort_order: "ASC",
            sort_column: "name",
            start: 1,
            limit: 10,
            search: "",
            status: "Waiting Approve",
            selected: this.initSelected,
            errMsg: this.initSelected,
            loadingForm: false,
            start_date: yesterday.format("YYYY-MM-DD"),
            end_date: yesterday.format("YYYY-MM-DD"),
            fileName:
                yesterday.format("DD MMM YYYY") + " - " + yesterday.format("DD MMM YYYY"),
        };
    }

    componentDidMount() {
        sessionStorage.removeItem("setor_id");
        const queryString =
            "?search=" +
            this.state.search +
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
            this.state.search +
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
            "&start_date=" +
            this.state.start_date +
            "&end_date=" +
            this.state.end_date +
            "&status=" +
            this.state.status;
        this.props.onLoad(queryString);
        const Qs2 =
            "?search=" +
            this.state.search +
            "&start=" +
            (this.state.start - 1) +
            "&start_date=" +
            this.state.start_date +
            "&end_date=" +
            this.state.end_date +
            "&status=" +
            this.state.status;
        this.props.onDownload(Qs2);
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
            "&start_date=" +
            this.state.start_date +
            "&end_date=" +
            this.state.end_date +
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

    handleChangeEndDate(date) {
        const selectedDate = new Date(date);
        const _date = moment(selectedDate).format("YYYY-MM-DD");
        // const start_date = moment(new Date(this.state.start_date)).format("DD MMM YYYY");
        this.setState({
            end_date: _date,
            fileName:
                moment(this.state.start_date).format("DD MMM YYYY") +
                " to " +
                moment(selectedDate).format("DD MMM YYYY"),
        });
        const queryString =
            "?search&limit=" +
            this.state.limit +
            "&start=" +
            (this.state.start - 1) +
            "&start_date=" +
            this.state.start_date +
            "&end_date=" +
            _date +
            "&status=" +
            this.state.status;
        this.props.onLoad(queryString);
        const Qs2 =
            "?search=" +
            this.state.search +
            "&start=" +
            (this.state.start - 1) +
            "&start_date=" +
            this.state.start_date +
            "&end_date=" +
            _date +
            "&status=" +
            this.state.status;
        this.props.onDownload(Qs2);
    }

    handleChangeStartDate(date) {
        const selectedDate = new Date(date);
        const _date = moment(selectedDate).format("YYYY-MM-DD");
        this.setState({
            start_date: _date,
            fileName:
                moment(selectedDate).format("DD MMM YYYY") +
                " - " +
                moment(this.state.end_date).format("DD MMM YYYY"),
        });
        const queryString =
            "?search&limit=" +
            this.state.limit +
            "&start=" +
            (this.state.start - 1) +
            "&start_date=" +
            _date +
            "&end_date=" +
            this.state.end_date +
            "&status=" +
            this.state.status;
        this.props.onLoad(queryString);
        const Qs2 =
            "?search=" +
            this.state.search +
            "&start=" +
            (this.state.start - 1) +
            "&start_date=" +
            _date +
            "&end_date=" +
            this.state.end_date +
            "&status=" +
            this.state.status;
        this.props.onDownload(Qs2);
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

    detailRecord = async (record) => {
        await sessionStorage.setItem("setor_id", record.setor_id);
        window.location.href = "/admin-magnet/detail-setoran";
    };

    render() {
        let {data, data_report_setor, allowedMenu, waktu_server} = this.props;
        waktu_server = waktu_server ? waktu_server : new Date();

        const {selected, errMsg} = this.state;

        const multiDataSet = [
            {
                columns: [
                    {
                        title: "",
                        width: {wpx: 20},
                    },

                    {
                        title: "Tanggal",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    },
                    {
                        title: "Login",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    },

                    {
                        title: "Nama",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    },
                    {
                        title: "Rate",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    },

                    {
                        title: "Setor",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    },

                    {
                        title: "Jumlah",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    }, //char width

                    {
                        title: "No.Tiket",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    },
                ],
                ySteps: 1,
                data: data_report_setor
                    .filter((data_report_setor) => Number(data_report_setor.rate) > 0)
                    .map((data) => [
                        {value: ""},
                        {
                            value: data.created_at
                                ? moment(new Date(data.created_at)).format("DD-MM-YYYY")
                                : "",
                        },
                        {value: data.login ? data.login : ""},
                        {value: data.name ? data.name : ""},
                        {value: data.rate ? data.rate : 0},
                        {value: data.setor ? data.setor : 0},
                        {value: data.jml_setor ? data.jml_setor : 0},
                        {value: data.ticket ? data.ticket : ""},
                    ]),
            },
        ];

        const multiDataSet2 = [
            {
                columns: [
                    {
                        title: "",
                        width: {wpx: 20},
                    },

                    {
                        title: "Tanggal",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    },
                    {
                        title: "Login",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    },

                    {
                        title: "Nama",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    },

                    {
                        title: "Setor",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    }, //char width

                    {
                        title: "No.Tiket",
                        width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"},
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true},
                        },
                    },
                ],
                ySteps: 1,
                data: data_report_setor
                    .filter((data_report_setor) => Number(data_report_setor.rate) === 0)
                    .map((data) => [
                        {value: ""},
                        {
                            value: data.created_at
                                ? moment(new Date(data.created_at)).format("DD-MM-YYYY")
                                : "",
                        },
                        {value: data.login ? data.login : ""},
                        {value: data.name ? data.name : ""},
                        {value: data.setor ? data.setor : 0},
                        {value: data.ticket ? data.ticket : ""},
                    ]),
            },
        ];

        var columns = [
            {
                key: "",
                text: "Tanggal",
                width: 100,
                align: "center",
                sortable: false,
                cell: (record) => {
                    return moment(new Date(record.timestamp)).format("DD-MM-YYYY HH:mm:ss");
                },
            },
            {
                key: "login",
                text: "Login",
                width: 100,
                align: "center",
                sortable: false,
            },
            {
                key: "name",
                text: "Nama",
                align: "center",
                sortable: false,
            },
            {
                key: "rate",
                text: "Jumlah",
                align: "center",
                width: 100,
                sortable: false,
                cell: (record) => {
                    return (
                        <Fragment>
                            Rate :{" "}
                            <NumberFormat
                                value={record.rate}
                                thousandSeparator={true}
                                decimalScale={2}
                                displayType={"text"}
                            />
                            <br/>
                            Setor :{" "}
                            <NumberFormat
                                value={record.setor}
                                thousandSeparator={true}
                                decimalScale={2}
                                displayType={"text"}
                            />
                            <br/>
                            {record.rate > 0 && ('IDR : ')}
                            {record.rate > 0 &&
                                <NumberFormat
                                    value={record.rate * record.setor}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    displayType={"text"}
                                />}
                        </Fragment>
                    );
                },
            },
            {
                key: "ticket",
                text: "No.Tiket",
                align: "center",
                sortable: false,
            },

            {
                key: "file_bukti_setor",
                text: "Bukti Setor",
                align: "center",
                sortable: false,
                cell: (record) => {
                    return (
                        <div style={{textAlign: "center"}}>
                            <Figure
                                onClick={(e) => this.showImg(record)}
                                style={{marginTop: ".3rem", marginBottom: 0}}
                            >
                                <Figure.Image
                                    thumbnail
                                    width={150}
                                    height={120}
                                    src={record.file_bukti_setor}
                                />
                            </Figure>
                        </div>
                    );
                },
            },
        ];

        if (
            allowedMenu &&
            (allowedMenu.data_setoran_waiting_approve_approve ||
                allowedMenu.data_setoran_waiting_approve_reject)
        ) {
            columns = [
                ...columns,
                {
                    key: "action",
                    text: "Action",
                    width: 100,
                    align: "center",
                    sortable: false,
                    cell: (record) => {
                        return (
                            <div style={{textAlign: "center"}}>
                                <Fragment>
                                    {allowedMenu &&
                                    allowedMenu.data_setoran_waiting_approve_approve ? (
                                        <button
                                            className="btn btn-xs btn-success"
                                            onClick={(e) => this.approveRecord(record)}
                                            style={{width: 70, marginBottom: 5}}
                                        >
                                            <i className="fa fa-check"></i> Approve
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                    {allowedMenu &&
                                    allowedMenu.data_setoran_waiting_approve_reject ? (
                                        <button
                                            className="btn btn-danger btn-xs"
                                            onClick={() => this.rejectRecord(record)}
                                            style={{width: 70, marginBottom: 5}}
                                        >
                                            <i className="fa fa-times"></i> Reject
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={() => this.detailRecord(record)}
                                        style={{width: 70}}
                                    >
                                        <i className="fa fa-eye"></i> Detail
                                    </button>
                                </Fragment>
                            </div>
                        );
                    },
                },
            ];
        }

        const config = {
            key_column: "setor_id",
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: false,
            show_length_menu: true,
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
                    src={selected.file_bukti_setor ? selected.file_bukti_setor : ""}
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
                                    <h1 className="m-0">Data Setoran - Waiting Approve</h1>
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
                                                <Fragment>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="mb-4 pull-right">
                                                                <div className="pull-left margin-left-10 max-w-250">
                                                                    <label>Tanggal: Awal</label>
                                                                    <Datetime
                                                                        closeOnSelect={true}
                                                                        timeFormat={false}
                                                                        setViewDate={
                                                                            this.state.start_date &&
                                                                            moment(this.state.start_date).format(
                                                                                "DD/MM/YYYY"
                                                                            )
                                                                        }
                                                                        value={
                                                                            this.state.start_date &&
                                                                            moment(this.state.start_date).format(
                                                                                "DD/MM/YYYY"
                                                                            )
                                                                        }
                                                                        onChange={this.handleChangeStartDate.bind(
                                                                            this
                                                                        )}
                                                                        inputProps={{
                                                                            readOnly: true,
                                                                            autoComplete: "off",
                                                                            placeholder: "Tanggal Awal",
                                                                            name: "start_date",
                                                                            className: "form-control form-control-lg",
                                                                        }}
                                                                        locale="id"
                                                                        isValidDate={this.state.validSd}
                                                                    />
                                                                </div>
                                                                <div className="pull-left margin-left-10 max-w-250">
                                                                    <label>Tanggal: Akhir</label>
                                                                    <Datetime
                                                                        closeOnSelect={true}
                                                                        timeFormat={false}
                                                                        setViewDate={
                                                                            this.state.end_date &&
                                                                            moment(this.state.end_date).format(
                                                                                "DD/MM/YYYY"
                                                                            )
                                                                        }
                                                                        value={
                                                                            this.state.end_date &&
                                                                            moment(this.state.end_date).format(
                                                                                "DD/MM/YYYY"
                                                                            )
                                                                        }
                                                                        onChange={this.handleChangeEndDate.bind(
                                                                            this
                                                                        )}
                                                                        inputProps={{
                                                                            readOnly: true,
                                                                            autoComplete: "off",
                                                                            placeholder: "Tanggal Akhir",
                                                                            name: "end_date",
                                                                            className: "form-control form-control-lg",
                                                                        }}
                                                                        locale="id"
                                                                        isValidDate={this.state.validSd}
                                                                    />
                                                                </div>
                                                                <div className="pull-left margin-left-10 max-w-250">
                                                                    <label>Cari</label>
                                                                    <input
                                                                        name="search"
                                                                        value={this.state.search}
                                                                        onChange={this.handleSearch.bind(this)}
                                                                        type="text"
                                                                        placeholder="cari nomor akun atau jumlah setor"
                                                                        className="form-control form-control-lg"
                                                                    />
                                                                </div>
                                                                <div className="pull-left margin-left-10 max-w-250">
                                                                    <ExcelFile
                                                                        filename={
                                                                            "Report Setor-Waiting Approve " +
                                                                            this.state.fileName + " " + moment(new Date(waktu_server)).format(" HH:mm:ss")
                                                                        }
                                                                        element={
                                                                            <AppButton
                                                                                style={{marginTop: 30}}
                                                                                isLoading={this.props.isLoading}
                                                                                type="button"
                                                                                theme="info"
                                                                            >
                                                                                Export
                                                                            </AppButton>
                                                                        }
                                                                    >
                                                                        <ExcelSheet
                                                                            dataSet={multiDataSet}
                                                                            name="IDR"
                                                                        />
                                                                        <ExcelSheet
                                                                            dataSet={multiDataSet2}
                                                                            name="USD"
                                                                        />
                                                                    </ExcelFile>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ReactDatatable
                                                        config={config}
                                                        records={data}
                                                        columns={columns}
                                                        dynamic={true}
                                                        onChange={this.tableChangeHandler}
                                                        loading={this.props.isLoading}
                                                        total_record={this.props.totalData}
                                                    />
                                                </Fragment>
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
        waktu_server: state.dataSetoran.waktu_server,
        tipeSWAL: state.dataSetoran.tipeSWAL,
        user: state.auth.currentUser,
        allowedMenu: state.auth.allowedMenu,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
        },
        onDownload: (queryString) => {
            dispatch(fetchExportHeader(queryString));
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

export default connect(mapStateToProps, mapDispatchToPros)(DataSetoran);
