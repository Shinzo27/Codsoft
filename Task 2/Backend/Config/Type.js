import { z } from 'zod'

export const signupParser = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string(),
    role: z.string()
})

export const signinParser = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})