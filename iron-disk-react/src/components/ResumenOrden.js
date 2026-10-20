import { formatearPrecio, formatearFecha } from '../utils/formato';

// Datos de una orden: cliente, direccion de envio y detalle de lo comprado
function ResumenOrden({ orden }) {
  return (
    <div className="card card-iron">
      <div className="card-body">
        <div className="d-flex flex-wrap justify-content-between mb-3">
          <h2 className="fs-5 mb-0">Orden {orden.id}</h2>
          <span className="text-secondary">{formatearFecha(orden.fecha)}</span>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <h3 className="fs-6 text-uppercase text-secondary">Cliente</h3>
            <p className="mb-0">
              {orden.cliente.nombre} {orden.cliente.apellidos}
            </p>
            <p className="mb-0">{orden.cliente.correo}</p>
          </div>
          <div className="col-md-6">
            <h3 className="fs-6 text-uppercase text-secondary">Dirección de envío</h3>
            <p className="mb-0">{orden.direccion.calle}</p>
            <p className="mb-0">
              {orden.direccion.comuna}, {orden.direccion.region}
            </p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th className="text-end">Precio</th>
                <th className="text-end">Cantidad</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orden.items.map((i) => (
                <tr key={i.codigo}>
                  <td>{i.nombre}</td>
                  <td className="text-end">{formatearPrecio(i.precio)}</td>
                  <td className="text-end">{i.cantidad}</td>
                  <td className="text-end">{formatearPrecio(i.precio * i.cantidad)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="3" className="text-end">
                  Total
                </th>
                <th className="text-end">{formatearPrecio(orden.total)}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResumenOrden;
