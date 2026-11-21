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
});
