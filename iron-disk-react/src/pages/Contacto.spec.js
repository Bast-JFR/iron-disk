import { render, fireEvent } from '@testing-library/react';
import Contacto from './Contacto';

function escribir(container, id, valor) {
  fireEvent.change(container.querySelector(`#${id}`), { target: { value: valor } });
}

describe('Contacto', () => {
  it('actualiza el contador al escribir el comentario', () => {
    const { container } = render(<Contacto />);

    escribir(container, 'comentario', 'Hola tienda');

    expect(container.textContent).toContain('11/500');
  });

  it('muestra error si el correo tiene un dominio no permitido', () => {
    const { container } = render(<Contacto />);

    escribir(container, 'correo', 'ana@hotmail.com');

    expect(container.querySelector('.invalid-feedback').textContent).toContain('Solo se aceptan');
  });

  it('no envia el formulario vacio y muestra los errores', () => {
    const { container } = render(<Contacto />);

    fireEvent.submit(container.querySelector('form'));

    expect(container.querySelectorAll('.invalid-feedback').length).toBe(3);
    expect(container.querySelector('.alert-success')).toBeNull();
  });

  it('muestra la confirmacion cuando los datos son validos', () => {
    const { container } = render(<Contacto />);

    escribir(container, 'nombre', 'Ana Perez');
    escribir(container, 'correo', 'ana@gmail.com');
    escribir(container, 'comentario', 'Quiero saber si tienen vinilos de Slayer');
    fireEvent.submit(container.querySelector('form'));

    expect(container.querySelector('.alert-success').textContent).toContain('Gracias por escribirnos');
  });
});
