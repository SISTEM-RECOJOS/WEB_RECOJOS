// RESPONSIBLE : ALBERT
import { MInscription } from "@/Model/InscriptionMod";
import {InsertCom} from "../Comunnication/RecojosCom"

export async function Inscription_Ser_I(newInscription:MInscription):Promise<number>{
    try{
        const response = await InsertCom("inscription",newInscription);
        if(response.status != 200){
            return 0
        }else{
            return 1
        }
    }catch(err){
        console.error("Error al agregar una Inscripcion:", err);
        throw err;
    }
}