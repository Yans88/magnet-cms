import React, {Component} from 'react'
import {Alert, Col, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import AppButton from '../components/button/Button';
import Loading from '../components/loading/MyLoading';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {AppSwalSuccess} from '../components/modal/SwalSuccess';
import {
    addData,
    addDataSuccess,
    addForm,
    chgProps,
    clearAddDataError,
    fetchData,
    fetchDataDetail,
    showConfirmDel
} from './dataTemplateEmailservice';



class FrmTemplateEmail extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            subject: "",
            body: "",
            tipe: ""
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
            subject: "",
            body: "",
            tipe: ""
        }
    }

    componentDidMount = async () => {
        const tipe = sessionStorage.getItem('tipeTemplateEMail');
        this.setState({...this.state, tipe: tipe});
        await this.props.onLoad("?search&limit=" + this.state.per_page + "&start=" + (this.state.page_number - 1));
    }


    handleChange(event) {
        const {name, value} = event.target

        const dt = {};
        dt['tipe'] = this.state.tipe;
        dt['key'] = name;
        dt['value'] = value;
        this.props.changeProps(dt);
    }

    handleChangeDesk(name, value) {
        const dt = {};
        dt['tipe'] = this.state.tipe;
        dt['key'] = name;
        dt['value'] = value;
        console.log(dt);
        this.props.changeProps(dt);
    }

    handleSubmit() {
        var errors = this.state.errMsg;
        this.setState({
            ...this.state,
            loadingForm: true,
        });

        errors.subject = !this.props.data[this.state.tipe].subject ? "Subject required" : '';
        errors.body = !this.props.data[this.state.tipe].body ? "Body required" : '';

        this.setState({errors});
        if (this.validateForm(this.state.errMsg)) {
            const savedata = {
                ...this.props.data[this.state.tipe],
                tipe: this.state.tipe
            }
            this.props.onAdd(savedata);
        } else {
            console.error('Invalid Form')
        }

    }

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    closeSwal() {
        this.props.closeSwal();
        this.props.history.push('data-template-email');
    }


    render() {
        const {data} = this.props;
        const {errMsg, tipe} = this.state;

        return (
            <div>

                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Form Template Email</h1>
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
                                    {this.props.isLoading ? (<Loading/>) :
                                        (
                                            <div className="card shadow-lg">
                                                <Form>
                                                    <div className="card-body my-card-body">

                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={12} controlId="tipe">

                                                                <Form.Label>Tipe</Form.Label>
                                                                <Form.Control
                                                                    disabled
                                                                    value={this.state.tipe}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="tipe"
                                                                    type="text"
                                                                    placeholder="Tipe"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>

                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={12} controlId="subject">
                                                                {errMsg.subject ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.subject}
                                                                    </span>) : ''}
                                                                <Form.Label>Subject</Form.Label>
                                                                <Form.Control
                                                                    value={data[tipe] && data[tipe].subject}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="subject"
                                                                    type="text"
                                                                    placeholder="Subject"/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <br/>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={12} controlId="body">
                                                                {errMsg.body ?
                                                                    (<span
                                                                        className="float-right text-error badge badge-danger">{errMsg.body}
                                                                    </span>) : ''}
                                                                <Form.Label>Body</Form.Label>
                                                                <SunEditor
                                                                    defaultValue={data[tipe] && data[tipe].body}
                                                                    setContents={data[tipe] && data[tipe].body}
                                                                    onChange={this.handleChangeDesk.bind(this, 'body')}
                                                                    setOptions={{
                                                                        placeholder: "body ...",
                                                                        maxHeight: 250,
                                                                        height: 250,
                                                                        buttonList: [
                                                                            ['fontSize', 'formatBlock', 'bold', 'underline', 'italic', 'align', 'horizontalRule', 'list', 'lineHeight', 'link', 'strike', 'subscript', 'superscript', 'codeView', 'undo', 'redo', 'fontColor', 'hiliteColor', 'textStyle', 'paragraphStyle', 'blockquote', 'removeFormat']
                                                                        ]
                                                                    }}
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>


                                                    </div>

                                                </Form>
                                                <div className="card-footer">
                                                    {errMsg.email ?
                                                        (<Alert variant="danger" show={true}>Error
                                                            : {errMsg.email}</Alert>) : ''}
                                                    <AppButton
                                                        onClick={this.handleSubmit.bind(this)}
                                                        isLoading={this.props.isAddLoading}
                                                        type="button"
                                                        theme="success">
                                                        Update Data
                                                    </AppButton>

                                                </div>
                                            </div>
                                        )}

                                </div>
                            </div>
                        </div>
                    </section>

                    {this.props.showFormSuccess ? (<AppSwalSuccess
                        show={this.props.showFormSuccess}
                        title={this.props.contentMsg}
                        type={this.props.tipeSWAL}
                        handleClose={this.closeSwal.bind(this)}
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
        data: state.dataTemplateEmail.data || {},
        isLoading: state.dataTemplateEmail.isLoading,
        isAddLoading: state.dataTemplateEmail.isAddLoading,
        error: state.dataTemplateEmail.error || null,
        errorPriority: state.dataTemplateEmail.errorPriority || null,
        totalData: state.dataTemplateEmail.totalData || 0,
        showFormAdd: state.dataTemplateEmail.showFormAdd,
        contentMsg: state.dataTemplateEmail.contentMsg,
        showFormSuccess: state.dataTemplateEmail.showFormSuccess,
        showFormDelete: state.dataTemplateEmail.showFormDelete,
        showFormApprove: state.dataTemplateEmail.showFormApprove,
        tipeSWAL: state.dataTemplateEmail.tipeSWAL,
        user: state.auth.currentUser,
        selected: state.dataTemplateEmail.selected || {}
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
        changeProps: (data) => {
            dispatch(chgProps(data));
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

export default connect(mapStateToProps, mapDispatchToPros)(FrmTemplateEmail);