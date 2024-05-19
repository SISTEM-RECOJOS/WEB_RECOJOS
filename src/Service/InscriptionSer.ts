// RESPONSIBLE : ALBERT
import { InscriptionMod } from "@/Model/InscriptionMod";
import {InsertCom} from "../Comunnication/RecojosCom"
import { MRInscription } from "@/Model/MInscription";

export async function Inscription_Ser_I(newInscription:MRInscription):Promise<number>{
    try{
        const response = await InsertCom("inscription",newInscription);
       return 1
    }catch(err){
        console.error("Error al agregar una Inscripcion:", err);
        throw err;
    }
}