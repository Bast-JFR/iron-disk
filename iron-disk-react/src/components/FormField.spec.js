import { render } from '@testing-library/react';
import FormField from './FormField';

describe('FormField', () => {
  it('muestra el mensaje de error cuando llega por props', () => {
    const { container } = render(<FormField id="x" etiqueta="Nombre" valor="" onCambio={() => {}} error="Ingresa el nombre." />);
    expect(container.querySelector('.invalid-feedback').textContent).toBe('Ingresa el nombre.');
  });
});
