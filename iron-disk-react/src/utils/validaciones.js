// Validaciones de los formularios, devuelven vacio si esta bien o el mensaje de error

export const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

// Texto requerido con largo maximo opcional
export function validarTexto(valor, etiqueta, max) {
  const texto = (valor || '').trim();

  if (texto === '') {
    return `Ingresa ${etiqueta}.`;
  }
  if (max && texto.length > max) {
    return `${etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1)} no puede superar los ${max} caracteres.`;
  }
  return '';
}

export function validarNombre(valor) {
  return validarTexto(valor, 'el nombre', 50);
}

export function validarApellidos(valor) {
  return validarTexto(valor, 'los apellidos', 100);
}

export function validarDireccion(valor) {
  return validarTexto(valor, 'la dirección', 300);
}

export function validarComentario(valor) {
  return validarTexto(valor, 'el comentario', 500);
}

// Correo requerido, maximo 100 caracteres y dominio permitido
export function validarCorreo(valor) {
  const correo = (valor || '').trim();

  if (correo === '') {
    return 'Ingresa tu correo electrónico.';
  }
  if (correo.length > 100) {
    return 'El correo no puede superar los 100 caracteres.';
  }

  const arroba = correo.lastIndexOf('@');
  const dominio = arroba >= 0 ? correo.slice(arroba + 1).toLowerCase() : '';

  if (arroba < 1 || !DOMINIOS_PERMITIDOS.includes(dominio)) {
    return 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
  }
  return '';
}

// Contrasena requerida, entre 4 y 10 caracteres
export function validarContrasena(valor) {
  if (!valor) {
    return 'Ingresa tu contraseña.';
  }
  if (valor.length < 4 || valor.length > 10) {
    return 'La contraseña debe tener entre 4 y 10 caracteres.';
  }
  return '';
}

// Digito verificador del RUN con el algoritmo del modulo 11
export function calcularDigitoVerificador(cuerpo) {
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const resto = 11 - (suma % 11);

  if (resto === 11) return '0';
  if (resto === 10) return 'K';
  return String(resto);
}

// RUN requerido, sin puntos ni guion, entre 7 y 9 caracteres y con digito verificador correcto
export function validarRun(valor) {
  const run = (valor || '').trim().toUpperCase();

  if (run === '') {
    return 'Ingresa el RUN.';
  }
  if (run.includes('.') || run.includes('-')) {
    return 'El RUN va sin puntos ni guion. Ej: 19011022K';
  }
  if (run.length < 7 || run.length > 9) {
    return 'El RUN debe tener entre 7 y 9 caracteres.';
  }

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  if (!/^\d+$/.test(cuerpo) || !/^[0-9K]$/.test(dv)) {
    return 'El RUN solo puede tener números y, al final, un dígito o K.';
  }
  if (calcularDigitoVerificador(cuerpo) !== dv) {
    return 'El dígito verificador no es válido para ese RUN.';
  }
  return '';
}

export function validarSeleccion(valor, etiqueta) {
  return valor ? '' : `Selecciona ${etiqueta}.`;
}

// Codigo de producto: requerido, minimo 3 caracteres
export function validarCodigo(valor) {
  const codigo = (valor || '').trim();

  if (codigo === '') return 'Ingresa el código del producto.';
  if (codigo.length < 3) return 'El código debe tener al menos 3 caracteres.';
  return '';
}

// Precio: requerido, minimo 0 (0 es un producto FREE), acepta decimales
export function validarPrecio(valor) {
  if (valor === '' || valor === null || valor === undefined) return 'Ingresa el precio.';

  const numero = Number(valor);

  if (isNaN(numero) || numero < 0) return 'El precio no puede ser menor a 0.';
  return '';
}

// Stock: requerido, entero y minimo 0
export function validarStock(valor) {
  if (valor === '' || valor === null || valor === undefined) return 'Ingresa el stock.';

  const numero = Number(valor);

  if (isNaN(numero) || numero < 0 || !Number.isInteger(numero)) {
    return 'El stock debe ser un número entero mayor o igual a 0.';
  }
  return '';
}

// Stock critico: opcional, entero y minimo 0
export function validarStockCritico(valor) {
  if (valor === '' || valor === null || valor === undefined) return '';

  const numero = Number(valor);

  if (isNaN(numero) || numero < 0 || !Number.isInteger(numero)) {
    return 'El stock crítico debe ser un número entero mayor o igual a 0.';
  }
  return '';
}
