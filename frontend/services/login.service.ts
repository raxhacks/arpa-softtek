export const login = async (userData: { email: string, password: string }) => {
    try {
        const response = await fetch('https://arpa-2mgft7cefq-uc.a.run.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        return;
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Failed to login');
    }
};