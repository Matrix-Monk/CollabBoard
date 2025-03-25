import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";


export interface CustomRequest extends Request {
  userId?: string;
}

export const middleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {

    const token = req.headers.authorization as string;
    


//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

  const decodedData = jwt.verify(token, JWT_SECRET) as JwtPayload;

  // if (!decodedData) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }


  //   @ts-ignore
  req.userId = decodedData.userId;

  next();
};
