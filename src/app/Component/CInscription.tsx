// --- RESPONSIBLE : ALBERT
// --- MODIFY : ROSA
'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react';
import {InscriptionMod} from "../../Model/InscriptionMod"
import {MApiResponse} from "../../Model/ApiResponseMod"
import GoogleMaps from './CGoogleMpas';
// import '../css/alert.css';
import { Inscription_Con_I } from '@/Controller/InscriptionCon';
import { Handlee } from 'next/font/google';
import { Inscription, MRInscription, Person,User } from '@/Model/MInscription';
// import LstGoogleMaps from './LstPoints';

interface Point {
    lat:number
    lng:number
}
type InputText = {
    value: string;
    text: string;
  };
  

  
export function CFormInscription (){
    // --- VARIABLES
    const genderOptions: InputText[] = [
        { value: "MA", text: "Masculino" },
        { value: "FE", text: "Femenino" },
        { value: "OT", text: "Otro" }
      ];
      const containerOptions: InputText[] = [
        { value: "BA", text: "Baldes" },
        { value: "CO", text: "Contenedore" }
      ];
      const frequencyOptions: InputText[] = [
        { value: "SE", text: "Semanal" },
        { value: "QU", text: "Quincenal" }
      ];

      const scheduleOptions: InputText[] = [
        { value: "LU,08:00:am,10:00:am", text: "Lunes, 08:00 am. a 10:00 am." },
        { value: "LU,04:00:pm,06:00:pm", text: "Lunes, 04:00 pm. a 06:00 pm." },
        { value: "DO,02:00:pm,04:00:pm", text: "Domingo, 02:00 pm. a 04:00 pm." },
        { value: "DO,04:00:pm,06:00:pm", text: "Domingo, 04:00 pm. a 6:00 pm." }
      ];
      const paymentOptions: InputText[] = [
        { value: "EF,DI", text: "Efectivo pagado en cada Recojo" },
        { value: "EF,ME", text: "Efectivo pagado Mensualmente" },
        { value: "QR.DI pagado en cada Recojo", text: "Qr pagado en cada Recojo" },
        { value: "QR,ME", text: "Qr pagado Mensualmente" }
      ];
      const placeOptions: InputText[] = [
        { value: "CASA", text: "Casa" },
        { value: "RESTAURANTE", text: "Restaurante" },
        { value: "HOTEL", text: "Hotel" },
        { value: "ESCUELA", text: "Escuela" },
        { value: "HOSPITAL", text: "Hospital" },
        { value: "OFICINA", text: "Oficina" },
        { value: "MERCADO", text: "Mercado" },
        { value: "SUPERMERCADO", text: "Supermercado" },
        { value: "PARQUE", text: "Parque" },
        { value: "CENTRO COMERCIAL", text: "Centro comercial" },
        { value: "ESTADIO", text: "Estadio" },
        { value: "FÁBRICA", text: "Fábrica" },
        { value: "GRANJA", text: "Granja" },
        { value: "JARDÍN COMUNITARIO", text: "Jardín comunitario" },
        { value: "CENTRO DE CONVENCIONES", text: "Centro de convenciones" }
      ];
      
      
      
    const [person,setPerson] = useState<Person>({
        name: "",
        lastName: "",
        secondLastName: "",
        birthDay: new Date(),
        cellPhone: "",
        gender: "",
        modificationDate: new Date(),
        registrationDate: new Date(),
        status: "AC"
      });

      
    const [user,setUser] = useState<User>({
    occupation: "",
    qr: ""
    });

    const [inscription,setInscription]= useState<Inscription>({
        typePlace: "",
        referenceLocation: "",
        latitude: 0,
        longitude: 0,
        nameInscription: "",
        amountBucket: 0,
        amountContainer: 0,
        paymentMethod: "",
        frecuency: "",
        registrationDate: new Date(),
        modificationDate: new Date(),
        status: "AC",
        pickUpDay: "",
        idPerson: ""
      });

    
    const today = new Date().toISOString().slice(0, 10); 
    const [apiResponse, setApiResponse] = useState<MApiResponse | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleAlert = () => {
      setShowAlert(true);
    };
  
    const closeAlert = () => {
      setShowAlert(false);
    };
 
    
    // --- METHODS

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const todayH = new Date().toISOString().slice(0, 10); 
        try {
            const inscription_ = {
                person: person,
                user: user,
                inscription: inscription} as MRInscription;

                console.log(inscription_)
            const response = await Inscription_Con_I(inscription_)
            console.log(response)
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }

      };
    
      const handleChangeInscription = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setInscription((p) => ({ ...p, [name]: value }));
      };
      const handleChangePerson = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setPerson((p) => ({ ...p, [name]: value }));
      };
      const handleSelectChangePerson = (e: ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setPerson((p) => ({ ...p, [name]: value }));
        };
      const handleSelectChangeInscription = (e: ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setInscription((i) => ({ ...i, [name]: value }));
        };
    const onMapClick = (lat:number,lng:number)=>{
        setInscription((prevPerson) => ({ ...prevPerson, latitude:lat , longitude:lng }));
    }
   

    // -- COMPONENT
  return (
    <div className="container">
    <div className="form-image">
        {/* <LstGoogleMaps points={points} onMapClick={onMapClick}/> */}
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
                    <input  type="text" name="name" value={person.name} onChange={handleChangePerson} placeholder="Nombres" required/>
                </div>

                <div className="input-box">
                    <label >Apellido Paterno :</label>
                    <input  type="text" name="lastName" value={person.lastName} onChange={handleChangePerson} placeholder="Apellido Materno" required/>
                </div>

                <div className="input-box">
                    <label >Apellido Materno :</label>
                    <input  type="text" name="secondLastName" value={person.secondLastName} onChange={handleChangePerson} placeholder="Apellido Materno" required/>
                </div>
                <div className="input-box">
                    <label>Tipo Lugar : 
                        <br/>
                        <select  name='typePlace' onChange={handleSelectChangeInscription}  className="gender-group">
                            {placeOptions.map(g=><option key={g.value} value={g.value}>{g.text}</option>)}
                        </select>
                    </label>
                   
                </div>
                <div className="input-box">
                    <label >Nombre de su Residencia :</label>
                    <input  type="text" name="nameInscription" value={inscription.nameInscription} onChange={handleChangeInscription} placeholder="Nombre de su Residencia" required/>
                </div>
                <div className="input-box">
                    <label >Fecha de Nacimiento :</label>
                    <input  type="date" name="birthDay" value={person.birthDay.toString()} onChange={handleChangePerson} placeholder="Digite su e-mail" required/>
                </div>

                <div className="input-box">
                    <label >Celular :</label>
                    <input  type="tel" name="cellPhone" value={person.cellPhone} onChange={handleChangePerson} placeholder="(xx) xxxx-xxxx" required/>
                </div>

                <div className="input-box">
                    <label >Referencia de ubicacion :</label>
                    <input  type="text" name="referenceLocation" value={inscription.referenceLocation} onChange={handleChangeInscription} placeholder="Referencia de Ubicacion" required/>
                </div>
                <div className="input-box">
                    <label>Genero : 
                        <br/>
                        <select  name='gender' onChange={handleSelectChangePerson}  className="gender-group">
                            {genderOptions.map(g=><option key={g.value} value={g.value}>{g.text}</option>)}
                        </select>
                    </label>
                   
                </div>

                <div className="input-box">
                    <label>Inscripcion Plan : 
                        <br/>
                        <select name='inscription' onChange={handleSelectChangeInscription} className="gender-group">
                            {containerOptions.map(c=><option key={c.value} value={c.value}>{c.text}</option>)}
                        </select>
                    </label>
                   
                </div>
                <div className="input-box">
                    <label >Cantidad de Baldes :</label>
                    <input id="baldes" type="number" value={inscription.amountBucket} onChange={handleChangeInscription} name="amountBucket" placeholder="0" required/>
                </div>
                <div className="input-box">
                    <label>Cantidad de Contenedores :</label>
                    <input id="contenedore" type="number" value={inscription.amountContainer} onChange={handleChangeInscription} name="amountContainer" placeholder="0" required/>
                </div>

                <div className="input-box">
                    <label>Frecuencia de Recojo : 
                        <br/>
                        <select name='frecuency' onChange={handleSelectChangeInscription} className="gender-group">
                            {frequencyOptions.map(c=><option key={c.value} value={c.value}>{c.text}</option>)}
                        </select>
                    </label>
                </div>

            <div className="input-box">
                <label>Dia de Recojo : 
                    <br/>
                    <select name='pickUpDay' onChange={handleSelectChangeInscription} className="gender-group ">
                        {scheduleOptions.map(c=><option key={c.value} value={c.value}>{c.text}</option>)}
                    </select>
                </label>
            </div>

            <div className="input-box">
                <label> Metodo de Pago : 
                    <br/>
                    <select name='paymentMethod' onChange={handleSelectChangeInscription} className="gender-group">
                    {paymentOptions.map(c=><option key={c.value} value={c.value}>{c.text}</option>)}
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
