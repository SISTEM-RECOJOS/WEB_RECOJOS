import React, { useState } from 'react';
import '../../../public/css/alert.css';

export const Alert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleAlert = () => {
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="alert">
      <button onClick={handleAlert}>Mostrar alerta</button>
      {showAlert && (
        <div className="alert-container">
          <label>Hace Inscripcion</label>
          <button>SI</button>
          <button>NO</button>
        </div>
      )}
    </div>
  );
};


