import { useState } from "react";
import { FaEnvelope, FaLock, FaArrowRight, FaBrain } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login(){

 const navigate = useNavigate();

 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");
 const [loading,setLoading] = useState(false);

 const submit = async(e)=>{
  e.preventDefault();

  if(!email || !password){
   alert("Fill all fields");
   return;
  }

  setLoading(true);

  try{

   await API.post("/auth/login",{email,password});

   navigate("/dashboard");

  }catch(err){

   alert("Login failed");

  }finally{
   setLoading(false);
  }

 };

 return(

  <div className="min-h-screen bg-indigo-50">

   <div className="flex min-h-screen">

    {/* Left Image */}
    <div className="hidden lg:flex lg:w-[60%] bg-white items-center justify-center rounded-r-[5rem]">

     <img
      src="/AuthImg.png"
      alt="Task Manager"
      className="max-w-[80%]"
     />

    </div>


    {/* Right Form */}
    <div className="w-full lg:w-[40%] flex items-center justify-center px-6">

     <div className="max-w-md w-full">

      {/* Heading */}

      <div className="text-center mb-8">

       <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">

        <FaBrain className="text-white text-xl"/>

       </div>

       <h1 className="text-3xl font-bold text-gray-900">
        Welcome Back
       </h1>

       <p className="text-gray-600 mt-2">
        Login to manage your tasks
       </p>

      </div>


      {/* Form */}

      <form onSubmit={submit} className="space-y-4">

       <div className="relative">

        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>

        <input
         type="email"
         placeholder="Email"
         className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
        />

       </div>


       <div className="relative">

        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>

        <input
         type="password"
         placeholder="Password"
         className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
        />

       </div>


       <button
        disabled={loading}
        className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition"
       >

        {loading ? (
         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
         <>
          Login
          <FaArrowRight className="ml-2"/>
         </>
        )}

       </button>


       <p className="text-center text-gray-600">

        Don't have an account?{" "}

        <Link
         to="/register"
         className="text-indigo-600 font-semibold hover:underline"
        >
         Register
        </Link>

       </p>

      </form>

     </div>

    </div>

   </div>

  </div>

 );

}