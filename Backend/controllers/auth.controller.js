import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be at letest 6 characters"
            })
        }
        const existingUserByEmail = await User.findOne({ email: email })
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }
        const existingUserByUsername = await User.findOne({ username: username })
        if (existingUserByUsername) {
            return res.status(400).json({
                success: false,
                message: "username already exists"
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password, salt)

        const PROFILEPIC = ["avtar1.jpg", "avtar2.jpg"];
        const image = PROFILEPIC[Math.floor(Math.random() * PROFILEPIC.length)];

        const newUser = new User({
            email: email,
            password: hashpassword,
            username: username,
            image

        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                success: true,
                user: {
                    ...newUser._doc,
                    password: "",
                },
            });

        }


    } catch (error) {
        console.log("error is signup controller", error.message);

        res.status(500).json({
            success: flase,
            message: "Internal server error"
        })
    }

}
export async function login(req, res) {
   try {
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    const user=await User.findOne({email:email});
    if(!user){
        res.status(404).json({success:false,message:"Invalid credentials"})
    }
    const ispasswordCorrect =await bcryptjs.compare(password,user.password);
    if(!ispasswordCorrect){
        res.status(404).json({success:false,message:"Invalid credentials"})
    }
    generateTokenAndSetCookie(user._id,res)
    res.status(200).json({
        success:true,
        user:{
            ...user._doc,
            password:""
        }
    })

   } catch (error) {
    console.log("error in login controller",error.message);
    res.status(500).json({success:false,message:"Internal server error"})

    
   }
}
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({success:true,message:"Logged out successfully"})
  } catch (error) {
    console.log("error in logout controller",error.message);
    res.status(500).json({
        success:false,
        message:"Internal server error"
    })
    
  }
}