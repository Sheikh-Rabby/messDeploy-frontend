import React, {useEffect, useState} from 'react';

import AdminStore from "../store/adminstore.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";


import Lottie from "lottie-react";
import animationData from "../assets/animation/greenDot.json";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";


const MemberDetails = () => {
    const {data,UserDetailsRequest,UserMealUpdateRequest,mealForm,mealFormOnChange,paidForm,
        paidFormOnChange,updatePaidAmountRequest,formReset,mealReset,bazarForm,bazarFormOnChange,userbazarData,usertotalbazarRequest,resetbazar} = AdminStore();
    const [selectedDate, setSelectedDate] = useState(new Date())
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    console.log(token);


    const handleDateChange = (date) => {
        setSelectedDate(date);
        mealFormOnChange("mealDate",date.toISOString().split("T")[0] );
    };

    const  handleDateChange1 =(date)=>{
        setSelectedDate(date);
        bazarFormOnChange("date",date.toISOString().split("T")[0] );


    }

    const {id}=useParams();



    useEffect(()=>{
        (async ()=>{
            await UserDetailsRequest(id)

        })()
    },[])

    const updateMeal = async () => {
        if(!token){
            navigate("/login");
            return;
        }
        if (mealForm.mealStatus !== "Taken" && mealForm.mealStatus !== "Pending") {
            toast.error("Please select Taken or Pending for meal status");
            return;
        }


        if (isNaN(mealForm.meal_count) || mealForm.meal_count <= 0) {
            toast.error("Please enter a valid meal count");
            return;
        }
        try {
            let response = await UserMealUpdateRequest(id);
            if (response.data.status === "fail" && response.data.message === "Meal entry already exists for this date") {
              toast.error("User already exists for this date")
                return;
            }
            await UserDetailsRequest(id);
            toast.success("Meal updated successfully");
             await mealReset()
        } catch (e) {
            console.error(e.message);
        }
    };

    const updatePaidAmount=async()=>{
        if(!token){
            navigate("/login");
        }
        if(paidForm.total_paid_amount<=0){
            toast.error("Enter a valid paid amount");
            return;
        }else {
            await updatePaidAmountRequest(id)
            toast.success("Paid amount updated successfully");
        }
        await  UserDetailsRequest(id)
        await formReset()


    }

    const updateBazarAmount=async()=>{
        if(!token){
            navigate("/login");
        }

        if (!bazarForm.date|| bazarForm.date.trim() === "") {
            toast.error("Meal date cannot be empty");
            return;
        }
        else if(bazarForm.amount<=0){
            toast.error("Enter a valid bazar amount");
            return;
        }else {
            await usertotalbazarRequest(id)
            toast.success("Bazar amount updated successfully");
            await resetbazar()
        }
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 mt-5">
                    <div className="card shadow p-3 mb-5">
                        <h5 className="text-center">মিল ব্যবস্থাপনা ও পরিশোধ</h5>
                        <hr/>

                        {Array.isArray(data?.data) && data.data.map((item, i) => (
                            <div key={i} className="mb-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <h6><span className="text-primary">👤 সদস্য :</span> {item.name}</h6>
                                    <h6><span className="text-primary">🍽️ মিল রেট :</span> {item.mealRate} টাকা</h6>
                                    <h6><span className="text-primary">💰 মোট পরিশোধ :</span> {item.totalPaidAmount} টাকা
                                    </h6>
                                    <h6><span className="text-primary">📊 মোট মিল :</span> {item.totalMeal} টা</h6>
                                    <h6><span className="text-primary">🛒 মোট বাজার খরচ :</span> <span
                                        className="text-danger">{item.totalBazarAmount} টাকা</span></h6>
                                </div>


                            </div>
                        ))}

                        <hr/>

                        <div className="mb-2">
                            <label className="form-label">Meal Status</label>
                            <select
                                className="form-select"
                                value={mealForm.mealStatus}
                                onChange={(e) => mealFormOnChange("mealStatus", e.target.value)}
                            >
                                <option value="select">select</option>
                                <option value="Taken">Taken</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Select Date</label>
                            <DatePicker
                                className="form-control"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy/MM/dd"
                            />
                        </div>
                        <div className="">
                            <label className="form-label">Meal Count</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter meal number"
                                value={mealForm.meal_count}
                                onChange={(e) => mealFormOnChange("meal_count", e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary w-100 mt-2" onClick={updateMeal}>🍽️ মিল আপডেট</button>

                        <hr/>

                        <div className="mb-2">
                            <label className="form-label">পরিশোধিত টাকা</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter your Amount"
                                value={paidForm.total_paid_amount}
                                onChange={(e) => paidFormOnChange("total_paid_amount", e.target.value)}
                            />
                        </div>
                        <button className="btn btn-success w-100" onClick={updatePaidAmount}>💰 টাকা পরিশোধ</button>
                        <hr/>

                        <div className="mb-2 ">

                            <div className="mb-2">
                                <label className="form-label"> বাজারের তারিখ</label>
                                <DatePicker
                                    className="form-control"
                                  selected={selectedDate}
                                    onChange={handleDateChange1}
                                    format="yyyy/MM/dd"

                                />
                            </div>
                            <div className="mb-2">
                            <label className="form-label">টাকার পরিমাণ</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter your Amount"
                                value={bazarForm.amount}
                                onChange={(e) => bazarFormOnChange("amount", e.target.value)}
                            />
                            </div>
                            <div className="">
                            <label className="form-label">বাজার জিনিস</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter your Amount"
                                value={bazarForm.details}
                                onChange={(e) => bazarFormOnChange("details", e.target.value)}
                            />
                            </div>
                        </div>
                        <button className="btn btn-danger text-white w-100" onClick={updateBazarAmount}>🛒 বাজার খরচ </button>

                        <ToastContainer/>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default MemberDetails;