import axios, { AxiosResponse } from "axios";

export async function InsertCom(url: string, value: any): Promise<AxiosResponse> {
    try {
        return await axios.post(`http://localhost:5289/api/${url}`, value);
        
    } catch (error) {
        // Maneja los errores de la solicitud POST
        console.error('Error al enviar el formulario:', error);
        throw error; // Lanza la excepción nuevamente para que pueda ser manejada fuera de la función
    }
}
