import { setCookie } from "cookies-next";
import axios from 'axios'

export const createUser = async (userData: { email: string, password: string }) => {
    const response = await axios.post('https://arpa-2mgft7cefq-uc.a.run.app/user', JSON.stringify(userData) ,{
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const {message, user_id, token} = response.data;

    if (user_id && token) {
        console.log('User created');
        return JSON.stringify(response)

    } else {
        console.error('Failed to create user');
        return JSON.stringify(response)
    }
};
