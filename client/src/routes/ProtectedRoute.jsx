import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

export default function ProtectedRoute({children}){

 const [loading,setLoading] = useState(true);
 const [auth,setAuth] = useState(false);

 useEffect(()=>{

  const checkAuth = async()=>{

   try{

    await API.get("/auth/me");
    setAuth(true);

   }catch{

    setAuth(false);

   }

   setLoading(false);

  };

  checkAuth();

 },[]);

 if(loading) return <p>Loading...</p>;

 return auth ? children : <Navigate to="/login" />;

}