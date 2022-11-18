import React, {Component} from 'react'
import {Button, Col, Figure, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AppButton from '../components/button/Button';
import noImg from '../assets/noPhoto.jpg';
import Loading from '../components/loading/MyLoading';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {addData, addDataSuccess, postData} from './dataBannerService';
import {AppSwalSuccess} from '../components/modal/SwalSuccess';

class FrmBanner extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            banner_id: '',
            title: '',
            title_eng: '',
            description: '',
            sub_title: '',
            sub_title_eng: '',
            description_eng: '',
            file: '',
            tipe: '',
            section: '',
            imgUpload: '',

        }
        this.state = {
            showSwalSuccess: false,
            errMsg: this.initialState,
            validated: false,
            isEdit: false,
            appsLoading: false,
            loadingForm: false,
            banner_id: '',
            title: '',
            title_eng: '',
            description: '',
            description_eng: '',
            sub_title: '',
            sub_title_eng: '',
            file: '',
            tipe: '',
            section: '',
            imgUpload: noImg,

        };
    }

    componentDidMount() {
        const selectedId = sessionStorage.getItem('idBannerMagnet');

        if (selectedId) {
            this.getData();
        } else {
            const tipe = sessionStorage.getItem('tipeBannerMagnet');
            const section = sessionStorage.getItem('sectionBannerMagnet');
            this.setState({...this.state, tipe: tipe, section: section});
        }

    }

    getData = async () => {
        this.setState({...this.state, appsLoading: true, isEdit: true});
        const selectedId = sessionStorage.getItem('idBannerMagnet');

        postData(selectedId, 'VIEW_DETAIL')
            .then(response => {
                setTimeout(() => {
                    if (response.data.error_message === 0) {
                        const dtRes = response.data.payload;
                        Object.keys(this.initialState).map((key) => {
                            this.setState({...this.state, [key]: dtRes[key]});
                            this.setState({...this.state, imgUpload: dtRes.file});
                            this.setState({...this.state, img: ''});
                            this.setState({...this.state, appsLoading: false});
                            return 1;
                        });
                    }

                    if (response.data.err_code === "04") {
                        this.setState({...this.state});
                    }
                    this.setState({...this.state, appsLoading: false});
                }, 200);
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, appsLoading: false});
            });
    }

    handleChange(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        this.setState({
            ...this.state,
            loadingForm: false,
            errMsg: {...this.state.errMsg, img: "", [name]: ""}
        })
        if (evt.target.name === "file") {
            value = evt.target.files[0];
            this.setState({file: '', imgUpload: noImg})
            if (!value) return;
            if (!value.name.match(/\.(jpg|jpeg|png)$/)) {
                this.setState({errMsg: {file: "Extension Invalid"}})
                this.setState({loadingForm: true})
                return;
            }
            if (value.size > 2099200) {
                this.setState({errMsg: {file: "File size over 2MB"}})
                this.setState({loadingForm: true})
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(value);
            reader.onloadend = () => {
                this.setState({file: value, imgUpload: reader.result})
            };
        }

        this.setState({
            [name]: value
        })

    }

    handleChangeDesk(evt) {
        this.setState({
            ...this.state,
            description: evt,
            loadingForm: false,
            errMsg: {...this.state.errMsg, description: ""}
        });
    }

    handleChangeDeskEng(evt) {
        this.setState({
            ...this.state,
            description_eng: evt,
            loadingForm: false,
            errMsg: {...this.state.errMsg, description: ""}
        });
    }

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleSubmit() {
        var errors = this.state.errMsg;
        this.setState({
            ...this.state,
            loadingForm: true,
        });
        errors.title = !this.state.title ? "Title required" : '';
        errors.sub_title = !this.state.sub_title ? "Sub Title required" : '';
        errors.tipe = !this.state.tipe ? "Tipe required" : '';
        errors.section = !this.state.section ? "Section required" : '';
        errors.description = !this.state.description ? "Description required" : '';
        if (this.state.file) {
            var fileSize = this.state.file.size;
            if (fileSize > 2099200) { // satuan bytes 2099200 => 2MB
                errors.file = "File size over 2MB";
            }
        }

        this.setState({errors, loadingForm: true});
        if (this.validateForm(this.state.errMsg)) {
            this.props.onAdd(this.state);
        } else {
            console.error('Invalid Form')
        }

    }

    closeSwal() {
        this.props.closeSwal();
        this.props.history.push(this.state.section);
    }

    render() {
        const {errMsg} = this.state;

        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">{this.state.isEdit ? ("Edit Banner") : "Add Banner"}</h1>
                                </div>

                            </div>
                        </div>
                    </div>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    {this.state.appsLoading ? (<Loading/>) :
                                        (
                                            <div className="card shadow-lg">
                                                <Form>
                                                    <div className="card-body my-card-body">
                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="title">
                                                                <Form.Label>Title</Form.Label>
                                                                {errMsg.title ? (<span
                                                                    className="badge badge-danger text-error float-right">{errMsg.title}</span>) : ''}

                                                                <Form.Control
                                                                    value={this.state.title}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="title"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Title"/>
                                                            </Form.Group>
                                                            <Form.Group as={Col} xs={6} controlId="title_eng">
                                                                <Form.Label>Title(Eng)</Form.Label>
                                                                {errMsg.tipe ? (<span
                                                                    className="badge badge-danger text-error float-right">{errMsg.tipe}</span>) : ''}
                                                                <Form.Control
                                                                    value={this.state.title_eng}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="title_eng"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Title(Eng)"/>

                                                            </Form.Group>
                                                        </Form.Row>

                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="sub_title">
                                                                <Form.Label>Sub Title</Form.Label>
                                                                {errMsg.sub_title ? (<span
                                                                    className="badge badge-danger text-error float-right">{errMsg.sub_title}</span>) : ''}
                                                                <Form.Control
                                                                    value={this.state.sub_title}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="sub_title"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Sub Title"/>

                                                            </Form.Group>

                                                            <Form.Group as={Col} xs={6} controlId="sub_title_eng">
                                                                <Form.Label>Sub Title(Eng)</Form.Label>
                                                                {errMsg.sub_title_eng ? (<span
                                                                    className="badge badge-danger text-error float-right">{errMsg.sub_title_eng}</span>) : ''}
                                                                <Form.Control
                                                                    value={this.state.sub_title_eng}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="sub_title_eng"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Sub Title(Eng)"/>

                                                            </Form.Group>

                                                        </Form.Row>

                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={6} controlId="tipe">
                                                                <Form.Label>Tipe</Form.Label>
                                                                {errMsg.tipe ? (<span
                                                                    className="badge badge-danger text-error float-right">{errMsg.tipe}</span>) : ''}
                                                                <Form.Control
                                                                    disabled
                                                                    value={this.state.tipe}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="tipe"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Tipe"/>

                                                            </Form.Group>

                                                            <Form.Group as={Col} xs={6} controlId="section">
                                                                <Form.Label>Section</Form.Label>
                                                                {errMsg.section ? (<span
                                                                    className="badge badge-danger text-error float-right">{errMsg.section}</span>) : ''}
                                                                <Form.Control
                                                                    disabled
                                                                    value={this.state.section}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="section"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Section"/>

                                                            </Form.Group>

                                                        </Form.Row>

                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={8} controlId="description">
                                                                <Form.Label>Description</Form.Label>
                                                                {errMsg.description ? (<span
                                                                    className="badge badge-danger text-error">{errMsg.description}</span>) : ''}
                                                                <SunEditor

                                                                    defaultValue={this.state.description ? this.state.description : ''}
                                                                    setContents={this.state.description ? this.state.description : ''}
                                                                    onChange={this.handleChangeDesk.bind(this)}
                                                                    setOptions={{
                                                                        placeholder: "Description ...",
                                                                        maxHeight: 200,
                                                                        height: 200,
                                                                        buttonList: [
                                                                            ['fontSize', 'formatBlock', 'bold', 'underline', 'italic', 'align', 'horizontalRule', 'list', 'lineHeight', 'link', 'strike', 'subscript', 'superscript', 'codeView', 'undo', 'redo', 'fontColor', 'hiliteColor', 'textStyle', 'paragraphStyle', 'blockquote', 'removeFormat']
                                                                        ]
                                                                    }}
                                                                />


                                                            </Form.Group>
                                                            <Form.Group as={Col} xs={2} controlId="file">
                                                                <Form.Label>Image</Form.Label>
                                                                {this.state.errMsg.file ? (<span
                                                                    className="float-right text-error badge badge-danger">{this.state.errMsg.file}</span>) : ''}
                                                                <Form.File
                                                                    setfieldvalue={this.state.file}
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="file"
                                                                    style={{"color": "rgba(0, 0, 0, 0)"}}/>
                                                                <Form.Text className="text-muted">
                                                                    <em>- Images *.jpg, *.jpeg, *.png <br/>- Maks. Size
                                                                        2MB</em>
                                                                </Form.Text>

                                                            </Form.Group>

                                                            <Form.Group as={Col} xs={2} controlId="imagePreview">
                                                                <Form.Label
                                                                    style={{"color": "rgba(0, 0, 0, 0)"}}>-----</Form.Label>
                                                                <Figure>
                                                                    <Figure.Image
                                                                        thumbnail
                                                                        width={130}
                                                                        height={100}
                                                                        alt=""
                                                                        src={this.state.imgUpload}
                                                                    />
                                                                </Figure>
                                                            </Form.Group>
                                                        </Form.Row>

                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={8} controlId="description_eng">
                                                                <Form.Label>Description(Eng)</Form.Label>
                                                                {errMsg.description_eng ? (<span
                                                                    className="badge badge-danger text-error">{errMsg.description_eng}</span>) : ''}
                                                                <SunEditor

                                                                    defaultValue={this.state.description_eng ? this.state.description_eng : ''}
                                                                    setContents={this.state.description_eng ? this.state.description_eng : ''}
                                                                    onChange={this.handleChangeDeskEng.bind(this)}
                                                                    setOptions={{
                                                                        placeholder: "Description . . .",
                                                                        maxHeight: 200,
                                                                        height: 200,
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
                                                    <Link to={"/" + this.state.section}>
                                                        <Button variant="danger">Cancel</Button>{' '}
                                                    </Link>
                                                    <AppButton
                                                        onClick={this.handleSubmit.bind(this)}
                                                        isLoading={this.props.isAddLoading ? this.props.isAddLoading : this.state.loadingForm}
                                                        type="button"
                                                        theme="success">
                                                        Simpan
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

        isLoading: state.dataBanner.isLoading,
        isAddLoading: state.dataBanner.isAddLoading,
        error: state.dataBanner.error || null,
        errorPriority: state.dataBanner.errorPriority || null,
        totalData: state.dataBanner.totalData || 0,

        contentMsg: state.dataBanner.contentMsg,
        showFormSuccess: state.dataBanner.showFormSuccess,

        tipeSWAL: state.dataBanner.tipeSWAL,
        user: state.auth.currentUser
    }
}

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (queryString) => {

        },
        onAdd: (data) => {
            dispatch(addData(data));
        },

        closeSwal: () => {
            const _data = {};
            _data['showFormSuccess'] = false;
            _data['contentMsg'] = null;
            dispatch(addDataSuccess(_data));
            //this.props.history.push('/news');
        }
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(FrmBanner);
