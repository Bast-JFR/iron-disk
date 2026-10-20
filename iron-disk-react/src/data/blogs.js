// Entradas del blog, el contenido va en bloques para poder mostrarlo sin html
export const BLOGS = [
  {
    id: '1',
    categoria: 'Cultura',
    titulo: 'El regreso del vinilo',
    imagen: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=1200&q=80',
    alt: 'Vinilo girando en un tocadiscos',
    resumen:
      'El streaming lo puede tener todo al instante, pero cada vez más personas vuelven a elegir el vinilo. Te contamos por qué este formato, que muchos daban por muerto, hoy vende más que nunca.',
    contenido: [
      {
        tipo: 'p',
        texto:
          'Durante años el vinilo fue considerado un formato del pasado, algo que solo sobrevivía en las estanterías de coleccionistas nostálgicos. Sin embargo, en la última década las ventas de discos de vinilo no han dejado de crecer, incluso superando en algunos mercados a las ventas de CD.',
      },
      { tipo: 'h2', texto: 'Por qué el streaming no reemplaza al vinilo' },
      {
        tipo: 'p',
        texto:
          'El streaming ganó por comodidad: cualquier canción, en cualquier momento, sin ocupar espacio. Pero esa misma facilidad hizo que la música se volviera algo de fondo. El vinilo obliga a lo contrario: eliges un disco, lo sacas de su funda, lo pones con cuidado y te sientas a escucharlo de principio a fin, tal como el artista lo pensó.',
      },
      { tipo: 'h2', texto: 'El sonido y el objeto' },
      {
        tipo: 'p',
        texto:
          'Muchos coleccionistas hablan de un sonido más cálido en el vinilo. Pero más allá de la discusión técnica, hay algo innegable: el vinilo es un objeto. Tiene una portada grande para admirar, un peso real en las manos y ese ritual de bajar la aguja que ningún clic en una pantalla puede replicar.',
      },
      { tipo: 'h2', texto: 'Una nueva generación de coleccionistas' },
      {
        tipo: 'p',
        texto:
          'Este regreso no lo lideran solo quienes vivieron la época dorada del vinilo. Cada vez más jóvenes, que crecieron con el streaming, empiezan a armar su propia colección. Buscan ediciones especiales, colores limitados y discos de bandas que descubrieron gracias al streaming.',
      },
    ],
  },
  {
    id: '2',
    categoria: 'Guía',
    titulo: 'Cuida y mantén tu vinilo y tocadiscos',
    imagen: 'https://images.unsplash.com/photo-1621886292650-520f76c747d6?w=1200&q=80',
    alt: 'Persona limpiando un disco de vinilo',
    resumen:
      'Un vinilo bien cuidado puede sonar perfecto durante décadas, pero un mal hábito puede arruinarlo en segundos. Reunimos los cuidados básicos para limpiar y guardar tus discos.',
    contenido: [
      {
        tipo: 'p',
        texto:
          'Un vinilo bien cuidado puede durar generaciones sin perder calidad de sonido. El problema es que muchos de los errores que dañan un disco parecen inofensivos: guardarlo mal, limpiarlo con lo que sea o dejar la aguja sucia.',
      },
      { tipo: 'h2', texto: 'Cómo limpiar tus discos' },
      {
        tipo: 'ul',
        items: [
          'Usa siempre un cepillo antiestático de fibra de carbono, pasándolo en el sentido de los surcos.',
          'Si el disco está muy sucio, usa líquidos limpiadores específicos para vinilo. Nunca agua con jabón ni alcohol.',
          'Limpia el disco antes de guardarlo, no solo antes de escucharlo.',
        ],
      },
      { tipo: 'h2', texto: 'Cómo guardarlos correctamente' },
      {
        tipo: 'ul',
        items: [
          'Guárdalos siempre en posición vertical, nunca apilados ni acostados.',
          'Usa fundas internas antiestáticas además de la funda original.',
          'Evita la humedad, el calor directo y la luz solar constante.',
        ],
      },
      { tipo: 'h2', texto: 'Mantenimiento del tocadiscos' },
      {
        tipo: 'ul',
        items: [
          'Limpia la aguja con un cepillo suave especial, moviendo de atrás hacia adelante.',
          'Revisa que el peso del brazo esté bien calibrado.',
          'Mantén la tapa cerrada cuando no lo uses.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Tocar la superficie del vinilo con los dedos, dejar discos fuera de su funda o forzar la aguja al ponerla son los errores más comunes. Con estos cuidados simples, tus discos te van a acompañar por muchos años.',
      },
    ],
  },
];

export function obtenerBlogs() {
  return BLOGS;
}

export function buscarBlog(id) {
  return BLOGS.find((b) => b.id === id);
}
