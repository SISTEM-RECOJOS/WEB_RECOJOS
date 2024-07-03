// --- RESPONSIBLE : ALBERT
// --- MODIFY : ROSA
'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react';
import {InscriptionMod} from "../../Model/InscriptionMod"
import {MApiResponse} from "../../Model/ApiResponseMod"
import GoogleMaps from './CGoogleMpas';
import { Inscription_Con_I } from '@/Controller/InscriptionCon';
import { Handlee } from 'next/font/google';
import {useRouter} from "next/navigation"
import { Inscription, MRInscription, Person,User } from '@/Model/MInscription';
import { validateMRInscription } from '@/Util/Validation';
import "../css/Alert.css"
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

      const scheduleOptionsContainers: InputText[] = [
        { value: "JU,02:00:pm,05:00:pm,CO", text: "Jueves, 02:00 pm. a 05:00 pm." }
      ];
      const scheduleOptionsBuckets: InputText[] = [
        { value: "LU,03:00:pm,05:00:pm,BA", text: "Lunes, 03:00 pm. a 05:00 pm." },
        { value: "JU,10:00:am,12:00:am,BA", text: "Jueves, 10:00 am. a 12:00 am." },
      ];

      const paymentOptions: InputText[] = [
        { value: "EF,DI", text: "Efectivo pagado en cada Recojo" },
        { value: "EF,ME", text: "Efectivo pagado Mensualmente" },
        { value: "QR,DI", text: "Qr pagado en cada Recojo" },
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
    const router = useRouter();
    const [isBC,setIsBC]= useState<boolean>(true);
    const [person,setPerson] = useState<Person>({
        name: "",
        lastName: "",
        secondLastName: "",
        birthDay: new Date(),
        cellPhone: "",
        gender: "MA",
        modificationDate: new Date(),
        registrationDate: new Date(),
        status: "AC"
      });

      
    const [user,setUser] = useState<User>({
    occupation: "",
    qr: ""
    });

    const [inscription,setInscription]= useState<Inscription>({
        typePlace: "CASA",
        referenceLocation: "",
        latitude: 0,
        longitude: 0,
        nameInscription: "",
        amountBucket: 0,
        amountContainer: 0,
        paymentMethod: "EF,DI",
        frecuency: "SE",
        registrationDate: new Date(),
        modificationDate: new Date(),
        status: "AC",
        pickUpDay: "LU,03:00:pm,05:00:pm,BA",
        idPerson: ""
      });

    
    const today = new Date().toISOString().slice(0, 10); 
    const [apiResponse, setApiResponse] = useState<MApiResponse | null>(null);
    const [showAlert, setShowAlert] = useState(0);
    const [formErrors, setFormErrors] = useState<string[]>([]);
  
    const closeAlert = () => {
        if(showAlert==1){
            router.refresh();
           
        }
        setShowAlert(0);
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
            const errors = validateMRInscription(inscription_);
            if (errors.length > 0) {
                setFormErrors(errors.map(err => `${err.field}: ${err.message}`));
            } else {
                const response = await Inscription_Con_I(inscription_)
                if(response ===1 ){
                    setShowAlert(1);
                }else if(response === 2){
                    setShowAlert(2)
                }
               
                setFormErrors([]);
            }
        } catch (error) {
            console.error('Error al enviar el formulario:');
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
        if(value === "BA"){
            setIsBC(true)
        }else if(value === "CO"){
            setIsBC(false)
        }
        };
    const onMapClick = (lat:number,lng:number)=>{
        setInscription((prevPerson) => ({ ...prevPerson, latitude:lat , longitude:lng }));
    }
   

    // -- COMPONENT
  return (
    <div className="container">
    <div className="form-image">
        <GoogleMaps onMapClick={onMapClick}/>
    </div>
    <div className="form">
        <form onSubmit={handleSubmit}>
            <div className="form-header">
                <div className="title">
                    <h1>INSCRIPCION HK</h1>
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
                {
                    isBC === true ? (
                    <div className="input-box">
                    <label >Cantidad de Baldes :</label>
                    <input id="baldes" type="number" value={inscription.amountBucket} onChange={handleChangeInscription} name="amountBucket" placeholder="0" required/>
                    </div>
                    ): <></>
                }

{
                    isBC === false ? (
                        <div className="input-box">
                    <label>Cantidad de Contenedores :</label>
                    <input id="contenedore" type="number" value={inscription.amountContainer} onChange={handleChangeInscription} name="amountContainer" placeholder="0" required/>
                    </div>
                    ): <></>
                }
         

                <div className="input-box">
                    <label>Frecuencia de Recojo : 
                        <br/>
                        <select name='frecuency' onChange={handleSelectChangeInscription} className="gender-group">
                            {frequencyOptions.map(c=><option key={c.value} value={c.value}>{c.text}</option>)}
                        </select>
                    </label>
                </div>

            {
                isBC == true ? (
                    <div className="input-box">
                        <label>Dia de Recojo : 
                            <br/>
                            <select name='pickUpDay' onChange={handleSelectChangeInscription} className="gender-group ">
                                {scheduleOptionsBuckets.map(c=><option key={c.value} value={c.value}>{c.text}</option>)}
                            </select>
                        </label>
                    </div>
                ):(
                    <div className="input-box">
                        <label>Dia de Recojo : 
                            <br/>
                            <select name='pickUpDay' onChange={handleSelectChangeInscription} className="gender-group ">
                                {scheduleOptionsContainers.map(c=><option key={c.value} value={c.value}>{c.text}</option>)}
                            </select>
                        </label>
                    </div>
                )
            }

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
        {formErrors.length > 0 && (
        <div>
          <h3>Errores del formulario:</h3>
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
        {showAlert === 1 ? (
        <div className="alert-container" >
            <span className="close-btn" onClick={closeAlert}>&times;</span>
          <label>INCRIPCION CREADA CORRECTAMENTE</label>
        </div>
      ):<></>}

        {showAlert === 2 ? (
        <div className="alert-container" >
            <span className="close-btn" onClick={closeAlert}>&times;</span>
          <label>Cuenta Existente Con ese Numero</label>
        </div>
      ):<></>}
    </div>
</div>
)
}
