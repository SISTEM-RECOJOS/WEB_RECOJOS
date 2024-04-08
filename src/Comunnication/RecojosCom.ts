// --- RESPOSIBLE : ALBERT
import axios, { AxiosResponse } from "axios";

export async function InsertCom(url: string, value: any): Promise<AxiosResponse> {
    try {
        // --- VARIABLES
        const URI_API_RECOJOS = process.env.URI_API_RECOJOS as string;
        return await axios.post(`${URI_API_RECOJOS}${url}`, value);
        
    } catch (error) {
        // Maneja los errores de la solicitud POST
        console.error('Error al enviar el formulario:', error);
        throw error; // Lanza la excepción nuevamente para que pueda ser manejada fuera de la función
    }
}
