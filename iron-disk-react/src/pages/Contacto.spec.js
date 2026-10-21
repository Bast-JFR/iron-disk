import { render, fireEvent } from '@testing-library/react';
import Contacto from './Contacto';

describe('Contacto', () => {
  it('actualiza el contador al escribir el comentario', () => {
    const { container } = render(<Contacto />);

    fireEvent.change(container.querySelector('#comentario'), { target: { value: 'Hola tienda' } });

    expect(container.textContent).toContain('11/500');
  });
});
