import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {addDataSuccess, clearAddDataError, deleteData, fetchData, showConfirmDel} from './dataBannerService';
import {Button, Figure} from 'react-bootstrap';
import AppModal from '../components/modal/MyModal';
import {AppSwalSuccess} from '../components/modal/SwalSuccess';
import ReactDatatable from '@ashvin27/react-datatable';


class DataBannerCompanyBenefit extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            banner_id: "",
            nama_bank: "",
            file: "",
            imgUpload: ""
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
            tipeBannerMagnet: 'our_company',
            sectionBannerMagnet: 'benefit_company',
        }
    }

    componentDidMount() {
        sessionStorage.removeItem("idBannerMagnet");
        sessionStorage.removeItem("tipeBannerMagnet");
        sessionStorage.removeItem("tipeBannerMagnet");
        this.props.onLoad("?search=" + this.state.keyword + "&limit=" + this.state.per_page + "&start=" + (this.state.page_number - 1) + "&tipe=our_company&section=benefit_company");
    }

    deleteRecord = (record) => {
        this.setState({
            selected: record
        });
        this.props.showConfirmDel(true);
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
        this.props.onLoad("?search=" + this.state.keyword + "&limit=" + this.state.per_page + "&start=" + (this.state.page_number - 1) + "&tipe=our_company&section=benefit_company");
    }

    handleChange(event) {
        const {name, value} = event.target
        var val = value;
        this.props.clearErrProps();
        if (event.target.name === "file") {
            val = event.target.files[0];
            this.setState({selected: {...this.state.selected, imgUpload: "", file: ""}});
            if (!val) return;
            if (!val.name.match(/\.(jpg|jpeg|png)$/)) {
                this.setState({
                    loadingForm: true,
                    errMsg: {...this.state.errMsg, file: "Please select valid image(.jpg .jpeg .png)"}
                });

                //setLoading(true);
                return;
            }
            if (val.size > 2099200) {
                this.setState({loadingForm: true, errMsg: {...this.state.errMsg, file: "File size over 2MB"}});

                //setLoading(true);
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(val);
            reader.onloadend = () => {
                this.setState({
                    loadingForm: false,
                    selected: {...this.state.selected, imgUpload: reader.result, file: val}
                });
            };
        }
        this.setState({
            loadingForm: false,
            errMsg: {...this.state.errMsg, [name]: ""},
            selected: {
                ...this.state.selected,
                [name]: val
            }
        });
    }

    editData = async (record) => {
        sessionStorage.removeItem("tipeBannerMagnet");
        sessionStorage.removeItem("sectionBannerMagnet");
        if (record) await sessionStorage.setItem('idBannerMagnet', record.banner_id);
        this.props.history.push("add-banner");
    }

    discardChanges = async () => {
        sessionStorage.removeItem("idBannerMagnet");
        await sessionStorage.setItem('tipeBannerMagnet', this.state.tipeBannerMagnet);
        await sessionStorage.setItem('sectionBannerMagnet', this.state.sectionBannerMagnet);
        this.props.history.push("add-banner");
    }

    handleDelete() {
        this.props.onDelete(this.state.selected.banner_id)

    }

    render() {
        const {data} = this.props;

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
                key: "title",
                text: "Title",
                align: "center",
                sortable: true,
            },
            {
                key: "sub_title",
                text: "Sub Title",
                align: "center",
                sortable: true,
            },
            /* {
                key: "tipe",
                text: "Tipe",
                align: "center",
                sortable: true,
            },
            {
                key: "section",
                text: "Section",
                align: "center",
                sortable: true,
            }, */
            {
                key: "file",
                text: "Image",
                width: 200,
                align: "center",
                sortable: false,
                cell: record => {
                    return (
                        <div style={{textAlign: "center"}}>
                            <Figure style={{marginTop: ".3rem", marginBottom: 0}}>
                                <Figure.Image
                                    thumbnail
                                    width={150}
                                    height={120}
                                    src={record.file}
                                />

                            </Figure></div>
                    )
                }
            },
            {
                key: "action",
                text: "Action",
                width: 100,
                align: "center",
                sortable: false,
                cell: record => {
                    return (
                        <div style={{textAlign: "center"}}>
                            <Fragment>
                                <button
                                    className="btn btn-xs btn-success"
                                    onClick={e => this.editData(record)}
                                    style={{marginBottom: '5px', width: '60px'}}>
                                    <i className="fa fa-edit"></i> Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-xs"
                                    onClick={() => this.deleteRecord(record)}>
                                    <i className="fa fa-trash"></i> Delete
                                </button>
                            </Fragment>
                        </div>
                    );
                }
            }
        ];
        const config = {
            key_column: 'banner_id',
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

        return (
            <div>

                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Data Banner Our Company - Benefit</h1>
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
                                        <div className="card-header">
                                            <Button variant="success" onClick={this.discardChanges}><i
                                                className="fa fa-plus"></i> Add</Button>

                                        </div>

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
                <div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.dataBanner.data || [],
        isLoading: state.dataBanner.isLoading,
        isAddLoading: state.dataBanner.isAddLoading,
        error: state.dataBanner.error || null,
        errorPriority: state.dataBanner.errorPriority || null,
        totalData: state.dataBanner.totalData || 0,

        contentMsg: state.dataBanner.contentMsg,
        showFormSuccess: state.dataBanner.showFormSuccess,
        showFormDelete: state.dataBanner.showFormDelete,
        tipeSWAL: state.dataBanner.tipeSWAL,
        user: state.auth.currentUser
    }
}

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {
            dispatch(fetchData(queryString));
        },

        onDelete: (data) => {
            dispatch(deleteData(data));
        },

        showConfirmDel: (data) => {
            dispatch(showConfirmDel(data));
        },
        closeSwal: () => {
            const _data = {};
            _data['showFormSuccess'] = false;
            _data['contentMsg'] = null;
            dispatch(addDataSuccess(_data));
            dispatch(fetchData("?limit=10&start=" + 0 + "&tipe=our_company&section=benefit_company"));
        },
        clearErrProps: () => {
            dispatch(clearAddDataError());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(DataBannerCompanyBenefit);