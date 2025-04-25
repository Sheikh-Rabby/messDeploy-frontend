import React, { useEffect } from 'react';
import AdminStore from "../store/adminstore.js";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const { data, adminForm, adminFormOnChange, adminLoginRequest } = AdminStore();
    const navigate = useNavigate();
    console.log(data);



    const login = async () => {
       const  res=await adminLoginRequest();
       if(res){
           navigate("/");
       }else {
           alert("login failed");
       }

    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">Admin Login</h3>

                            <div className="">
                                <label htmlFor="email">Email</label>
                                <input
                                    value={adminForm.email}
                                    onChange={(e) => adminFormOnChange("email", e.target.value)}
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="">
                                <label htmlFor="password">Password</label>
                                <input
                                    value={adminForm.password}
                                    onChange={(e) => adminFormOnChange("password", e.target.value)}
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <button onClick={login} className="btn btn-primary btn-block mt-2">Login</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
