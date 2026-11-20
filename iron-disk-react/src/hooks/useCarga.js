import { useCallback, useEffect, useState } from 'react';
import { mensajeDeError } from '../services/api';

// Carga datos del backend y entrega tres estados: cargando, datos y error
// recargar() vuelve a pedir los datos
function useCarga(cargar, dependencias = []) {
  const [estado, setEstado] = useState({ datos: null, cargando: true, error: '' });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let activo = true;
    setEstado((anterior) => ({ ...anterior, cargando: true, error: '' }));
    Promise.resolve()
      .then(cargar)
      .then((datos) => activo && setEstado({ datos, cargando: false, error: '' }))
      .catch((error) => activo && setEstado({ datos: null, cargando: false, error: mensajeDeError(error) }));
    return () => {
      // Evita actualizar una pantalla que el usuario ya cerro
      activo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencias, version]);

  const recargar = useCallback(() => setVersion((v) => v + 1), []);

  return { ...estado, recargar };
}

export default useCarga;
