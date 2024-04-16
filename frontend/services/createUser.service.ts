export const createUser = async (userData: { email: string, password: string }) => {
    try {
        const response = await fetch('https://arpa-2mgft7cefq-uc.a.run.app/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const responseData = await response.json();
        return responseData.user_id; // El servicio también debe regresar la respuesta de la cloud function?

    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};
