import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { CustomRequest, middleware } from './middleware.js';
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
    
    const hashedPassword = await bcrypt.hash(password, 10);


    const response = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const userId = response.id;

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: 'User created', token });

})


app.post("/signin", async (req, res) => {

    const UserInputs = SigninUserSchema.safeParse(req.body);

    if (!UserInputs.success) {
      res.status(400).json({ message: "Invalid inputs" });
      return;
    }

    const { email, password } = UserInputs.data;

   const exists = await prisma.user.findFirst({
     where: {
       email: email,
     },
   });

   if (!exists) {
     res.status(400).json({ message: "User does not exists" });

     // redirect to signup

     return;
   }
    
    const userId = exists.id;

    const hashedPassword = exists.password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);


    if (!passwordMatch) {
        res.status(400).json({ message: "Incorrect password" });

        // redirect to signin

        return;
    }
    
    
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });


});



app.post("/create-room", middleware, async (req: CustomRequest, res) => {

     const UserInputs = CreateRoomSchema.safeParse(req.body);

     if (!UserInputs.success) {
       res.status(400).json({ message: "Invalid inputs" });
       return;
     }

     const { name, description } = UserInputs.data;

    const  userId  = Number(req.userId)
  
    if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const room = await prisma.room.create({
    data: {
      name,
      description,
      userId,
    },
    })

  

  const roomId = room.id; 

  res.json({
    message: "Room created",
    roomId,
    userId
  });

});


app.listen(3001, () => {
    console.log('http-backend is listening on port 3001');
})