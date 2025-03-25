import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const SigninUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const CreateRoomSchema = z.object({
  name: z.string(),
  description: z.string(),
});