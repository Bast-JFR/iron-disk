import { validarRun } from './validaciones';

describe('validaciones', () => {
  it('rechaza un RUN con digito verificador incorrecto', () => {
    expect(validarRun('190110221')).toContain('dígito verificador');
  });
});
