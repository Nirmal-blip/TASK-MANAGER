import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


//register user
export const registerUser = async(req,res)=>{

 const {name,email,password} = req.body;

 const userExists = await User.findOne({email});

 if(userExists){
  return res.status(400).json({message:"User already exists"});
 }

 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password,salt);

 const user = await User.create({
  name,
  email,
  password: hashedPassword
 });

 generateToken(res,user._id);

 res.status(201).json({
  _id:user._id,
  name:user.name,
  email:user.email
 });

};

//login user
export const loginUser = async(req,res)=>{

    const {email,password} = req.body;
   
    const user = await User.findOne({email});
   
    if(user && await bcrypt.compare(password,user.password)){
   
     generateToken(res,user._id);
   
     res.json({
      _id:user._id,
      name:user.name,
      email:user.email
     });
   
    }else{
   
     res.status(401).json({message:"Invalid credentials"});
    }
   
   };

   //logout
   export const logoutUser = (req,res)=>{

    res.cookie("token","",{
     httpOnly:true,
     expires:new Date(0)
    });
   
    res.status(200).json({
     message:"Logged out"
    });
   
   };

   //for getting details
   export const getMe = (req,res)=>{
    res.json(req.user);
   };