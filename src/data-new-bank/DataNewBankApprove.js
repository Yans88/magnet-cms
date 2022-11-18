import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {clearAddDataError, fetchData} from "./dataNewBankService";
import ReactDatatable from "@ashvin27/react-datatable";
import {Figure} from "react-bootstrap";
import AppModal from "../components/modal/MyModal";
import moment from "moment/moment";

class DataNewBankApprove extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            akun_bank_id: "",
            status: "",
            keterangan: "",
            showImage: false,
        };
        this.state = {
            sort_order: "ASC",
            sort_column: "name",
            start: 1,
            limit: 10,
            search: "",
            status: "Aktif",
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

    showImg = (record) => {
        this.setState({
            selected: {
                ...record,
                showImage: true,
            },
        });
    };

    handleClose = () => {
        this.setState({
            errMsg: {},
            selected: this.initSelected,
            loadingForm: false,
            showImage: false,
        });

    };

    render() {
        const {data} = this.props;
        const {selected} = this.state;

        const columns = [
            {
                key: "",
                text: "Tanggal",
                width: 150,
                align: "center",
                sortable: false,
                cell: (record) => {
                    return moment(new Date(record.timestamp)).format("DD-MM-YYYY HH:mm:ss");
                },
            },
            {
                key: "nama_pemilik",
                text: "Nama pemilik rekening",
                width: 200,
                align: "center",
                sortable: false,
            },
            {
                key: "email",
                text: "Email",
                align: "center",
                width: 200,
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
                width: 220,
                sortable: false,
                cell: (record) => {
                    return (
                        <Fragment>
                            No. Rekening : {record.no_rek} <br/>
                            Jenis akun : {record.jenis_akun_bank}
                        </Fragment>
                    );
                },
            },
            {
                key: "cover_buku",
                text: "Cover buku tabungan",
                align: "center",
                sortable: false,

                cell: (record) => {
                    return (
                        <div style={{textAlign: "center"}}>
                            <Figure onClick={(e) => this.showImg(record)} style={{marginTop: ".3rem", marginBottom: 0}}>
                                <Figure.Image
                                    thumbnail
                                    width={150}
                                    height={120}
                                    src={record.cover_buku}
                                />
                            </Figure>
                        </div>
                    );
                },
            },
        ];
        const config = {
            key_column: "akun_bank_id",
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

        const showImg = (
            <Figure style={{marginTop: ".3rem", marginBottom: 0}}>
                <Figure.Image
                    width={450}
                    height={400}
                    src={selected.cover_buku ? selected.cover_buku : ""}
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
                                    <h1 className="m-0">Data New Akun Bank - Approved</h1>
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

                    <AppModal
                        show={selected.showImage}
                        form={showImg}
                        handleClose={this.handleClose.bind(this)}
                        keyboard={false}
                        title="View Photo"
                        isLoading={this.props.isAddLoading}
                        formSubmit={''}
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
        data: state.dataNewBank.data || [],
        isLoading: state.dataNewBank.isLoading,
        isAddLoading: state.dataNewBank.isAddLoading,
        error: state.dataNewBank.error || null,
        errorPriority: state.dataNewBank.errorPriority || null,
        totalData: state.dataNewBank.totalData || 0,
        showFormAdd: state.dataNewBank.showFormAdd,
        contentMsg: state.dataNewBank.contentMsg,
        showFormSuccess: state.dataNewBank.showFormSuccess,
        showFormDelete: state.dataNewBank.showFormDelete,
        tipeSWAL: state.dataNewBank.tipeSWAL,
        user: state.auth.currentUser,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
        },
        clearErrProps: () => {
            dispatch(clearAddDataError());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToPros)(DataNewBankApprove);
