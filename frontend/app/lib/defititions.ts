import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Por favor ingrese un correo electrónico válido' }).trim(),
  password: z
    .string()
    .min(7, { message: 'Ser más larga de 7 caracteres' })
    .regex(/[a-zA-Z]/, { message: 'Contener al menos una letra' })
    .regex(/[0-9]/, { message: 'Contener al menos un numero.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contener al menos un caracter especial.',
    })
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
  