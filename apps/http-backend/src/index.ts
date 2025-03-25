import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { CustomRequest, middleware } from './middleware';
import { JWT_SECRET } from "@repo/backend-common/config";

import { CreateUserSchema, SigninUserSchema, CreateRoomSchema } from "@repo/common/types";

import { prisma } from "@repo/db/prisma-client";



const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {

    const UserInputs = CreateUserSchema.safeParse(req.body);

    if (!UserInputs.success) {
      res.status(400).json({ message: "Invalid inputs" });
      return;
    }

    const { name, email, password } = UserInputs.data;

    // Check if user already exists
    const exists = await prisma.user.findFirst(
        {
            where: {
                email : email
            }
        }
    )
    
    if (exists) {

        res.status(400).json({ message: "User already exists" });

        // redirect to signin

        return

    }
    
    

    const hashedPassword = bcrypt.hash(password, 10);


    // Create user 


    const userId = "1"

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: 'User created', token });

})


app.post("/signin", (req, res) => {

    const UserInputs = SigninUserSchema.safeParse(req.body);

    if (!UserInputs.success) {
      res.status(400).json({ message: "Invalid inputs" });
      return;
    }

    const { email, password } = UserInputs.data;

    // Check if user exists
    // If user does not exist, redirect to signup

    // Check if password is correct
    // If password is incorrect, redirect to signin

    const userId = "1";

    console.log(JWT_SECRET);
    
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });


});



app.post("/create-room", middleware, (req: CustomRequest, res) => {

     const UserInputs = CreateRoomSchema.safeParse(req.body);

     if (!UserInputs.success) {
       res.status(400).json({ message: "Invalid inputs" });
       return;
     }

     const { name, description } = UserInputs.data;

    const {userId} = req

    // db call to create room



    const roomId = userId; 

    res.json({ message: "Room created", roomId, userId });
});


app.listen(3001, () => {
    console.log('http-backend is listening on port 3001');
})