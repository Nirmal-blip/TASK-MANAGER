import { useState } from "react";
import {
 FaEnvelope,
 FaLock,
 FaUser,
 FaArrowRight,
 FaArrowLeft,
 FaBrain
} from "react-icons/fa";

import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register(){

 const navigate = useNavigate();

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");
 const [loading,setLoading] = useState(false);

 const submit = async(e)=>{
  e.preventDefault();

  if(!name || !email || !password){
   alert("Please fill all fields");
   return;
  }

  setLoading(true);

  try{

   await API.post("/auth/register",{
    name,
    email,
    password
   });

   navigate("/login");

  }catch(err){

   alert("Registration failed");

  }finally{
   setLoading(false);
  }

 };

 return(

  <div className="min-h-screen bg-indigo-50 flex">

   {/* LEFT IMAGE */}

   <div className="hidden lg:flex w-[60%] bg-white rounded-r-[6rem] items-center justify-center">

    <img
     src="/AuthImg.png"
     alt="Task Manager"
     className="max-h-[80vh]"
    />

   </div>


   {/* RIGHT FORM */}

   <div className="w-full lg:w-[40%] flex items-center justify-center px-6">

    <div className="max-w-md w-full relative">

     {/* BACK BUTTON */}

     <div className="absolute top-[-10px] right-0">

      <button
       onClick={()=>navigate("/")}
       className="px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow hover:scale-105 transition"
      >

       <div className="flex items-center">
        <FaArrowLeft className="mr-2"/>
        Back
       </div>

      </button>

     </div>


     {/* HEADER */}

     <div className="text-center mb-6">

      <div className="inline-flex w-14 h-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 mb-4">

       <FaBrain className="text-white text-2xl"/>

      </div>

      <h1 className="text-3xl font-bold text-gray-900">
       Create Account
      </h1>

      <p className="text-gray-600">
       Start managing your tasks smarter
      </p>

     </div>


     {/* FORM CARD */}

     <div className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/10">

      <form onSubmit={submit} className="space-y-4">


       {/* NAME */}

       <div className="relative">

        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

        <input
         placeholder="Full Name"
         className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white"
         value={name}
         onChange={(e)=>setName(e.target.value)}
        />

       </div>


       {/* EMAIL */}

       <div className="relative">

        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

        <input
         type="email"
         placeholder="Email"
         className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
        />

       </div>


       {/* PASSWORD */}

       <div className="relative">

        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

        <input
         type="password"
         placeholder="Password"
         className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
        />

       </div>


       {/* SUBMIT */}

       <button
        disabled={loading}
        className="w-full flex items-center justify-center py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
       >

        {loading ? "Creating Account..." : "Get Started"}

        <FaArrowRight className="ml-2"/>

       </button>


       <p className="text-center text-gray-600 text-sm">

        Already have an account?{" "}

        <Link
         to="/login"
         className="text-indigo-600 font-semibold"
        >
         Sign In
        </Link>

       </p>

      </form>

     </div>

    </div>

   </div>

  </div>

 );

}