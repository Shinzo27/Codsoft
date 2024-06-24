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

export const ProductType = z.object({
    name: z.string(),
    description: z.string(),
    quantity: z.number(),
    price: z.number(),
    isActive: z.string(),
    category: z.string()
})

