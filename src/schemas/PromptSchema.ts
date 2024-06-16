import {z} from 'zod'

export const PromptSchema = z.object({
    prompt: z.string()
})