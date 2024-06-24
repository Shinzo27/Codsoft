import {z} from 'zod'

export const SignUp = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
})

export const SignIn = z.object({
    username: z.string(),
    password: z.string(),
})

