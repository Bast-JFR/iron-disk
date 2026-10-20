import { render, fireEvent } from '@testing-library/react';
import FormField from './FormField';

describe('FormField', () => {
  it('muestra la etiqueta y no muestra error si no hay', () => {
    const { container } = render(<FormField id="x" etiqueta="Nombre" valor="" onCambio={() => {}} error="" />);
    expect(container.querySelector('label').textContent).toBe('Nombre');
    expect(container.querySelector('.invalid-feedback')).toBeNull();
  });

  it('muestra el mensaje de error cuando llega por props', () => {
    const { container } = render(<FormField id="x" etiqueta="Nombre" valor="" onCambio={() => {}} error="Ingresa el nombre." />);
    expect(container.querySelector('.invalid-feedback').textContent).toBe('Ingresa el nombre.');
  });

  it('avisa el valor nuevo al escribir', () => {
    const alCambiar = jasmine.createSpy('alCambiar');
    const { container } = render(<FormField id="x" etiqueta="Nombre" valor="" onCambio={alCambiar} />);

    fireEvent.change(container.querySelector('input'), { target: { value: 'Ana' } });

    expect(alCambiar).toHaveBeenCalledWith('Ana');
  });
});
