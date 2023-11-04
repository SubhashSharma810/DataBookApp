import React, { useState, useEffect } from 'react'
import Style from '../style/Login.css'
import { auth } from '../fireBase/FirebaseAuth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    useEffect(() => {
        if (!values.name || !values.email || !values.pass) {
            setDissButton(true);
            return;
        }
        setDissButton(false);
    });

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [dissButton, setDissButton] = useState(false);

    const handelSubmmit = () => {
        if (!values.name || !values.email || !values.pass) {
            setErrorMsg("Please Fill All Fields");
            return;
        }
        setErrorMsg("");

        createUserWithEmailAndPassword(auth, values.email, values.pass).then(async (res) => {
            const user = res.user;
            await updateProfile(user, {
                displayName: values.name,
            });
            navigate("/")
        }).catch((err) => {
            setErrorMsg(err.message)
            console.log("Error", err)
        });

        // console.log(values)
    };
    return (
        <div>
            <div>
                <section className={`h-100 ${Style.gradient_form} `} style={{ backgroundColor: '#eee' }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-xl-6">
                                <div className="card rounded-3 text-black">

                                    <div className="card-body p-md-5 mx-md-4">

                                        <div className="text-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="logo" style={{ width: 185 }} />
                                            <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                                        </div>

                                        <form>
                                            <p>Please sign up to your account</p>

                                            <div className="form-outline mb-4">
                                                <input type="text"
                                                    onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
                                                    id="name" className="form-control"
                                                    placeholder="Please Enter Your Full Name" />
                                                <label className="form-label" htmlFor="form2Example11">Full Name</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="email"
                                                    onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
                                                    id="email" className="form-control"
                                                    placeholder="Please Enter Your email address" />
                                                <label className="form-label" htmlFor="form2Example11">Email name</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password"
                                                    onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
                                                    id="pass" className="form-control" placeholder="Please Enter Your Password" />
                                                <label className="form-label" htmlFor="form2Example22">Password</label>
                                            </div>

                                            <div className="text-center  pt-1 ">
                                                <b>{errorMsg}</b>
                                                <button className={`btn btn-primary btn-block fa-lg ${Style.gradientcustom - 2} mb-3 mr-1`}
                                                    onClick={handelSubmmit}
                                                    disabled={dissButton}
                                                    type="button">Sign
                                                    Up</button>
                                            </div>
                                            <div className="forgate" style={{ StextAlign: 'center', padding: 5 }}>
                                                <b>I Have An Account!...</b> <a className="" href="#">Login</a>

                                            </div>

                                        </form>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SignUp
