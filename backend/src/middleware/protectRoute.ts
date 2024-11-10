import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "../db/prisma.js";

import {Request, Response, NextFunction, RequestHandler} from "express"

interface DecodedToken extends JwtPayload{ // we have added the userId in the token but the typescript dosent know that so we make an interface so that it knows
    userId: string;
}

declare global {  // by this we have addede a user property in the Request obj which contains an id
    namespace Express {
        export interface Request {
            user: {
                id: string;
            }
        }
    }
}

const protectRoute: RequestHandler =async (req:Request , res:Response, next:NextFunction): Promise<void>=>{ //the next function means that when the unction is rn properly after the the line of control goes to the next statement
    try{
       const token = req.cookies.jwt;

       if(!token){
         res.status(400).json({error : "unauthorised/no token provided"});
         return undefined;
       }

       const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken; // now we have told the typescript that the output we are getting from the decodedTokeb is the String type

       if(!decoded){ // if its true that means the token is invalid
         res.status(401).json({error:"Unauthorized - Invalid Token"});
         return undefined;
       }

       const user = await prisma.user.findUnique({where:{id:decoded.userId},select:{id:true, username:true, fullName: true, profilePic: true}});

       if(!user){
         res.status(401).json({error:"User not found"});
         return undefined;
       }

       req.user = user; //by default the Request obj. dosent have "user" , so we have to specifically add this field to the Request obj. by overwriting our global scope 

        next();
    }
    catch(error:any){
        console.log("error in protectRoute middleware" , error.message);
        res.status(500).json({error : "Internal Server Error"});    
    }
}

export default protectRoute;
