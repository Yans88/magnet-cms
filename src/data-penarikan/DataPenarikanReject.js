import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {
    addDataSuccess,
    addForm,
    clearAddDataError,
    fetchData,
    fetchExportHeader,
    showConfirmDel
} from './dataPenarikanService';
import {Badge} from 'react-bootstrap';
import ReactDatatable from '@ashvin27/react-datatable';
import moment from 'moment';
import "moment/locale/id";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import NumberFormat from 'react-number-format';

import ReactExport from 'react-data-export';
import AppButton from '../components/button/Button';

var yesterday = moment();
var valid_startDate = function (current) {
    return current.isBefore(yesterday);
};

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class DataPenarikanReject extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            penarikan_dana_id: "",
            keterangan: "",
            status: ""
        }
        this.state = {
            validSd: valid_startDate,
            validEd: valid_startDate,
            sort_order: "ASC",
            sort_column: "name",
            start: 1,
            limit: 10,
            search: '',
            status: "Reject",
            selected: this.initSelected,
            errMsg: this.initSelected,
            loadingForm: false,
            start_date: '',
            end_date: '',
        }
    }

    componentDidMount() {
        const queryString = "?search&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&status=" + this.state.status;
        this.props.onLoad(queryString);
        const Qs2 = "?search=" + this.state.search + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&status=" + this.state.status;
        this.props.onDownload(Qs2);
    }

    handleClose = () => {
        this.setState({
            errMsg: {},
            selected: this.initSelected,
            loadingForm: false
        });
        this.props.showForm(false);
        this.props.showConfirmDel(false);
    };

    handleCloseSwal = () => {
        this.setState({
            errMsg: {},
            selected: this.initSelected,
            loadingForm: false
        });
        this.props.showForm(false);
        this.props.showConfirmDel(false);
        this.props.closeSwal();
        const queryString = "?search&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&status=" + this.state.status;
        this.props.onLoad(queryString);
        const Qs2 = "?search=" + this.state.search + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&status=" + this.state.status;
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
        const Qs = "?search=" + this.state.search + "&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&status=" + this.state.status;
        this.props.onLoad(Qs);
    }

    handleChange(event) {
        const {name, value} = event.target
        var val = value;
        this.props.clearErrProps();
        this.setState({
            loadingForm: false,
            errMsg: {...this.state.errMsg, [name]: ""},
            selected: {
                ...this.state.selected,
                [name]: val
            }
        });
    }

    handleChangeEndDate(date) {
        const selectedDate = new Date(date);
        const _date = moment(selectedDate).format('YYYY-MM-DD');
        this.setState({end_date: _date})
        const queryString = "?search&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + _date + "&status=" + this.state.status;
        this.props.onLoad(queryString);
        const Qs2 = "?search=" + this.state.search + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + _date + "&status=" + this.state.status;
        this.props.onDownload(Qs2);
    }

    handleChangeStartDate(date) {
        const selectedDate = new Date(date);
        const _date = moment(selectedDate).format('YYYY-MM-DD');
        this.setState({start_date: _date});
        const queryString = "?search&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + _date + "&end_date=" + this.state.end_date + "&status=" + this.state.status;
        this.props.onLoad(queryString);
        const Qs2 = "?search=" + this.state.search + "&start=" + (this.state.start - 1) + "&start_date=" + _date + "&end_date=" + this.state.end_date + "&status=" + this.state.status;
        this.props.onDownload(Qs2);
    }

    handleSearch(event) {
        this.setState({
            ...this.state,
            search: event.target.value,
        });
        const queryString = "?search=" + event.target.value + "&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&status=" + this.state.status;

        this.props.onLoad(queryString);
        const Qs2 = "?search=" + event.target.value + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date + "&status=" + this.state.status;
        this.props.onDownload(Qs2);
    }


    render() {
        const {data, data_report_penarikan} = this.props;
        const multiDataSet = [
            {
                columns: [
                    {
                        title: "", width: {wpx: 20}
                    },
                    {
                        title: "Tanggal", width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"}
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true}
                        }

                    },
                    {
                        title: "Login", width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"}
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true}
                        }

                    },
                    {
                        title: "Nama", width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"}
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true}
                        }

                    },
                    {
                        title: "Nama Bank", width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"}
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true}
                        }
                    },//char width 
                    {
                        title: "Cabang", width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"}
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true}
                        }
                    },//char width 
                    {
                        title: "No.Rekening", width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"}
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true}
                        }
                    },//char width 
                    {
                        title: "Nama Pemilik", width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"}
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true}
                        }
                    },//char width 
                    {
                        title: "Jenis Akun BANK", width: {wpx: 130},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"}
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true}
                        }
                    },//char width 
                    {
                        title: "Jumlah", width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"}
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true}
                        }
                    },//char width 
                    {
                        title: "No. Tiket", width: {wpx: 100},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"}
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true}
                        }
                    },
                    {
                        title: "Keterangan", width: {wpx: 150},
                        style: {
                            border: {
                                top: {style: "thin", color: "FFFFAA00"},
                                bottom: {style: "thin", color: "FFFFAA00"},
                                left: {style: "thin", color: "FFFFAA00"},
                                right: {style: "thin", color: "FFFFAA00"}
                            },
                            fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}},
                            font: {bold: true}
                        }
                    },
                ],
                ySteps: 1,
                data: data_report_penarikan.map((data) => [

                    {value: ""},
                    {value: data.created_at ? moment(new Date(data.created_at)).format('DD-MM-YYYY') : ''},
                    {value: data.login ? data.login : ''},
                    {value: data.name ? data.name : ''},
                    {value: data.nama_bank ? data.nama_bank : ''},
                    {value: data.cabang ? data.cabang : ''},
                    {value: data.no_rek ? data.no_rek : ''},
                    {value: data.nama_pemilik ? data.nama_pemilik : ''},
                    {value: data.jenis_akun_bank ? data.jenis_akun_bank : ''},
                    {value: data.nominal ? data.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "-"},
                    {value: data.ticket ? data.ticket : ''},
                    {value: data.keterangan ? data.keterangan : '-'},
                ])

            }
        ];
        const columns = [
            {
                key: "",
                text: "Tanggal",
                width: 100,
                align: "center",
                sortable: false,
                cell: record => {
                    return (moment(new Date(record.created_at)).format('DD-MM-YYYY'))
                }
            },
            {
                key: "login",
                text: "Login",
                width: 100,
                align: "center",
                sortable: true,
            },
            {
                key: "name",
                text: "Nama",
                width: 150,
                align: "center",
                sortable: true,
            },
            {
                key: "nama_bank",
                text: "Nama Bank",
                align: "center",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            {record.nama_bank}
                            <br/>
                            Cabang : {record.cabang}
                        </Fragment>
                    )
                }
            },
            {
                key: "no_rek",
                text: "No. Rekening",
                align: "center",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            {record.no_rek}
                            <br/>
                            Nama Pemilik : {record.nama_pemilik}
                        </Fragment>
                    )
                }
            },
            {
                key: "nominal",
                text: "Jumlah",
                align: "center",
                width: 120,
                sortable: true,
                cell: record => {
                    return (<Fragment>
                        Rate : <NumberFormat
                        value={record.rate}
                        thousandSeparator={true}
                        decimalScale={2}
                        displayType={'text'}
                    /><br/>
                        Nominal : <NumberFormat
                        value={record.nominal}
                        thousandSeparator={true}
                        decimalScale={2}
                        displayType={'text'}
                    />
                        <br/>
                        <Badge variant="info">{record.jenis_akun_bank}</Badge>
                    </Fragment>)
                }
            },
            {
                key: "ticket",
                text: "No.Tiket",
                align: "center",
                sortable: false,
            },
            {
                key: "keterangan",
                text: "Keterangan",
                align: "center",
                sortable: false,
            },
        ];
        const config = {
            key_column: 'penarikan_dana_id',
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: false,
            show_length_menu: false,
            show_pagination: true,
            pagination: 'advance',
            button: {
                excel: false,
                print: false
            },
            language: {
                loading_text: "Please be patient while data loads..."
            }
        }


        return (
            <div>

                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Data Transfer Dana - Reject</h1>
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
                                    <div className="card card-success shadow-lg" style={{"minHeight": "470px"}}>

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
                                                                        setViewDate={this.state.start_date && moment(this.state.start_date).format('DD/MM/YYYY')}
                                                                        value={this.state.start_date && moment(this.state.start_date).format('DD/MM/YYYY')}
                                                                        onChange={this.handleChangeStartDate.bind(this)}
                                                                        inputProps={{
                                                                            readOnly: true,
                                                                            autoComplete: "off",
                                                                            placeholder: 'Tanggal Awal',
                                                                            name: 'start_date',
                                                                            className: 'form-control form-control-lg'
                                                                        }}

                                                                        locale="id" isValidDate={this.state.validSd}
                                                                    />
                                                                </div>
                                                                <div className="pull-left margin-left-10 max-w-250">
                                                                    <label>Tanggal: Akhir</label>
                                                                    <Datetime
                                                                        closeOnSelect={true}
                                                                        timeFormat={false}
                                                                        setViewDate={this.state.end_date && moment(this.state.end_date).format('DD/MM/YYYY')}
                                                                        value={this.state.end_date && moment(this.state.end_date).format('DD/MM/YYYY')}
                                                                        onChange={this.handleChangeEndDate.bind(this)}
                                                                        inputProps={{
                                                                            readOnly: true,
                                                                            autoComplete: "off",
                                                                            placeholder: 'Tanggal Akhir',
                                                                            name: 'end_date',
                                                                            className: 'form-control form-control-lg'
                                                                        }}

                                                                        locale="id" isValidDate={this.state.validSd}
                                                                    />
                                                                </div>
                                                                <div className="pull-left margin-left-10 max-w-250">
                                                                    <label>Cari</label>
                                                                    <input name="search" value={this.state.search}
                                                                           onChange={this.handleSearch.bind(this)}
                                                                           type="text"
                                                                           placeholder="cari nomor akun atau jumlah setor"
                                                                           className="form-control form-control-lg"/>

                                                                </div>
                                                                <div className="pull-left margin-left-10 max-w-250">
                                                                    <ExcelFile filename="Report Penarikan-Reject"
                                                                               element={
                                                                                   <AppButton
                                                                                       style={{marginTop: 30}}
                                                                                       isLoading={this.props.isLoading}
                                                                                       type="button"
                                                                                       theme="info">
                                                                                       Export
                                                                                   </AppButton>}>
                                                                        <ExcelSheet dataSet={multiDataSet}
                                                                                    name="Report Penarikan-Reject"/>
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
                                            ) : (<p>No Data ...</p>)}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
                <div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.dataPenarikan.data || [],
        data_report_penarikan: state.dataPenarikan.data_report_penarikan || [],
        isLoading: state.dataPenarikan.isLoading,
        isAddLoading: state.dataPenarikan.isAddLoading,
        error: state.dataPenarikan.error || null,
        errorPriority: state.dataPenarikan.errorPriority || null,
        totalData: state.dataPenarikan.totalData || 0,
        showFormAdd: state.dataPenarikan.showFormAdd,
        contentMsg: state.dataPenarikan.contentMsg,
        showFormSuccess: state.dataPenarikan.showFormSuccess,
        showFormDelete: state.dataPenarikan.showFormDelete,
        tipeSWAL: state.dataPenarikan.tipeSWAL,
        user: state.auth.currentUser
    }
}

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
        },
        onDownload: (queryString) => {
            dispatch(fetchExportHeader(queryString));
        },

        showForm: (data) => {
            dispatch(addForm(data));
        },
        showConfirmDel: (data) => {
            dispatch(showConfirmDel(data));
        },
        closeSwal: () => {
            const _data = {};
            _data['showFormSuccess'] = false;
            _data['contentMsg'] = null;
            dispatch(addDataSuccess(_data));

        },
        clearErrProps: () => {
            dispatch(clearAddDataError());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(DataPenarikanReject);