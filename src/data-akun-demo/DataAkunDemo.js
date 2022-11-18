import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {
    addData,
    addDataSuccess,
    addForm,
    approveData,
    clearAddDataError,
    deleteData,
    fetchData,
    fetchDataDetail,
    showConfirmApprove,
    showConfirmDel
} from './dataAkunDemoService';
import {AppSwalSuccess} from '../components/modal/SwalSuccess';
import ReactDatatable from '@ashvin27/react-datatable';
import {GetProfileAdmin} from '../components/login/LoginService';

class DataAkunDemo extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            user_id: "",
            email: "",
            status: "",
            nama_role: null,
            nama_depan: "",
            nama_belakang: "",
            status_dokumen: ""
        }
        this.state = {
            sort_order: "ASC",
            sort_column: "name",
            keyword: '',
            page_number: 1,
            per_page: 10,
            selected: this.initSelected,
            errMsg: this.initSelected,
            loadingForm: false,
        }
    }

    componentDidMount = async () => {
        const response = await GetProfileAdmin();
        if (response.accessToken === null) {
            this.props.history.push("login");
        }
        this.props.onLoad("?search&limit=" + this.state.per_page + "&start=" + (this.state.page_number - 1));

    }

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
        this.props.onLoad("?search=" + queryString.keyword + "&limit=" + this.state.per_page + "&start=" + (this.state.page_number - 1));
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

    discardChanges = () => {
        this.setState({errMsg: {}, selected: this.initSelected, loadingForm: false});
        if (!this.state.selected.operator_by) this.setState({selected: {...this.state.selected}});
        this.props.showForm(true);
    }

    handleSubmit() {
        var errors = this.state.errMsg;
        this.setState({
            ...this.state,
            loadingForm: true,
        });
        errors.nama_depan = !this.state.selected.nama_depan ? "Nama Depan required" : '';
        errors.nama_belakang = !this.state.selected.nama_belakang ? "Nama Belakang required" : '';
        errors.email = !this.state.selected.email ? "Email required" : '';
        errors.role_id = !this.state.selected.role_id ? "Role required" : '';
        // errors.marketing = !this.state.selected.marketing ? "Marketing required" : '';
        // if(this.state.selected.user_id == "" || this.state.selected.user_id == null) {
        errors.password = !this.state.selected.password ? "Password required" : '';
        errors.konfirmasi_password = !this.state.selected.konfirmasi_password ? "Konfirmasi Password required" : '';
        if (this.state.selected.password !== this.state.selected.konfirmasi_password) {
            errors.password = "Password dengan Konfirmasi Password tidak sama";
            errors.konfirmasi_password = "Password dengan Konfirmasi Password tidak sama";
        }
        // }
        this.setState({errors});
        if (this.validateForm(this.state.errMsg)) {
            let kode_cabangs = [];
            for (let i = 0; i < this.state.selected.kode_cabang.length; i++) {
                kode_cabangs.push({cabang_id: this.state.selected.kode_cabang[i].value})
            }
            let selected = {
                ...this.state.selected,
                role: this.state.selected.role_id,
                kode_cabang: kode_cabangs,
                // marketing:this.state.selected.marketing,
            }
            this.props.onAdd(selected);
        } else {
            console.error('Invalid Form')
            this.setState({
                loadingForm: false,
            });
        }

    }

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }


    render() {
        const {data} = this.props;
        const {selected, errMsg} = this.state;
        const columns = [
            {
                key: "no",
                text: "No.",
                width: 20,
                align: "center",
                sortable: false,
                cell: (row, index) => <div
                    style={{textAlign: "center"}}>{((this.state.page_number - 1) * this.state.per_page) + index + 1 + '.'}</div>,
                row: 0
            },
            {
                key: "name",
                text: "Nama",

                align: "center",
                sortable: false,
                cell: record => {
                    return (
                        <div>{record.nama}</div>
                    )
                }
            },
            {
                key: "email",
                text: "Contact",
                align: "center",

                sortable: false,
                cell: record => {
                    return (
                        <Fragment>{record.email}</Fragment>
                    )
                }
            },
            {
                key: "telp",
                text: "Telp.",
                align: "center",
                sortable: false
            }
        ];
        const config = {
            key_column: 'user_id',
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
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


        const contentDelete = <div
            dangerouslySetInnerHTML={{__html: '<div id="caption" style=padding-bottom:20px;">Apakah anda yakin <br/>akan menghapus data ini ?</div>'}}/>;
        const contentApprove = <div
            dangerouslySetInnerHTML={{__html: '<div id="caption" style=padding-bottom:20px;">Apakah anda yakin <br/>akan Approve data ini ?</div>'}}/>;

        return (
            <div>

                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Data Akun Demo</h1>
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
                                                <ReactDatatable
                                                    config={config}
                                                    records={data}
                                                    columns={columns}
                                                    dynamic={true}
                                                    onChange={this.tableChangeHandler}
                                                    loading={this.props.isLoading}
                                                    total_record={this.props.totalData}
                                                />
                                            ) : (<p>No Data ...</p>)}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {this.props.showFormSuccess ? (<AppSwalSuccess
                        show={this.props.showFormSuccess}
                        title={this.props.contentMsg}
                        type={this.props.tipeSWAL}
                        handleClose={this.props.closeSwal}
                    >
                    </AppSwalSuccess>) : ''}


                </div>
                <div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.dataAkunDemo.data || [],
        isLoading: state.dataAkunDemo.isLoading,
        isAddLoading: state.dataAkunDemo.isAddLoading,
        error: state.dataAkunDemo.error || null,
        errorPriority: state.dataAkunDemo.errorPriority || null,
        totalData: state.dataAkunDemo.totalData || 0,
        showFormAdd: state.dataAkunDemo.showFormAdd,
        contentMsg: state.dataAkunDemo.contentMsg,
        showFormSuccess: state.dataAkunDemo.showFormSuccess,
        showFormDelete: state.dataAkunDemo.showFormDelete,
        showFormApprove: state.dataAkunDemo.showFormApprove,
        tipeSWAL: state.dataAkunDemo.tipeSWAL,
        user: state.auth.currentUser,
        selected: state.dataAkunDemo.selected || {}
    }
}

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
        },
        onLoadDetail: (queryString) => {
            dispatch(fetchDataDetail(queryString));
        },
        onAdd: (data) => {
            dispatch(addData(data));
        },
        onDelete: (data) => {
            dispatch(deleteData(data));
        },
        onApprove: (data) => {
            dispatch(approveData(data));
        },
        showForm: (data) => {
            dispatch(addForm(data));
        },
        showConfirmDel: (data) => {
            dispatch(showConfirmDel(data));
        },
        showConfirmApprove: (data) => {
            dispatch(showConfirmApprove(data));
        },
        closeSwal: () => {
            const _data = {};
            _data['showFormSuccess'] = false;
            _data['contentMsg'] = null;
            dispatch(addDataSuccess(_data));
            dispatch(fetchData("?search&limit=10&start=0"));
        },
        clearErrProps: () => {
            dispatch(clearAddDataError());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(DataAkunDemo);