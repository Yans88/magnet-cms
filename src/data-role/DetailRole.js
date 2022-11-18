import React, {Component} from "react";
import {connect} from "react-redux";
import {addData, fetchDataDetail, fetchDataError, fetchDataLoading,} from "./dataRoleService";
import {Button} from "react-bootstrap";

class DetailRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role_id: "",
            data: [],
            selected: {},
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {
        let isLoading = true;
        const id = sessionStorage.getItem("role_id");

        this.setState({role_id: id});
        await fetchDataDetail(id)
            .then((response) => {
                let dataRes = response.data;
                if (dataRes.error_message === 0) {
                    let payload = dataRes.payload;
                    this.setState({data: payload});
                    isLoading = false;
                    fetchDataLoading(isLoading);
                } else {
                    const errorpayload = {};
                    errorpayload["message"] = "Something wrong";
                    errorpayload["status"] = response.data.error_message;
                    fetchDataError(errorpayload);
                    isLoading = false;
                    fetchDataLoading(isLoading);
                    this.props.history.goBack();
                }
            })
            .catch((error) => {
                const errorpayload = {};
                errorpayload["message"] = "Something wrong";
                errorpayload["status"] = error.response ? error.response.status : 404;
                fetchDataError(errorpayload);
                isLoading = false;
                fetchDataLoading(isLoading);
                //this.props.history.goBack();
            });
    };

    async handleChange(event) {
        const {name, id} = event.target;
        const dt = id.split("_");
        var val = this.state.selected[name] > 0 || dt[1] > 0 ? "0" : "1";
        await this.setState({
            selected: {
                ...this.state.selected,
                [name]: val,
            },
        });
        const qs = {
            menu_id: dt[0],
            role_id: this.state.role_id,
            active: val,
        };
        await this.props.onAdd(qs);
        new Promise((resolve) => setTimeout(resolve, 200));
        await fetchDataDetail(this.state.role_id)
            .then((response) => {
                let dataRes = response.data;
                if (dataRes.error_message === 0) {
                    let payload = dataRes.payload;
                    this.setState({data: payload});
                } else {
                    fetchDataLoading(false);
                }
            })
            .catch((error) => {
                const errorpayload = {};
                errorpayload["message"] = "Something wrong";
                errorpayload["status"] = error.response ? error.response.status : 404;
                fetchDataError(errorpayload);
                fetchDataLoading(false);
            });
    }

    render() {
        const {role_id, data, selected} = this.state;

        return (
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Hak Akses</h1>
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
                                        {this.props.isLoading && <p>Loading ....</p>}
                                        <div>
                                            <>
                                                <table className="table">
                                                    <tbody>
                                                    <tr>
                                                        <td
                                                            className="text-center text-bold table-active"
                                                            colSpan="2"
                                                        >
                                                            Hak Akses
                                                        </td>
                                                    </tr>
                                                    {data &&
                                                        data.map((dt, i) => (
                                                            <tr key={i}>
                                                                <td
                                                                    className="text-bold capitalize"
                                                                    width="80%"
                                                                >
                                                                    {dt.menu_name.replace(/_/gi, " ")}
                                                                </td>
                                                                <td className="text-bold" width="20%">
                                                                    <input
                                                                        onChange={this.handleChange}
                                                                        name={dt.menu_name}
                                                                        type="checkbox"
                                                                        id={dt.menu_id + "_" + dt.active}
                                                                        value="1"
                                                                        checked={
                                                                            dt.active > 0 ||
                                                                            selected[dt.menu_name] > 0
                                                                                ? "checked"
                                                                                : ""
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </>
                                        </div>

                                        <Button
                                            variant="primary"
                                            onClick={() => this.props.history.goBack()}
                                        >
                                            <i className="fa fa-arrow-left"></i> Back
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.dataUser.isLoading,
        isAddLoading: state.dataUser.isAddLoading,
        error: state.dataUser.error || null,
        errorPriority: state.dataUser.errorPriority || null,
        totalData: state.dataUser.totalData || 0,
        showFormAdd: state.dataUser.showFormAdd,
        contentMsg: state.dataUser.contentMsg,
        showFormSuccess: state.dataUser.showFormSuccess,
        showFormDelete: state.dataUser.showFormDelete,
        showFormApprove: state.dataUser.showFormApprove,
        tipeSWAL: state.dataUser.tipeSWAL,
        user: state.auth.currentUser,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        onAdd: (data) => {
            dispatch(addData(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToPros)(DetailRole);
