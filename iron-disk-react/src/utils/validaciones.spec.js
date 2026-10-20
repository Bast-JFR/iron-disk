import { validarRun, validarCorreo, validarContrasena, validarPrecio, validarStock, validarStockCritico, calcularDigitoVerificador } from './validaciones';

describe('validaciones', () => {
  describe('RUN', () => {
    it('acepta un RUN con digito verificador correcto', () => {
      expect(validarRun('190110222')).toBe('');
    });

    it('rechaza un RUN con digito verificador incorrecto', () => {
      expect(validarRun('190110221')).toContain('dígito verificador');
    });

    it('rechaza un RUN con puntos o guion', () => {
      expect(validarRun('19.011.022-2')).toContain('sin puntos ni guion');
    });

    it('calcula el digito verificador del cuerpo', () => {
      expect(calcularDigitoVerificador('19011022')).toBe('2');
    });
  });

  describe('correo', () => {
    it('acepta los dominios permitidos', () => {
      expect(validarCorreo('ana@duoc.cl')).toBe('');
      expect(validarCorreo('ana@profesor.duoc.cl')).toBe('');
      expect(validarCorreo('ana@gmail.com')).toBe('');
    });

    it('rechaza dominios que no estan permitidos', () => {
      expect(validarCorreo('ana@hotmail.com')).toContain('Solo se aceptan');
    });

    it('rechaza un correo vacio', () => {
      expect(validarCorreo('')).toBe('Ingresa tu correo electrónico.');
    });
  });

  describe('contrasena', () => {
    it('exige entre 4 y 10 caracteres', () => {
      expect(validarContrasena('abc')).not.toBe('');
      expect(validarContrasena('abcd')).toBe('');
      expect(validarContrasena('12345678901')).not.toBe('');
    });
  });

  describe('producto', () => {
    it('acepta precio cero y rechaza negativo', () => {
      expect(validarPrecio('0')).toBe('');
      expect(validarPrecio('-5')).not.toBe('');
    });

    it('exige stock entero', () => {
      expect(validarStock('3')).toBe('');
      expect(validarStock('2.5')).not.toBe('');
    });

    it('el stock critico es opcional', () => {
      expect(validarStockCritico('')).toBe('');
      expect(validarStockCritico('-1')).not.toBe('');
    });
  });
});
