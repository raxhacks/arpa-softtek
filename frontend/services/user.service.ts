import axios from 'axios'

export const createUser = async (userData: { email: string, password: string }) => {
    try {
        const response = await axios.post('https://arpa-2mgft7cefq-uc.a.run.app/user', JSON.stringify(userData) ,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {message, user_id, token} = response.data;
    
        if (user_id && token) {
            return token
    
        } else {
            console.error('Failed to create user, or user alredy registered');
            return null
        }
    } catch(error){
        console.error('Failed to create user');
        return null
    }

};
