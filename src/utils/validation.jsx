import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "please input correct email" }),
  password: z
    .string()
    .min(8, { message: " Password length must be at least 8;  " })
    .regex(/[A-Z]/, { message: "password must contain A-Z;  " })
    .regex(/[a-z]/, { message: "password must contain a-z;  " })
    .regex(/[0-9]/, { message: "password must contain 0-9;  " }),
  date: z.number(),
  id: z.string(),
});

export const Note = z.object({
  userId: z.string(),
  id: z.string(),
  date: z.number(),
  noteName: z.string().min(1, { message: "Note name can not be empty" }),
  noteText: z.string(),
});
