import {create} from "zustand";
import axios from "axios";
import {useParams} from "react-router-dom";

const AdminStore=create((set,get)=>({

   //admin login

    adminForm: {
        name: "",
        email: "",
        password: ""
    },
    adminFormOnChange: (name, value) =>
        set((state) => ({
            adminForm: { ...state.adminForm, [name]: value }
        })),


    data:[],
    data1:[],
    adminLoginRequest:async (req,res)=>{
        const {email, password} =get().adminForm ;
     try{
    let reqbody={
        email,
        password
    }
    let response =await axios.post("http://localhost:3030/api/adminLogin", reqbody);
    console.log(response)
    if (response.data.status === "success"){
        localStorage.setItem("token", response.data.token);
        set({data1:response.data});
        return true;
    }else {
        return false;
    }


    }catch(e){
    console.log(e.message);
    return false;
     }

    },

   //user find

    UserDataRequest:async ()=>{
      try{

          let response=await axios.get(`http://localhost:3030/api/findUser`)
          if(response.data.status === "success"){
              set({data:response.data});
          }
      }catch(e){
          console.log(e.message);
      }
    },

    UserDetailsRequest:async (id)=>{
        try{
            let response=await axios.get(`http://localhost:3030/api/userTotalDetails/${id}`)
            if(response.data.status === "success"){
                set({data:response.data});
            }
        }catch(e){
            console.log(e.message);

        }
    },

    //meal update


    mealForm:{
        userId:"",
        mealStatus:"",
        mealDate:"",
        meal_count:""
    },

    mealFormOnChange:async (name, value) =>
        set((state)=>({
            mealForm: { ...state.mealForm, [name]: name==="meal_count"?parseInt(value): value}
        })),

    mealReset: async () => {
        set((state) => ({
            mealForm: { ...state.mealForm, meal_count: "" }
        }));
    },


    UserMealUpdateRequest:async (id)=>{

    const {mealStatus,mealDate,meal_count}=get().mealForm ;
        if (!mealDate || mealDate.trim() === "") {
            alert("Meal date cannot be empty");
            return;
        }

        if (isNaN(meal_count) || meal_count < 0) {
            alert("Meal count must be a valid number");
            return;
        }

    try{
        let reqbody={
            userId:id,
            mealStatus,
            mealDate,
            meal_count

        }

        let response = await axios.post(`http://localhost:3030/api/updateMeal`,reqbody);
        console.log(response)

        return response

    }catch(e){
        console.log(e.message);
    }

    },


    //user paid amount

    paidForm:{
        userId:"",
        total_paid_amount:""
    },
    paidFormOnChange:async (name, value) =>
        set((state)=>({
            paidForm: { ...state.paidForm, [name]: name==="total_paid_amount"?parseInt(value): value}
        })),

    formReset: async () => {
        set((state) => ({
            paidForm: { ...state.paidForm, total_paid_amount: "" }
        }));
    },


    updatePaidAmountRequest:async (id)=>{
        const {total_paid_amount}=get().paidForm ;
       try{
           let reqbody={
               userId:id,
               total_paid_amount
           }
           let response = await axios.post(`http://localhost:3030/api/updatePaid`,reqbody);
           return response
       }catch(e){
           console.log(e.message);
       }
    },
    totalData:[],
    totalAmountDetailsRequest:async ()=>{
        try{
            let response=await axios.get(`http://localhost:3030/api/totalAmount`)

            if(response.data.status === "success"){
                set({totalData:response.data});
            }

        }catch(e){
            console.log(e.message);
        }
    },
    userData:[],
    userDetailsRequest:async ()=>{
        try{
            let response=await axios.get(`http://localhost:3030/api/totalDetail`)
            if(response.data.status === "success"){
                set({userData:response.data});
            }

        }catch(e){
            console.log(e.message);
        }
    },
    bazarData:[],
    userbazarRequest:async ()=>{
        try{
            let response=await axios.get(`http://localhost:3030/api/bazar`)
            if(response.data.status === "success"){
                set({bazarData:response.data});
            }
        }catch(e){

        }
    },



    bazarForm:{
        date:"",
        amount:"",
        buyer:"",
        details:""
    },
    bazarFormOnChange:async (name, value) =>
        set((state)=>({
            bazarForm: { ...state.bazarForm, [name]: value}
        })),
    resetbazar:async ()=>{
        set((state)=>({
            bazarForm: { ...state.bazarForm,amount:"",details:"" }
        }))
    },

    userbazarData:[],
    usertotalbazarRequest:async (id)=>{
        const {date,amount,details}=get().bazarForm ;
        if (!date|| date.trim() === "") {
            alert("Meal date cannot be empty");
            return;
        }

        if (isNaN(amount) || amount < 0) {
            alert("Meal count must be a valid number");
            return;
        }


        try{
          let reqbody={
              date,
              amount,
              buyer:id,
              details
          }

          let response=await axios.post(`http://localhost:3030/api/totalBazar`,reqbody)
          console.log(response)
          if(response.data.status === "success"){
              set({userbazarData:response.data});
          }
      }catch(e){
          console.log(e.message);
      }

    },
    resetAllData:async ()=>{
        let response=await axios.put(`http://localhost:3030/api/resetData`)
        if(response.data.status === "success"){
            return response
        }
    }












}))
export default AdminStore