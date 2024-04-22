import { SignupFormSchema, FormState } from '@/app/lib/defititions'
import { createUser } from '@/services/user.service';
import axios from 'axios';
import { createSession } from '@/app/actions/session'
import { redirect } from 'next/navigation';
 
export async function signup(state: FormState, formData: FormData) {
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
    console.log('valide todo')

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
    const token = await createUser(body);
    console.log('Cree el usuario');

    if (!token) {
        console.log('An error occurred while creating your account.')
        return {
          message: 'An error occurred while creating your account.',
        }
      }
    console.log('User creado para asegurar')
    // 4. Create user session
    const session = await createSession(token)
    console.log('cree la sesion', session);
    // 5. Redirect user
    redirect('/CargarArchivos')
    
}