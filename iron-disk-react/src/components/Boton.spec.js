import { render, fireEvent } from '@testing-library/react';
import Boton from './Boton';

describe('Boton', () => {
  it('muestra la etiqueta recibida por props', () => {
    const { container } = render(<Boton etiqueta="Añadir al carrito" />);
    expect(container.textContent).toBe('Añadir al carrito');
  });

  it('ejecuta la funcion onClick al hacer clic', () => {
    const alHacerClic = jasmine.createSpy('alHacerClic');
    const { container } = render(<Boton etiqueta="Comprar" onClick={alHacerClic} />);

    fireEvent.click(container.querySelector('button'));

    expect(alHacerClic).toHaveBeenCalledTimes(1);
  });

  it('no ejecuta onClick cuando esta deshabilitado', () => {
    const alHacerClic = jasmine.createSpy('alHacerClic');
    const { container } = render(<Boton etiqueta="Comprar" onClick={alHacerClic} deshabilitado />);

    fireEvent.click(container.querySelector('button'));

    expect(alHacerClic).not.toHaveBeenCalled();
  });
});
