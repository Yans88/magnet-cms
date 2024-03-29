import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';

import * as AuthService from '../../services/auth';
import Button from '../../components/button/Button';

const Login = ({onUserLogin}) => {
    const [isAuthLoading, setAuthLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const history = useHistory();

    const login = (email, password) => {
        setAuthLoading(true);
        setErrMsg(null);
        AuthService.loginByAuth(email, password)
            .then((token) => {
                if (token) {
                    setAuthLoading(false);
                    onUserLogin(token);
                    history.push('/');
                } else {
                    setErrMsg('Email dan Password tidak sesuai')
                    setAuthLoading(false);
                }
            })
            .catch((error) => {
                setAuthLoading(false);
                setErrMsg(error)

            });
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            pass: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Please enter email'),
            pass: Yup.string()
                .required('Please provide a password')
        }),
        onSubmit: (values) => {
            login(values.email, values.pass);
        }
    });
    const hideAlert = () => {
        setErrMsg(null)
    }
    document.getElementById('root').classList = 'hold-transition login-page';

    return (
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center h1">
                    <b>Magnet</b>
                </div>
                <div className="card-body">

                    {errMsg ? (
                        <div className="alert alert-danger alert-sm">
                            <button onClick={hideAlert} type="button" className="close" data-dismiss="alert"
                                    aria-hidden="true">×
                            </button>
                            <span className="fw-semi-bold text-error-login">Error: {errMsg}</span>
                        </div>
                    ) : (<p className='login-box-msg'>Sign in to start your session</p>)}

                    <form onSubmit={formik.handleSubmit}>
                        {formik.touched.email && formik.errors.email ? (
                            <span className="float-right text-error badge badge-danger">{formik.errors.email}</span>
                        ) : null}
                        <div className="input-group mb-3">
                            <input
                                autoComplete="off"
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                {...formik.getFieldProps('email')} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user"/>
                                </div>
                            </div>

                        </div>

                        {formik.touched.pass &&
                        formik.errors.pass ? (
                            <span className="float-right text-error badge badge-danger">{formik.errors.pass}</span>
                        ) : null}
                        <div className="input-group mb-3">
                            <input
                                autoComplete="off"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                {...formik.getFieldProps('pass')} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"/>
                                </div>
                            </div>
                        </div>

                        <div className="social-auth-links text-center mt-2 mb-3">
                            <Button
                                block
                                type="submit"
                                isLoading={isAuthLoading}
                                icon="sign"
                                theme="primary"
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
};

const mapDispatchToProps = (dispatch) => ({
    onUserLogin: (token) => dispatch({type: "LOGIN_USER", token})
});

export default connect(null, mapDispatchToProps)(Login);