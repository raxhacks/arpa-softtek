import { SignupFormSchema, FormState } from '@/app/lib/denititions'
import { createUser } from '@/services/user.service';
import axios from 'axios';
import { createSession } from '@/app/actions/session'
import { redirect } from 'next/navigation';
 
export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
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
    const existingUser = await axios.post('')

    if (existingUser) {
        return {
          message: 'Email already exists, please login or use a different email.',
        }
      }

    // 3. Insert the user into the database or call an Auth Library's API 
    const data = await createUser(body);
    const user_id = data[2];
    
    if (!user_id) {
        return {
          message: 'An error occurred while creating your account.',
        }
      }
      // 4. Create user session
    await createSession(user_id)
    // 5. Redirect user
    redirect('/CargarArchivos')
    
}