import { render, fireEvent } from '@testing-library/react';
import Boton from './Boton';

describe('Boton', () => {
  it('ejecuta la funcion onClick al hacer clic', () => {
    const alHacerClic = jasmine.createSpy('alHacerClic');
    const { container } = render(<Boton etiqueta="Comprar" onClick={alHacerClic} />);

    fireEvent.click(container.querySelector('button'));

    expect(alHacerClic).toHaveBeenCalledTimes(1);
  });
});
