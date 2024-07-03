// --- RESPOSIBLE : ALBERT
import { MApiResponse } from "@/Model/ApiResponseMod";
import axios, { AxiosResponse } from "axios";

export async function InsertCom(url: string, value: any): Promise<MApiResponse> {
    try {
        // --- VARIABLES
       

        const URI_API_RECOJOS:string =  process.env.URI_API_RECOJOS || "https://api-recojos.somee.com/api/";
        const response = await axios.post(`${URI_API_RECOJOS}${url}`, value);
        return await response.data as MApiResponse;
        
    } catch (error) {
        // Maneja los errores de la solicitud POST
        console.error('Error al enviar el formulario:', error);
        throw error; // Lanza la excepción nuevamente para que pueda ser manejada fuera de la función
    }
}
