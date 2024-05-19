// --- RESPONSIBLE : ALBERT
import { MRInscription } from "@/Model/MInscription";
import {Inscription_Ser_I} from "../Service/InscriptionSer"
import { InscriptionMod } from "@/Model/InscriptionMod";

export async function Inscription_Con_I(newInscription:MRInscription):Promise<number>{
    try {
       
        // if(newInscription.latitude > 0 || newInscription.longitude > 0){
            const response = await Inscription_Ser_I(newInscription);
            return 1
        //     if (response===1){
        //         return 1
        //     }else{
        //         return 0
        //     }
        // }else{
        //     return 0;
        // }
    } catch (error) {
        console.error("Error en el controlador al agregar una insxripcion:", error);
        throw error;
    }
}
