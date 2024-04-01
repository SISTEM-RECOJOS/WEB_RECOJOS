'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react';
import {MInscription} from "../../Model/MInscription"
import {MApiResponse} from "../../Model/MApiResponse"
import GoogleMaps from './CGoogleMpas';
import '../css/alert.css';
import { Inscription_Con_I } from '@/Controller/InscriptionCon';
import { Handlee } from 'next/font/google';


export function CFormInscription (){
    const inscriptionInicial:MInscription = {
        name: "",
        lastName: "",
        secondLastName: "",
        birthDay: new Date(),
        cellPhone: 0,
        gender: "MA",
        inscription: "BA",
        latitude: 0,
        longitude: 0,
        amountBucket: 0,
        amountContainer: 0,
        frecuency: "SE",
        pickUpDay: "Lunes, 08:00 am. a 10:00 am.",
        paymentMethod: "Efectivo pagado en cada Recojo",
        registrationDate: new Date(),
        modificationDate: new Date(),
        status: "AC",
        referenceLocation:""
      } ;
    const uri:string = process.env.URI_API_RECOJOS === undefined ? "" : process.env.URI_API_RECOJOS;
    const today = new Date().toISOString().slice(0, 10); 
    const [apiResponse, setApiResponse] = useState<MApiResponse | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleAlert = () => {
      setShowAlert(true);
    };
  
    const closeAlert = () => {
      setShowAlert(false);
    };
    const [inscription,SetInscription] = useState<MInscription>(
        inscriptionInicial
);
    

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const todayH = new Date().toISOString().slice(0, 10); 
        try {
            const response = await Inscription_Con_I(inscription)
            if(response === 1){
                handleAlert();
                SetInscription(inscriptionInicial);
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }

      };
    
      const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        SetInscription((prevPerson) => ({ ...prevPerson, [name]: value }));
      };

      const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;
        SetInscription((prevPerson) => ({ ...prevPerson, [name]: value }));
    };
    const onMapClick = (lat:number,lng:number)=>{
        SetInscription((prevPerson) => ({ ...prevPerson, latitude:lat , longitude:lng }));
    }

    
  return (
    <div className="container">
    <div className="form-image">
        <GoogleMaps onMapClick={onMapClick}/>
    </div>
    <div className="form">
        <form onSubmit={handleSubmit}>
            <div className="form-header">
                <div className="title">
                    <h1>INSCRIPCION</h1>
                </div>
               
            </div>

            <div className="input-group">
                <div className="input-box">
                    <label >Nombres :</label>
                    <input  type="text" name="name" value={inscription.name} onChange={handleChange} placeholder="Nombres" required/>
                </div>

                <div className="input-box">
                    <label >Apellido Paterno :</label>
                    <input  type="text" name="lastName" value={inscription.lastName} onChange={handleChange} placeholder="Apellido Materno" required/>
                </div>
                <div className="input-box">
                    <label >Apellido Materno :</label>
                    <input  type="text" name="secondLastName" value={inscription.secondLastName} onChange={handleChange} placeholder="Apellido Materno" required/>
                </div>
                <div className="input-box">
                    <label >Fecha de Nacimiento :</label>
                    <input  type="date" name="birthDay"  onChange={handleChange} placeholder="Digite su e-mail" required/>
                </div>

                <div className="input-box">
                    <label >Celular :</label>
                    <input  type="tel" name="cellPhone" value={inscription.cellPhone} onChange={handleChange} placeholder="(xx) xxxx-xxxx" required/>
                </div>

                <div className="input-box">
                    <label >Referencia de ubicacion :</label>
                    <input  type="text" name="referenceLocation" value={inscription.referenceLocation} onChange={handleChange} placeholder="Referencia de Ubicacion" required/>
                </div>
                <div className="input-box">
                    <label>Genero : 
                        <br/>
                        <select  name='gender' defaultValue={"MA"} onChange={handleSelectChange}  className="gender-group">
                            <option  value="MA">Masculino</option>
                            <option  value="FE">Femenino</option>
                            <option  value="OT">Otro</option>
                        </select>
                    </label>
                   
                </div>
                <div className="input-box">
                    <label>Inscripcion Plan : 
                        <br/>
                        <select name='inscription' defaultValue={"BA"} onChange={handleSelectChange} className="gender-group">
                            <option  value="BA">Baldes</option>
                            <option  value="CO">Contenedore</option>
                        </select>
                    </label>
                   
                </div>
                <div className="input-box">
                    <label >Cantidad de Baldes :</label>
                    <input id="baldes" type="number" value={inscription.amountBucket} onChange={handleChange} name="amountBucket" placeholder="0" required/>
                </div>
                <div className="input-box">
                    <label>Cantidad de Contenedores :</label>
                    <input id="contenedore" type="number" value={inscription.amountContainer} onChange={handleChange} name="amountContainer" placeholder="0" required/>
                </div>

                <div className="input-box">
                <label>Frecuencia de Recojo : 
                    <br/>
                    <select name='frecuency' defaultValue={"SE"} onChange={handleSelectChange} className="gender-group">
                        <option  value="SE">Semanal</option>
                        <option  value="QU">Quincenal</option>
                    </select>
                </label>
            </div>

            <div className="input-box">
                <label>Dia de Recojo : 
                    <br/>
                    <select name='pickUpDay' onChange={handleSelectChange} defaultValue={"Lunes, 08:00 am. a 10:00 am."} className="gender-group">
                        <option  value="Lunes, 08:00 am. a 10:00 am.">Lunes, 08:00 am. a 10:00 am. </option>
                        <option  value="Lunes, 04:00 pm. a 06:00 pm.">Lunes, 04:00 pm. a 06:00 pm.  </option>
                        <option  value="Domingo, 02:00 pm. a 04:00 pm. ">Domingo, 02:00 pm. a 04:00 pm.  </option>
                        <option  value="Domingo, 04:00 pm. a 6:00 pm.  ">Domingo, 04:00 pm. a 6:00 pm.  </option>
                    </select>
                </label>
            </div>

            <div className="input-box">
                <label> Metodo de Pago : 
                    <br/>
                    <select name='paymentMethod' defaultValue={"Efectivo pagado en cada Recojo"} onChange={handleSelectChange} className="gender-group">
                        <option  value="Efectivo pagado en cada Recojo">Efectivo pagado en cada Recojo </option>
                        <option  value="Efectivo pagado Mensualmente">Efectivo pagado Mensualmente </option>
                        <option  value="Qr pagado en cada Recojo">Qr pagado en cada Recojo </option>
                        <option  value="Qr pagado Mensualmente">Qr pagado Mensualmente</option>
                    </select>
                </label>
            </div>
            </div>
           
            <div className="continue-button">
                <button>INSCRIBIRME</button>
            </div>
        </form>

        {showAlert && (
        <div className="alert-container">
            <span className="close-btn" onClick={closeAlert}>&times;</span>
          <label>INCRIPCION CREADA CORRECTAMENTE</label>
        </div>
      )}
    </div>
</div>
)
}
// integrate main to Deeveopment -

/*

{
  "Name": "Camilaa",
  "LastName": "Deera",
  "SecondLastName": "Comp",
  "BirthDay": "2000-12-12",
  "CellPhone": 45673366",
  "Gender": "MA",
  "Inscription": "BA",
  "Latitude": 39.60195023024929,
  "Longitude": -9.070247506630178,
  "AmountBucket": 1,
  "AmountContainer": 0,
  "Frecuency": "SE",
  "PickUpDay": "Lunes, 08:00 am. a 10:00 am.",
  "PaymentMethod": "Efectivo pagado en cada Recojo",
  "RegistrationDate":"2000-12-12",
  "ModificationDate":"2000-12-12",
  "Status": "AC",
  "ReferenceLocation": "Frente de un arbol"
}


{
  "name": "Camilaa",
  "lastName": "Deera",
  "secondLastName": "Comp",
  "birthDay": "2000-12-12",
  "cellPhone": 45673366",
  "gender": "MA",
  "inscription": "BA",
  "latitude": 39.60195023024929,
  "longitude": -9.070247506630178,
  "amountBucket": 1,
  "amountContainer": 0,
  "frecuency": "SE",
  "pickUpDay": "Lunes, 08:00 am. a 10:00 am.",
  "paymentMethod": "Efectivo pagado en cada Recojo",
  "registrationDate":"2000-12-12",
  "modificationDate":"2000-12-12",
  "status": "AC",
  "referenceLocation": "Frente de un arbol"
}

{
  "name": "Camila",
  "lastName": "string",
  "secondLastName": "string",
  "birthDay": "2024-03-22T20:32:43.889Z",
  "cellPhone": 8788787,
  "gender": "FE",
  "inscription": "BA",
  "latitude": 54.54,
  "longitude": 34.443,
  "amountBucket": 1,
  "amountContainer": 0,
  "frecuency": "SE",
  "pickUpDay": "lunes",
  "paymentMethod": "Contado",
  "registrationDate": "2024-03-22T20:32:43.889Z",
  "modificationDate": "2024-03-22T20:32:43.889Z",
  "status": "AC",
  "referenceLocation": "frnt de un arbol"
}

*/