import { puedeVer, puedeHacer, puedeEntrarAlPanel, seccionDeRuta } from './permisos';

describe('permisos por rol', () => {
  it('el vendedor solo ve productos y ordenes y no puede editar', () => {
    expect(puedeVer('VENDEDOR', 'productos')).toBe(true);
    expect(puedeVer('VENDEDOR', 'ordenes')).toBe(true);
    expect(puedeVer('VENDEDOR', 'usuarios')).toBe(false);
    expect(puedeVer('VENDEDOR', seccionDeRuta('/admin/productos/nuevo'))).toBe(false);
    expect(puedeHacer('VENDEDOR', 'cambiar-estado')).toBe(false);
    expect(puedeEntrarAlPanel('CLIENTE')).toBe(false);
    expect(puedeVer('ADMIN', 'reportes')).toBe(true);
  });
});
