// RESPONSIBLE : ALBERT
import { InscriptionMod } from "@/Model/InscriptionMod";
import {InsertCom} from "../Comunnication/RecojosCom"

export async function Inscription_Ser_I(newInscription:InscriptionMod):Promise<number>{
    try{
        console.log("entra a serevice")
        const response = await InsertCom("inscription",newInscription);
       return 1
    }catch(err){
        console.error("Error al agregar una Inscripcion:", err);
        throw err;
    }
}