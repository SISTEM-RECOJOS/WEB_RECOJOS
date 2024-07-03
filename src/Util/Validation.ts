import { MRInscription } from '../Model/MInscription'; // Ajusta la ruta según sea necesario

type ValidationError = {
  field: string;
  message: string;
};

export const validateMRInscription = (data: MRInscription): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validar campos de texto no vacíos y con longitud máxima
  const validateText = (field: string, value: string, maxLength: number) => {
    if (!value || value.trim() === '') {
      errors.push({ field, message: `${field} no puede estar vacío.` });
    } else if (value.length > maxLength) {
      errors.push({ field, message: `${field} no puede tener más de ${maxLength} caracteres.` });
    }
  };

  // Validar números positivos y máximo 10
  const validateNumber = (field: string, value: number) => {
    if (value <= 0) {
      errors.push({ field, message: `${field} debe ser mayor a cero.` });
    }
    if (value > 10) {
      errors.push({ field, message: `${field} no puede ser mayor a 10.` });
    }
  };

  // Validar latitude y longitude que no sean 0
  const validateLatLong = (field: string, value: number) => {
    if (value === 0) {
      errors.push({ field, message: `${field} no puede ser 0.` });
    }
  };

  // Validar que amountBucket o amountContainer sea mayor a 0 y máximo 10
  const validateAmounts = (amountBucket: number, amountContainer: number) => {
    if (amountBucket <= 0 && amountContainer <= 0) {
      errors.push({ field: 'amountBucket', message: 'Al menos uno de amountBucket o amountContainer debe ser mayor a cero.' });
      errors.push({ field: 'amountContainer', message: 'Al menos uno de amountBucket o amountContainer debe ser mayor a cero.' });
    }
    if (amountBucket > 10) {
      errors.push({ field: 'amountBucket', message: 'amountBucket no puede ser mayor a 10.' });
    }
    if (amountContainer > 10) {
      errors.push({ field: 'amountContainer', message: 'amountContainer no puede ser mayor a 10.' });
    }
  };

  // Validaciones para Person
  validateText('name', data.person.name, 50);
  validateText('lastName', data.person.lastName, 50);
  validateText('secondLastName', data.person.secondLastName, 50);
  validateText('cellPhone', data.person.cellPhone, 20);
  validateText('gender', data.person.gender, 10);
  validateText('status', data.person.status, 20);

  // Validaciones para User
//   validateText('occupation', data.user.occupation, 50);
//   validateText('qr', data.user.qr, 100);

  // Validaciones para Inscription
  validateText('typePlace', data.inscription.typePlace, 50);
  validateText('referenceLocation', data.inscription.referenceLocation, 100);
  validateText('nameInscription', data.inscription.nameInscription, 50);
  validateText('paymentMethod', data.inscription.paymentMethod, 20);
  validateText('frecuency', data.inscription.frecuency, 20);
  validateText('status', data.inscription.status, 20);
  validateText('pickUpDay', data.inscription.pickUpDay, 23);

  validateLatLong('latitude', data.inscription.latitude);
  validateLatLong('longitude', data.inscription.longitude);
  validateAmounts(data.inscription.amountBucket, data.inscription.amountContainer);

  return errors;
};
