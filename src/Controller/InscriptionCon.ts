// --- RESPONSIBLE : ALBERT
import {Inscription_Ser_I} from "../Service/InscriptionServ"
import { MInscription } from "@/Model/InscriptionMod";

export async function Inscription_Con_I(newInscription:MInscription):Promise<number>{
    try {
        if(newInscription.latitude > 0 || newInscription.longitude > 0){
            const response = await Inscription_Ser_I(newInscription);
            if (response===1){
                return 1
            }else{
                return 0
            }
        }else{
            return 0;
        }
    } catch (error) {
        console.error("Error en el controlador al agregar una insxripcion:", error);
        throw error;
    }
}


/*

 if(inscription.latitude === 0 && inscription.longitude === 0)
            {
                // alert("Seleccionees la Posicion de su ogar")
            }

            if(inscription.amountBucket >= 0 || inscription.amountContainer >= 0)
            {
                // alert("necesitas ingrsar la cantida de baldes o contendor")
            }
            
            if(inscription.cellPhone === 0)
            {
                // alert("Ingres tu numero de celular por favor")
            }
            if(inscription.name != "")
            {
                // alert("Ingres tu Nombre de celular por favor")
            }

*/