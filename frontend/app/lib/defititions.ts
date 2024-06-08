import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Por favor ingrese un correo electrónico válido.' }).trim(),
  password: z
    .string()
    .min(7, { message: 'Contener al menos 7 caracteres.' })
    .regex(/[a-zA-Z]/, { message: 'Contener al menos una letra.' })
    .regex(/[0-9]/, { message: 'Contener al menos un numero.' })
    .regex(/[_.-]/, { message: 'Contener al menos un guión, guión bajo o punto.' })
    .regex(/^[^\s]+$/, { message: 'No contener espacios en blanco.' })
    .trim(),
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
  