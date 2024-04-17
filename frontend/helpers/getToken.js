import { getCookies } from "cookies-next";

export function getToken() {    
    const token = getCookies('token');
    console.log(token);
    
    if (token) {
    // Token encontrado, hacer algo con él (por ejemplo, enviar una solicitud a la API)
    console.log('Token:', token);
    } else {
    // Token no encontrado
    console.error('Token no encontrado en las cookies');
    }
}
