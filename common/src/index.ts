import { z } from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().optional(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const createPost = z.object({
  title: z.string(),
  content: z.string(),
});

export const updatePost = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreatePost = z.infer<typeof createPost>;
export type UpdatePost = z.infer<typeof updatePost>;
