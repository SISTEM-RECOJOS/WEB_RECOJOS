import axios from "axios";
import dotenv from "dotenv"
dotenv.config();

export async function POST(url:string,value:any){
    try {
        // Realiza una solicitud POST al endpoint de la API
        const response = await axios.post(`http://localhost:5289/api/${url}`, value);
    
        console.log(response.data);
    } catch (error) {
        // Maneja los errores de la solicitud POST
        console.error('Error al enviar el formulario:', error);
    }
}