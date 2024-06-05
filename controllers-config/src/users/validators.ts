import { z } from '@hono/zod-validator'

export const userSchema = z.object({
    id:z.number(),
    name:z.string(),
    email:z.string().email(),
    // password:z.string(),
})