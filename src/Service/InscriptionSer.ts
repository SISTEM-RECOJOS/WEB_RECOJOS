// RESPONSIBLE : ALBERT
import { InscriptionMod } from "@/Model/InscriptionMod";
import {InsertCom} from "../Comunnication/RecojosCom"
import { MRInscription } from "@/Model/MInscription";
import { MApiResponse } from "@/Model/ApiResponseMod";

export async function Inscription_Ser_I(newInscription:MRInscription):Promise<MApiResponse>{
    try{
        const response:MApiResponse = await InsertCom("inscription",newInscription);
       return response
    }catch(err){
        console.error("Error al agregar una Inscripcion:", err);
        throw err;
    }
}