import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/modal';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Login from './component/Login';
import {BrowserRouter as Router,} from "react-router-dom"
import { AuthProvider } from './context/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
    <App />
    {/* <Login/> */}
    </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
