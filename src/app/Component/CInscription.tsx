'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react';
import {MInscription} from "../../Model/MInscription"
import {MApiResponse} from "../../Model/MApiResponse"
import { POST } from '@/Comunnication/API_RECOJOS_C';
import GoogleMaps from './CGoogleMpas';



export function CFormInscription (){
    const uri:string = process.env.URI_API_RECOJOS === undefined ? "" : process.env.URI_API_RECOJOS;
    const today = new Date().toISOString().slice(0, 10); 
    const [apiResponse, setApiResponse] = useState<MApiResponse | null>(null);

    const [inscription,SetInscription] = useState<MInscription>(
        {
            name: "",
            lastName: "",
            secondLastName: "",
            birthDay: "",
            cellPhone: "",
            gender: "MA",
            inscription: "BA",
            latitude: 0,
            longitude: 0,
            amountBucket: 0,
            amountContainer: 0,
            frecuency: "SE",
            pickUpDay: "Lunes, 08:00 am. a 10:00 am.",
            paymentMethod: "Efectivo pagado en cada Recojo",
            registrationDate: today,
            modificationDate: today,
            status: "AC",
            referenceLocation:""
          }
    );

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        try {




            if(inscription.amountBucket === 0 && inscription.amountContainer === 0)
            {

                alert("La cantidad de baldes o contenedores no puede ser 0")
                return;
            }
            else
            {
                if(inscription.amountBucket < 0 || inscription.amountContainer < 0)
                {

                    alert("La cantidad de baldes o contenedores no puede ser negativo")
                    return;
                }
            }
            console.log(uri)
            await POST("inscription",inscription)

            // Aquí puedes manejar la respuesta de la API, como mostrar un mensaje de éxito, etc.
        } catch (error) {
            // Maneja los errores de la solicitud POST
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
                    <input  type="text" name="name" onChange={handleChange} placeholder="Nombres" required/>
                </div>

                <div className="input-box">
                    <label >Apellido Paterno :</label>
                    <input  type="text" name="lastName"  onChange={handleChange} placeholder="Apellido Materno" required/>
                </div>
                <div className="input-box">
                    <label >Apellido Materno :</label>
                    <input  type="text" name="secondLastName"  onChange={handleChange} placeholder="Apellido Materno" required/>
                </div>
                <div className="input-box">
                    <label >Fecha de Nacimiento :</label>
                    <input  type="date" name="birthDay"  onChange={handleChange} placeholder="Digite su e-mail" required/>
                </div>

                <div className="input-box">
                    <label >Celular :</label>
                    <input  type="tel" name="cellPhone"  onChange={handleChange} placeholder="(xx) xxxx-xxxx" required/>
                </div>

                <div className="input-box">
                    <label >Referencia de ubicacion :</label>
                    <input  type="text" name="referenceLocation" onChange={handleChange} placeholder="Referencia de Ubicacion" required/>
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
                    <input id="baldes" type="number"  onChange={handleChange} name="amountBucket" placeholder="0" required/>
                </div>
                <div className="input-box">
                    <label>Cantidad de Contenedores :</label>
                    <input id="contenedore" type="number"  onChange={handleChange} name="amountContainer" placeholder="0" required/>
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
    </div>
</div>
)
}
