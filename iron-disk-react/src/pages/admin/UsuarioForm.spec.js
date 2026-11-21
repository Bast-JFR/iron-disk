import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UsuarioForm from './UsuarioForm';
import { usuarioService } from '../../services/usuarioService';

function esperar(condicion) {
  return waitFor(() => {
    if (!condicion()) {
      throw new Error('La condición todavía no se cumple');
    }
  });
}

async function dibujar() {
  const resultado = render(
    <MemoryRouter>
      <UsuarioForm />
    </MemoryRouter>
  );
  await esperar(() => resultado.container.querySelector('form'));
  return resultado;
}

function escribir(container, id, valor) {
  fireEvent.change(container.querySelector(`#${id}`), { target: { value: valor } });
}

describe('UsuarioForm', () => {
  it('con un run invalido muestra el error y no guarda', async () => {
    spyOn(usuarioService, 'crear');
    const { container } = await dibujar();

    escribir(container, 'run', '11111111');
    fireEvent.submit(container.querySelector('form'));

    expect(container.textContent).toContain('dígito verificador');
    expect(usuarioService.crear).not.toHaveBeenCalled();
  });

  it('muestra el error del backend cuando el correo ya existe', async () => {
    spyOn(usuarioService, 'crear').and.callFake(() => Promise.reject({ response: { status: 409, data: { mensaje: 'Ya existe un usuario con ese correo' } } }));
    const { container } = await dibujar();

    escribir(container, 'run', '190110222');
    escribir(container, 'nombre', 'Bastian');
    escribir(container, 'apellidos', 'Jofre');
    escribir(container, 'correo', 'ba.jofre@duoc.cl');
    escribir(container, 'contrasena', 'admin123');
    escribir(container, 'tipoUsuario', 'Administrador');
    escribir(container, 'region', 'Valparaíso');
    escribir(container, 'comuna', 'Viña del Mar');
    escribir(container, 'direccion', 'Calle Valparaiso 567');
    fireEvent.submit(container.querySelector('form'));

    await esperar(() => container.textContent.includes('Ya existe un usuario con ese correo'));
    expect(usuarioService.crear).toHaveBeenCalled();
  });
});
