import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Por favor ingrese un correo electrónico válido' }).trim(),
  password: z
    .string()
})
 
export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export interface SessionPayload {
    [key: string]: any;
  }
  