import React, {useEffect, useState} from 'react';
import axios from "axios";
import Loader from "../loader/loader.jsx";
import {Link} from "react-router-dom";

const ReadPage = () => {

    const [Data,SetData]=useState([]);

    useEffect(() => {
        (async ()=>{
            await ReadData()
        })()
    }, []);


    const ReadData=async ()=>{
        let res=await axios.get("/api/Read");
        SetData(res.data['row'])
    }

    const DeleteData=async (id)=>{
        await axios.get(`/api/Delete/${id}`);
        await ReadData()
    }


    return (
        <div className="container mt-5">
            <Link className="btn btn-sm btn-success" to="/create">Create</Link>
            <div className="row">
                <div className="col-md-12">

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <td>Title</td>
                                <td>Price</td>
                                <td>Discount</td>
                                <td>Discount Price</td>
                                <td>Action</td>
                            </tr>
                            </thead>

                            <tbody>
                                {
                                    Data.length===0?(<Loader/>):
                                    (Data.map((item,i)=>{
                                        return (
                                            <tr key={i}>
                                                <td>{item['title']}</td>
                                                <td>{item['price']}</td>
                                                <td>{item['discount']}</td>
                                                <td>{item['discount_price']}</td>
                                                <td>
                                                    <button onClick={()=>DeleteData(item['_id'])} className="btn btn-danger btn-sm">Delete</button>
                                                    <Link className="btn btn-info btn-sm" to={`/update/${item['_id']}`}>Edit</Link>
                                                </td>
                                            </tr>
                                        )
                                    }))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadPage;