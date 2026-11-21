import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminUsuarios from './AdminUsuarios';
import { usuarioService } from '../../services/usuarioService';

const USUARIOS = [
  { id: 1, run: '190110222', nombre: 'Bastián', apellidos: 'Jofré', correo: 'ba.jofre@duoc.cl', tipoUsuario: 'Administrador', region: 'Metropolitana de Santiago' },
  { id: 2, run: '181245875', nombre: 'Renato', apellidos: 'Colipe Lienan', correo: 're.colipe@duoc.cl', tipoUsuario: 'Administrador', region: 'Metropolitana de Santiago' },
  { id: 3, run: '204567891', nombre: 'Diego', apellidos: 'Pérez Mora', correo: 'diego.perez@duoc.cl', tipoUsuario: 'Vendedor', region: 'Biobío' },
  { id: 4, run: '123456785', nombre: 'Camila', apellidos: 'Soto Rojas', correo: 'camila.soto@gmail.com', tipoUsuario: 'Cliente', region: 'Valparaíso' },
];

function esperar(condicion) {
  return waitFor(() => {
    if (!condicion()) {
      throw new Error('La condición todavía no se cumple');
    }
  });
}

function dibujar() {
  return render(
    <MemoryRouter>
      <AdminUsuarios />
    </MemoryRouter>
  );
}

function boton(container, texto) {
  return Array.from(container.querySelectorAll('button')).find((b) => b.textContent === texto);
}

describe('AdminUsuarios', () => {
  it('lista todos los usuarios en la tabla', async () => {
    spyOn(usuarioService, 'listar').and.returnValue(Promise.resolve(USUARIOS));
    const { container } = dibujar();

    await esperar(() => container.querySelectorAll('tbody tr').length === 4);

    expect(container.querySelectorAll('tbody tr').length).toBe(4);
  });

  it('elimina el usuario cuando se confirma', async () => {
    spyOn(usuarioService, 'listar').and.returnValue(Promise.resolve(USUARIOS));
    spyOn(usuarioService, 'eliminar').and.returnValue(Promise.resolve());
    spyOn(window, 'confirm').and.returnValue(true);
    const { container } = dibujar();
    await esperar(() => container.querySelectorAll('tbody tr').length === 4);

    fireEvent.click(boton(container, 'Eliminar'));

    await esperar(() => usuarioService.eliminar.calls.count() === 1);
    expect(usuarioService.eliminar).toHaveBeenCalledWith(1);
  });
});
