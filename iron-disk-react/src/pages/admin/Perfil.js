import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { buscarUsuarioPorRun } from '../../data/usuarios';

// Datos de la cuenta del administrador que inicio sesion
function Perfil() {
  const { usuario: sesion } = useAuth();
  const usuario = buscarUsuarioPorRun(sesion.run);

  if (!usuario) {
    return (
      <>
        <h1 className="titulo-seccion">Perfil</h1>
        <p className="text-secondary">No se encontraron los datos de esta cuenta.</p>
      </>
    );
  }

  const datos = [
    { etiqueta: 'RUN', valor: usuario.run },
    { etiqueta: 'Nombre', valor: `${usuario.nombre} ${usuario.apellidos}` },
    { etiqueta: 'Correo', valor: usuario.correo },
    { etiqueta: 'Tipo de usuario', valor: usuario.tipoUsuario },
    { etiqueta: 'Región y comuna', valor: `${usuario.comuna}, ${usuario.region}` },
    { etiqueta: 'Dirección', valor: usuario.direccion },
  ];

  return (
    <>
      <h1 className="titulo-seccion mb-4">Perfil</h1>
      <div className="card card-iron col-lg-8">
        <div className="card-body">
          <dl className="row mb-0">
            {datos.map((d) => (
              <div className="col-sm-6 mb-3" key={d.etiqueta}>
                <dt className="text-secondary text-uppercase small">{d.etiqueta}</dt>
                <dd className="mb-0">{d.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Link to={`/admin/usuarios/editar/${usuario.run}`} className="btn btn-primary mt-3">
        Editar mis datos
      </Link>
    </>
  );
}

export default Perfil;
