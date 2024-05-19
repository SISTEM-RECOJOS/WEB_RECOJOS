export interface MRInscription {
    person: Person
    user: User
    inscription: Inscription
  }
  
  export interface Person {
    idPerson?: string
    name: string
    lastName: string
    secondLastName: string
    birthDay: Date
    cellPhone: string
    gender: string
    modificationDate: Date
    registrationDate: Date
    status: string
  }
  
  export interface User {
    idUser?: string
    occupation: string
    qr: string
  }
  
  export interface Inscription {
    idInscription?: string
    typePlace: string
    referenceLocation: string
    latitude: number
    longitude: number
    nameInscription: string
    amountBucket: number
    amountContainer: number
    paymentMethod: string
    frecuency: string
    registrationDate: Date
    modificationDate: Date
    status: string
    pickUpDay: string
    idPerson?: string
  }
  