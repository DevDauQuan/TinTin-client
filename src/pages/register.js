import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actions/authAction"
const Register = () => {
    const { auth, alert } = useSelector(state => state);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const initialState = {
        fullname: '', username: '', email: '', password: '', cf_password: '', gender: 'male'
    };
    const [userData, setUserData] = useState(initialState);
    const { fullname, username, email, password, cf_password } = userData;
    const [typePass, setTypePass] = useState(false);
    const [typeConfirmPass, setTypeConfirmPass] = useState(false);

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
        dispatch(register(userData));
    }
    return (
        <div className='auth_page auth_container mx-auto'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-uppercase text-center mb-4' style={{ fontFamily: "Dancing Script" }}>Tin Tin</h1>

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" className="form-control" id="fullname" name='fullname'
                        placeholder="Enter your full name" onChange={handleChangeInput} value={fullname}
                        style={{ background: `${alert.fullname ? '#fd2d6a14' : ''}` }}
                    />
                    <small className="form-text text-danger">{alert.fullname ? alert.fullname : ''}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input type="text" className="form-control" id="username" name='username'
                        placeholder="Enter your user name" onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')}
                        style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}

                    />
                    <small className="form-text text-danger">{alert.fullname ? alert.fullname : ''}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email Address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email'
                        aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChangeInput} value={email}
                        style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}

                    />
                    <small id="emailHelp" className="form-text text-danger"> {alert.email ? alert.email : ''}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <div className="pass">
                        <input type={typePass ? "text" : "password"} className="form-control" id="exampleInputPassword1" name='password'
                            placeholder="Password" onChange={handleChangeInput} value={password}
                            style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
                        />
                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                    <small className="form-text text-danger">
                        {alert.password ? alert.password : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password</label>
                    <div className="pass">
                        <input type={typeConfirmPass ? "text" : "password"} className="form-control" id="cf_password" name='cf_password'
                            placeholder="Confirm Password" onChange={handleChangeInput} value={cf_password}
                            style={{ background: `${alert.cf_password ? '#fd2d6a14' : ''}` }}
                        />
                        <small onClick={() => setTypeConfirmPass(!typeConfirmPass)}>
                            {typeConfirmPass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                    <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ''}
                    </small>
                </div>

                <div className="row justify-content-between mx-0 mb-1">
                    <label htmlFor="male">
                        Male: <input type="radio" id="male" name="gender"
                            value="male" defaultChecked onChange={handleChangeInput} />
                    </label>

                    <label htmlFor="female">
                        Female: <input type="radio" id="female" name="gender"
                            value="female" onChange={handleChangeInput} />
                    </label>

                    <label htmlFor="other">
                        Other: <input type="radio" id="other" name="gender"
                            value="other" onChange={handleChangeInput} />
                    </label>
                </div>

                <button type="submit" className="btn btn-info w-100" >Register</button>

                <p className='my-2'>
                    You already have an account? <Link to="/" style={{ color: "crsimson" }}>Login now</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;