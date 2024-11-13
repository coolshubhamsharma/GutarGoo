import { Request , RequestHandler, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs"
import generateToken from "../utils/generateToken.js";


export const signup: RequestHandler = async (req: Request , res: Response): Promise<void> =>{
   try{
       const {fullName, username, password, confirmPassword, gender} = req.body;

       // server side validation
       if (!fullName || !username || !password || !confirmPassword || !gender){ 
         res.status(400).json({error:'please fill in the fields'});
         return undefined;
       }

       if(password != confirmPassword){
         res.status(400).json({error:'passwords dont match'});
         return undefined
       }
       
       //checking whether the username the user wants is available
       const user = await prisma.user.findUnique({ where: {username}});
       if (user){
         res.status(400).json({error:'username already exists'});
         return undefined
       } 

       //hashing the password using bcrypt
       const salt = await bcryptjs.genSalt(10); //creating the salt value using the bcrypt
       const hashedPassword = await bcryptjs.hash(password,salt);

       //random profile pics for users
       const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
       const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

       //creating the user
       const newUser = await prisma.user.create({
        data:{
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic:gender==='male'? boyProfilePic:girlProfilePic
        }
       });

       // if the user is successfully created we will generate an authentication token
       if(newUser){
        //generating token
        generateToken(newUser.id , res);

        // conformation for the newly created user
        res.status(201).json({
            id: newUser.id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })
       }else{
        // error in creating the new user   
        res.status(400).json({error:'invalid user data'});
        return undefined;
       }
   }
   catch(error:any){
      console.log('error in signup controller' , error.message);
      res.status(500).json({error:'internal server error'});
      return undefined
   }
}

export const login: RequestHandler = async (req:Request,res:Response): Promise<void>=>{

  try{
    const {username , password} = req.body; //getting username and password from the body of the request
    const user = await prisma.user.findUnique({ where : { username }}); //finding the user using its username
    
    //first we need to check if the user is present in the databse or not
    if(!user){
       res.status(400).json({error:'invalid credentials'}); 
       return undefined;
    }
    //checking the password
    const isPasswordCorrect = await bcryptjs.compare(password , user.password);

    if(!isPasswordCorrect){
       res.status(400).json({error:'invalid credentials'});
       return undefined;
    }

    //if the flow of control is here that means the password is correct and now we generate a token for the user

    generateToken(user.id , res);

    //sending the responses
    res.status(200).json({
      id:user.id,
      fullName:user.fullName,
      username:user.username,
      profilePic:user.profilePic
    })

  }
  catch(error:any){
    console.log("error in login contrller",error.message);
    res.status(500).json({error:"Internal Server Error"});
  }

}

export const logout = async (req:Request,res:Response)=>{

  try{
    res.cookie("jwt","",{ maxAge:0 }); //clearing the cookie
    res.status(200).json({message:"logged out successfully"});
  }
  catch(error:any){
    console.log("Error in logout controller" , error.message);
    res.status(500).json({error:"internal server error"});
  }

}

export const getMe = async (req:Request , res:Response)=>{
   try{
      const user = await prisma.user.findUnique({where : {id:req.user.id}}); //we dont have the user field in the request that's what the typescript  tells us outof the box 
      
      if(!user){
         res.status(404).json({error:"user not found"});
         return undefined;
      }

      res.status(200).json({
        id:user.id,
        fullName:user.fullName,
        username:user.username,
        profilePic:user.profilePic
      })
   }
   catch(error:any){
    console.log("error in getMe controller" , error.message);
    res.status(500).json({error:"internal server error"});
   }
}