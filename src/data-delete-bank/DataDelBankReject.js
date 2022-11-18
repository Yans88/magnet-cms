import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchData} from "./dataDelBankService";
import ReactDatatable from "@ashvin27/react-datatable";
import moment from "moment";

class DataDelBankReject extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            id: "",
            status: "",
        };
        this.state = {
            sort_order: "ASC",
            sort_column: "name",
            start: 1,
            limit: 10,
            search: "",
            status: "Reject",
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
        const {data} = this.props;

        const columns = [
            {
                key: "",
                text: "Tanggal",
                width: 100,
                align: "center",
                sortable: false,
                cell: record => {
                    return (moment(new Date(record.timestamp)).format('DD-MM-YYYY HH:mm:ss'))
                }
            },
            {
                key: "nama_pemilik",
                text: "Nama pemilik rekening",
                width: 200,
                align: "center",
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
                width: 120,
                sortable: false,
            },
            {
                key: "email",
                text: "Email",
                align: "center",
                width: 200,
                sortable: false,
            },
        ];
        const config = {
            key_column: "id",
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

        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">
                                        Data Delete Akun Bank - Reject
                                    </h1>
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
                </div>
                <div></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.dataDelBank.data || [],
        isLoading: state.dataDelBank.isLoading,
        isAddLoading: state.dataDelBank.isAddLoading,
        error: state.dataDelBank.error || null,
        errorPriority: state.dataDelBank.errorPriority || null,
        totalData: state.dataDelBank.totalData || 0,
        showFormAdd: state.dataDelBank.showFormAdd,
        contentMsg: state.dataDelBank.contentMsg,
        showFormSuccess: state.dataDelBank.showFormSuccess,
        showFormDelete: state.dataDelBank.showFormDelete,
        tipeSWAL: state.dataDelBank.tipeSWAL,
        user: state.auth.currentUser,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToPros)(DataDelBankReject);
