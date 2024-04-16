import axios from 'axios'

export const createUser = async (userData: { email: string, password: string }) => {
    try {
        const response = await axios.post('https://arpa-2mgft7cefq-uc.a.run.app/user', JSON.stringify(userData) ,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {message, user_id} = response.data;
        if (user_id) {
            console.log("User creado");
        } else {
            console.log("no jalo")
            throw new Error('Failed to create user');
        }
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};
