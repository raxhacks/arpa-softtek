import { SignupFormSchema, FormState } from '@/app/lib/defititions'
import { createUser } from '@/services/user.service';
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
    
    // 2. Prepare data for insertion into database
    const { email, password } = validatedFields.data
    const body = {
        email: email,
        password: password
    };

    // 3. Insert the user into the database or call an Auth Library's API 
    const token = await createUser(body);

    if (!token) {
        console.log('user created already')
        return {
          message: 'Esta cuenta ya se encuentra registrada.',
        }
      }

    // 4. Create user session
    await createSession(token)
    // 5. Redirect user
    redirect('/CargarArchivos')
    
}