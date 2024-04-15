import Cookies from 'js-cookie';

export function getToken() {
    // const cookies = document.cookie.split(';'); // Obtener todas las cookies y dividirlas en un array
    // for (let i = 0; i < cookies.length; i++) {
    //   const cookie = cookies[i].trim(); // Eliminar espacios en blanco
    //   // Verificar si la cookie contiene el token (asumiendo que el nombre de la cookie es 'token')
    //   if (cookie.startsWith('token=')) {
    //     return cookie.substring('token='.length, cookie.length); // Devolver el valor del token
    //   }
    // }
    // return null; // Devolver null si no se encontró el token en las cookies
    
    const token = Cookies.get('token');
    if (token) {
    // Token encontrado, hacer algo con él (por ejemplo, enviar una solicitud a la API)
    console.log('Token:', token);
    } else {
    // Token no encontrado
    console.error('Token no encontrado en las cookies');
    }
}
