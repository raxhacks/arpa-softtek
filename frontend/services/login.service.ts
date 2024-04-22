import axios from "axios";

export const loginAuth = async (userData: { email: string, password: string }) => {
    const response = await axios.post('https://arpa-2mgft7cefq-uc.a.run.app/login', JSON.stringify(userData), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const {message, token} = response.data;

    if (token) {
        console.log('Login exitoso');
        return token
    } 
    console.error('Error logging in:');
    return false
};

