import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/user' || 'http://localhost:3001/user';

export const createUser = async (email: string, password: string, ) => {
    try{
        const body = {
            email,
            password
        }
        const response = await axios.post(baseUrl, body);
        const {message, user_id} = response?.data;

        if(user_id){
            console.log("User created successfully")
            return true
        } else {
            console.error("Error al crear el usuario")
            return false
        }

    } catch (error){
        console.error("Error")
    }
};