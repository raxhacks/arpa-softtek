// Posible estructura requerida, la cloud function actualmente no recibe ningún parámetro
export const createDocument = async (user_id: string, new_document: any) => {
    try {
        const response = await fetch('https://arpa-2mgft7cefq-uc.a.run.app/document', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, new_document }),
        }); // Necesario analizar el asunto de la integración del JWT a la petición

        if (!response.ok) {
            throw new Error('Failed to create document');
        }

        const responseData = await response.json();
        return responseData.document_id;
    } catch (error) {
        console.error('Error creating document:', error);
        throw new Error('Failed to create document');
    }
};
