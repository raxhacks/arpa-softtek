import { SignupFormSchema, FormState } from '@/app/lib/definitionsLogin'
import { createSession } from './session';
import { redirect } from 'next/navigation';
import { loginAuth } from '@/services/login.service';

export async function authLogin(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
          errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    // 2. Prepare data for insertion into database
    const { email, password } = validatedFields.data
    const body = {
        email: email,
        password: password
    };

    // Check if the user's email already exists
    // const existingUser = await axios.post('')

    // if (existingUser) {
    //     return {
    //       message: 'Email already exists, please login or use a different email.',
    //     }
    //   }

    // 3. Insert the user into the database or call an Auth Library's API 
    const token = await loginAuth(body);

    if (!token) {
        console.log('Credenciales incorrectas')
        return {
          message: 'Credenciales incorrectas',
        }
      }
    // 4. Create user session
    await createSession(token)
    // 5. Redirect user
    redirect('/CargarArchivos')
    
}