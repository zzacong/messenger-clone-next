import { z } from 'zod';

export const messageSchema = z.object({
  id: z.string(),
  message: z.string(),
  username: z.string(),
  profilePic: z.string().url(),
  email: z.string(),
  createdAt: z.number(),
});

export type Message = z.infer<typeof messageSchema>;
