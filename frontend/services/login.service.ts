import { setCookie } from "cookies-next";
import axios from "axios";

export const login = async (userData: { email: string, password: string }) => {
    try {
        const response = await axios.post('https://arpa-2mgft7cefq-uc.a.run.app/login',JSON.stringify(userData), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {message, token} = response.data;

        if (token) {
            setCookie('token', token);
            console.log('Login exitoso');
        } else {
            console.log("Error creando usuario");
            throw new Error('Failed to create user');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Failed to login');
    }
};

