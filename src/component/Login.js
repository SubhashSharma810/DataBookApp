import React, { useState, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom';
import '../style/Login.css'
import ForgotPasswordModal from './Forgot.model';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const {  login } = useAuth();

    useEffect(()=> {
        if ( !values.email|| !values.pass ) {
            setDissButton(true);
            return;
        }
        setDissButton(false);
    });

    const navigate = useNavigate();

    
    const [values, setValues] = useState({
        email: "",
        pass: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [dissButton, setDissButton] = useState(false);

    const handelSubmmit=async()=>{
        if ( !values.email|| !values.pass ) {
            setErrorMsg("Please Fill All Fields");
            return;
        }
        setErrorMsg("");
        login(values,navigate,setErrorMsg )
       

        // console.log(values)
    };
    return (
        <div style={{maxHeight:'auto'}}>
            <section className="h-100 gradient_form" >
                <div className="container py-5 h-100">
                    <div className="row  d-flex justify-content-center align-items-center h-100">
                        <div className=" col-xl-6">
                            <div className="card rounded-3 loginBody text-black">

                                <div className="card-body p-md-5 mx-md-4">

                                    <div className="text-center">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="logo" style={{ width: 185 }} />
                                        <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                                    </div>

                                    <form>
                                        <p>Please login to your account</p>

                                        <div className="form-outline  mb-4">
                                            <input onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
                                             type="email" id="form2Example11" className="loginBody-input form-control"
                                                placeholder="Phone number or email address" />
                                            <label className="lab form-label" htmlFor="form2Example11">Username</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input 
                                            onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
                                             type="password" placeholder='Password' id="form2Example22" className="loginBody-input form-control" />
                                            <label className="lab form-label" htmlFor="form2Example22">Password</label>
                                        </div>

                                        <div className="text-center  pt-1 ">
                                            <b>{errorMsg}</b>
                                            <button 
                                            disabled={dissButton}
                                            onClick={handelSubmmit} className="btnLogin " type="button">Log
                                                in</button>
                                        </div>
                                        <div className="forgate" style={{ textAlign: 'center', padding: 5 }}>
                                            <ForgotPasswordModal/>

                                        </div>

                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
