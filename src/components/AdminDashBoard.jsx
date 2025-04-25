import React, { useEffect } from 'react';
import adminstore from "../store/adminstore.js";
import {Link} from "react-router-dom";

const AdminDashBoard = () => {
    const { data, UserDataRequest,totalAmountDetailsRequest,totalData,userData,userDetailsRequest,bazarData,userbazarRequest } = adminstore();


    useEffect(() => {
        (async () => {

            await UserDataRequest();
            await totalAmountDetailsRequest()
            await userDetailsRequest()
            await userbazarRequest()


        })();
    }, []);

    return (




        <div className="container">



            <h2 className="mt-4">মেসের সদস্য</h2>
            <hr className="col-12"/>
            <div className="row">
                {
                    Array.isArray(data?.data) && data.data.map((item, i) => {
                        return (
                            <div key={i} className="card height mt-1 col-3  text-center shadow">
                                <h5 className="mt-4">{item.name}</h5>
                                <Link to={`/MemberDetails/${item._id}`} className="btn btn-success buttonH ">click</Link>
                            </div>
                        );
                    })}
            </div>
            <hr/>
            <div>
                <h2 className="mt-2">মোট হিসাব-নিকাশ</h2>
                <hr className="col-12"/>
                <div className="row">
                    <div className="card mt-1 height col-sm-12 col-md-6 col-lg-3 text-center shadow">
                        <h5 className="mt-3">মোট জমা টাকা</h5>
                        <hr className="col-12 hr "/>
                        {totalData && totalData.data && totalData.data.totalPaidAmount ? (
                            <h1 className=""> ৳ {totalData.data.totalPaidAmount}</h1>
                        ) : (
                            <p>loading....</p>
                        )}
                    </div>
                    <div className="card mt-1 height col-sm-12 col-md-6 col-lg-3 text-center shadow">
                        <h5 className="mt-3">মোট মিল</h5>
                        <hr className="col-12 hr "/>
                        {totalData && totalData.data && totalData.data.totalMeal ? (
                            <h1 className="">  {totalData.data.totalMeal} </h1>
                        ) : (
                            <p>loading....</p>
                        )}
                    </div>
                    <div className="card mt-1 height col-sm-12 col-md-6 col-lg-3 text-center shadow">
                        <h5 className="mt-3">মিল রেট</h5>
                        <hr className="col-12 hr "/>
                        {totalData && totalData.data && totalData.data.mealRate ? (
                            <h1 className=""> ৳ {totalData.data.mealRate} </h1>
                        ) : (
                            <p>loading....</p>
                        )}
                    </div>
                    <div className="card mt-1 height col-sm-12 col-md-6 col-lg-3 text-center shadow">
                        <h5 className="mt-3">মোট বাজার খরচ</h5>
                        <hr className="col-12 hr "/>
                        {totalData && totalData.data && totalData.data.totalBazarAmount ? (
                            <h1 className=""> ৳ {totalData.data.totalBazarAmount} </h1>
                        ) : (
                            <p>loading....</p>
                        )}
                    </div>
                    <div className="card mt-1 height col-sm-12 col-md-6 col-lg-3 text-center shadow">
                        <h5 className="mt-3">মোট বাঁচানো টাকা</h5>
                        <hr className="col-12 hr "/>
                        {totalData && totalData.data && totalData.data.totalRefoundCost ? (
                            <h1 className=""> ৳ {totalData.data.totalRefoundCost} </h1>
                        ) : (
                            <p>loading....</p>
                        )}
                    </div>
                </div>
                <hr/>
            </div>
            <div className="row">
                <h2 className="mt-1">ইউজার টেবিল</h2>
                <hr className="hr ms-2"/>
                <table className="table table-striped table-bordered table-hover table1 col-12 ">
                    <thead className="">
                    <tr>
                        <th className="bg-success">নাম</th>
                        <th className="bg-success">মোট পরিশোধিত টাকা</th>
                        <th className="bg-success">মোট মিল</th>
                        <th className="bg-success">বার্তা</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(userData?.data) && userData.data.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.totalPaidAmount}</td>
                                    <td>{item.totalMeal}</td>
                                    <td>{item.giveTKMessage}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <hr className="hr ms-2" />

            </div>

            <div className="row">
                <h2 className="mt-1">বাজার টেবিল</h2>
                <hr className="hr ms-2"/>
                <table className="table table-striped table-bordered table-hover table1 col-12 mb-5 ">
                    <thead className="">
                    <tr>
                        <th className="bg-success">নাম</th>
                        <th className="bg-success">তারিখ</th>
                        <th className="bg-success">বাজার টাকা</th>
                        <th className="bg-success">বাজার জিনিস</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(bazarData?.data) && bazarData.data.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.buyerName}  </td>
                                    <td>{new Date(item.date).toLocaleDateString()}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.details}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>

            </div>


        </div>

    );
};

export default AdminDashBoard;
