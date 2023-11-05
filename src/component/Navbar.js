import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../fireBase/FirebaseAuth";
import { signOut } from 'firebase/auth';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import "../style/Navbar.css";



export default function Navbar() {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const gradientStyle = {
    background: 'linear-gradient(45deg, #FFEDEDFF,  #3B3737FF,#000000FF)',
    WebkitBackgroundClip: 'text', // For older browsers
    backgroundClip: 'text',
    color: 'transparent',
    fontSize: '24px',
    paddingLeft: '45px',
    textAlign: 'center',
    textTransform: 'uppercase',

  };


  return (
    <>
      <div id="container" className="container position-sticky  top-0">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg navbar-light  blur blur-rounded top-0   nav-sty position-absolute my-3 py-2 start-0 end-0 mx-4" style={{zIndex:1000}}>
              <div className="container-fluid px-0">
                <div className="navbar-brand " style={gradientStyle} ><b>Data </b><AutoStoriesIcon sx={{ color: '#000', fontSize: '35px' }} /></div>
                <button
                  className="navbar-toggler collapsed border-0 shadow-none ms-md-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navigation"
                  aria-controls="navigation"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon bar1 "></span>
                  <span className="toggler-icon bar2 "></span>
                  <span className="toggler-icon bar3 "></span>
                </button>
                <div
                  className="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
                  id="navigation"
                >
                  <ul className="navbar-item-group navbar-nav navbar-nav-hover mx-auto">
                    <li className="nav-item  mx-1">
                      <Link className="nav-link active" to={"/"}>Home</Link>
                    </li>

                    <li className="nav-item  mx-1">
                      <Link className="nav-link active" to={"/report"}>Report</Link>
                    </li>
                    <li className="nav-item  mx-1">
                      <b className="nav-link active " style={{ cursor: 'pointer' }} onClick={logOut}>Log Out</b>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* <!-- End Navbar --> */}
          </div>
        </div>
      </div>
    </>
  )
}
// {props.name ? `welcome - ${props.name}`: ""}