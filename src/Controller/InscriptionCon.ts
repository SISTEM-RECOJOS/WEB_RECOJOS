// --- RESPONSIBLE : ALBERT
import { MRInscription } from "@/Model/MInscription";
import {Inscription_Ser_I} from "../Service/InscriptionSer"
import { InscriptionMod } from "@/Model/InscriptionMod";

export async function Inscription_Con_I(newInscription:MRInscription):Promise<number>{
    try {
            const response = await Inscription_Ser_I(newInscription);
            return response.response
    } catch (error) {
        console.error("Error en el controlador al agregar una insxripcion:", error);
        throw error;
    }
}
