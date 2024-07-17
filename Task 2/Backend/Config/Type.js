import { z } from 'zod'

export const signupParser = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string(),
    role: z.string()
})