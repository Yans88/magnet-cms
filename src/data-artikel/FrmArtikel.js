import React, {Component} from 'react'
import {Button, Col, Figure, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AppButton from '../components/button/Button';
import noImg from '../assets/noPhoto.jpg';
import Loading from '../components/loading/MyLoading';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {addData, addDataSuccess, postData} from './dataArtikelService';
import {AppSwalSuccess} from '../components/modal/SwalSuccess';

class FrmArtikel extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            news_id: '',
            title: '',
            title_eng: '',
            content: '',
            subtitle: '',
            subtitle_eng: '',
            content_eng: '',
            file: '',
            tipe: '',
            imgUpload: '',

        }
        this.state = {
            showSwalSuccess: false,
            errMsg: this.initialState,
            validated: false,
            isEdit: false,
            appsLoading: false,
            loadingForm: false,
            artikel_id: '',
            title: '',
            title_eng: '',
            content: '',
            content_eng: '',
            subtitle: '',
            subtitle_eng: '',
            file: '',
            tipe: '',
            imgUpload: noImg,

        };
    }

    componentDidMount() {
        const selectedId = sessionStorage.getItem('idArtikelMagnet');

        if (selectedId) {
            this.getData();
        } else {
            const tipe = sessionStorage.getItem('tipeArtikelMagnet');
            this.setState({...this.state, tipe: tipe});
        }

    }

    getData = async () => {
        this.setState({...this.state, appsLoading: true, isEdit: true});
        const selectedId = sessionStorage.getItem('idArtikelMagnet');

        postData(selectedId, 'VIEW_DETAIL')
            .then(response => {
                setTimeout(() => {
                    if (response.data.error_message === 0) {
                        const dtRes = response.data.payload;
                        Object.keys(this.initialState).map((key) => {
                            this.setState({...this.state, [key]: dtRes[key]});
                            this.setState({...this.state, imgUpload: dtRes.file});
                            this.setState({...this.state, img: ''});
                            this.setState({...this.state, appsLoading: false, artikel_id: dtRes['news_id']});
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
            content: evt,
            loadingForm: false,
            errMsg: {...this.state.errMsg, content: ""}
        });
    }

    handleChangeDeskEng(evt) {
        this.setState({
            ...this.state,
            content_eng: evt,
            loadingForm: false,
            errMsg: {...this.state.errMsg, content_eng: ""}
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
        errors.subtitle = !this.state.subtitle ? "Sub Title required" : '';

        errors.content = !this.state.content ? "Content required" : '';
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
        this.props.history.push('/data-artikel-' + this.state.tipe);
    }

    render() {
        const {errMsg} = this.state;
        console.log(this.state);
        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">{this.state.isEdit ? ("Edit Artikel") : "Add Artikel"} {this.state.tipe}</h1>
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
                                                            <Form.Group as={Col} xs={6} controlId="subtitle">
                                                                <Form.Label>Sub Title</Form.Label>
                                                                {errMsg.subtitle ? (<span
                                                                    className="badge badge-danger text-error float-right">{errMsg.subtitle}</span>) : ''}
                                                                <Form.Control
                                                                    value={this.state.subtitle}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="subtitle"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Sub Title"/>

                                                            </Form.Group>

                                                            <Form.Group as={Col} xs={6} controlId="subtitle_eng">
                                                                <Form.Label>Sub Title(Eng)</Form.Label>
                                                                {errMsg.subtitle_eng ? (<span
                                                                    className="badge badge-danger text-error float-right">{errMsg.subtitle_eng}</span>) : ''}
                                                                <Form.Control
                                                                    value={this.state.subtitle_eng}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChange.bind(this)}
                                                                    size="sm"
                                                                    name="subtitle_eng"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Sub Title(Eng)"/>

                                                            </Form.Group>

                                                        </Form.Row>


                                                        <Form.Row>
                                                            <Form.Group as={Col} xs={8} controlId="content">
                                                                <Form.Label>Content</Form.Label>
                                                                {errMsg.content ? (<span
                                                                    className="badge badge-danger text-error">{errMsg.content}</span>) : ''}
                                                                <SunEditor

                                                                    defaultValue={this.state.content ? this.state.content : ''}
                                                                    setContents={this.state.content ? this.state.content : ''}
                                                                    onChange={this.handleChangeDesk.bind(this)}
                                                                    setOptions={{
                                                                        placeholder: "Content ...",
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
                                                            <Form.Group as={Col} xs={8} controlId="content_eng">
                                                                <Form.Label>Content(Eng) </Form.Label>
                                                                {errMsg.content_eng ? (<span
                                                                    className="badge badge-danger text-error">{errMsg.content_eng}</span>) : ''}
                                                                <SunEditor

                                                                    defaultValue={this.state.content_eng ? this.state.content_eng : ''}
                                                                    setContents={this.state.content_eng ? this.state.content_eng : ''}
                                                                    onChange={this.handleChangeDeskEng.bind(this)}
                                                                    setOptions={{
                                                                        placeholder: "Content(Eng) . . .",
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
                                                    <Link to={"/" + this.state.tipe}>
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
        isLoading: state.dataArtikel.isLoading,
        isAddLoading: state.dataArtikel.isAddLoading,
        error: state.dataArtikel.error || null,
        errorPriority: state.dataBanner.errorPriority || null,
        totalData: state.dataArtikel.totalData || 0,
        contentMsg: state.dataArtikel.contentMsg,
        showFormSuccess: state.dataArtikel.showFormSuccess,
        tipeSWAL: state.dataArtikel.tipeSWAL,
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
            //this.props.history.push('/data-artikel-education');
        }
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(FrmArtikel);
