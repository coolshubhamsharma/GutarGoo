import jwt from 'jsonwebtoken'
import  {Response} from 'express'

const generateToken = (userId:string , res:Response)=>{
   const token = jwt.sign({userId}, process.env.JWT_SECRET!, {
    expiresIn: "15d"
   })

   res.cookie("jwt", token, {
    maxAge: 15*24*60*60*1000, //milliseconds
    httpOnly:true,//js cannot access the cookie (prevents xss cross site scripting)
    sameSite:"strict", //prevents CSRF attack cross-site request forgery
    secure: process.env.NODE_ENV !== "development" 
   });

   return token;
}

export default generateToken;