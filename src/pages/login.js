import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { gapi } from 'gapi-script'
import axios from 'axios';
import { GLOBALTYPES } from '../redux/actions/globalTypes';

const Login = () => {
    const initalState = { email: '', password: '' };
    const [userData, setUserData] = useState(initalState);
    const { email, password } = userData;
    const [typePass, setTypePass] = useState(false);
    const clientId = "971002281615-luvft5j1hcc11802tl9pjkvc517s89ik.apps.googleusercontent.com";

    const { auth } = useSelector(state => state);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (auth.token) {
            navigate("/");
        }
    }, [auth.token, navigate]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(userData));

    }

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId })
        })
    }, [])

    const responseGoogle = async (response) => {
        try {
            await axios.post('/api/google_login', { tokenId: response.tokenId }).catch(() => {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: {
                        error: "error"
                    }
                });
            });

            console.log(response);
            localStorage.setItem('firstLogin', true)
            window.location.reload();

        } catch (err) {
            // console.log(err);
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.request.response.msg
                }
            });
        }
    }

    const responseFacebook = async (response) => {
        try {
            // console.log(response);

            const { accessToken, userID } = response
            await axios.post('/api/facebook_login', { accessToken, userID })


            localStorage.setItem('firstLogin', true)
            window.location.reload();
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.request.response.msg
                }
            });
        }
    }

    return (
        <div className='auth_page'>
            <div className='auth_container'>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-uppercase text-center mb-4' style={{ fontFamily: "Dancing Script" }}>Tin Tin</h1>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name='email'
                            aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChangeInput} value={email} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <div className="pass">
                            <input type={typePass ? "text" : "password"} className="form-control" id="exampleInputPassword1" name='password'
                                placeholder="Password" onChange={handleChangeInput} value={password} />
                            <small onClick={() => setTypePass(!typePass)}>
                                {typePass ? 'Hide' : 'Show'}
                            </small>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-info w-100" disabled={email && password ? false : true}>Login</button>
                    <p className='my-2 '>
                        <Link to="/forgot" style={{ color: "crsimson" }} className="text-danger">Forgot your password?</Link>
                    </p>
                    <p className='my-2'>
                        You don't have an account? <Link to="/register" style={{ color: "crsimson" }}>Register now</Link>
                    </p>


                </form>
                <div className='hr mx-auto px-4'>Or Login with</div>
                <div className='social d-flex'>
                    <GoogleLogin
                        clientId="971002281615-luvft5j1hcc11802tl9pjkvc517s89ik.apps.googleusercontent.com"
                        buttonText="Login with google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    <FacebookLogin
                        appId="505061101643921"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook} />
                </div>



            </div>
        </div >

    );
};

export default Login;