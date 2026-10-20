// Presentacion de la tienda con el video embebido
function Nosotros() {
  return (
    <div className="container py-5">
      <section className="mb-5">
        <h1 className="titulo-seccion mb-3">Sobre Iron Disk</h1>
        <p className="text-secondary fs-5">
          Iron Disk es una tienda online pensada para quienes prefieren tener la música en sus manos: vinilos, CDs y cassettes, para escuchar más allá del streaming. Una forma distinta de coleccionar, con el formato físico como protagonista.
        </p>
      </section>

      <section className="mb-5">
        <div className="ratio ratio-16x9">
          <video controls preload="metadata">
            <source src="video/video-nosotros.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="titulo-seccion fs-4">Qué vas a encontrar</h2>
        <p>
          Nuestro catálogo reúne bandas y artistas de distintos estilos, desde el metal más clásico hasta ritmos completamente distintos como la cumbia. Seguimos sumando artistas, géneros y ediciones, con la idea de que cada visita traiga algo nuevo para descubrir.
        </p>
      </section>

      <section>
        <h2 className="titulo-seccion fs-4">Quiénes están detrás</h2>
        <p>
          Iron Disk es un proyecto desarrollado por <strong>RB Solutions</strong>, dedicados a construir experiencias digitales para coleccionistas y amantes de la música.
        </p>
      </section>
    </div>
  );
}

export default Nosotros;
