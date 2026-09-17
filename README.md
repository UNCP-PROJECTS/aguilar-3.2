# Nestlong | MVP Alquiler Residencial de Largo Plazo

> Guía Práctica N° 05 (Semana 3) — Desarrollo de Aplicaciones Web (IS093A)
> Facultad de Ingeniería de Sistemas — Universidad Nacional del Centro del Perú (UNCP)
> Tema Elegido: Opción 6 — Inmobiliaria: Propiedades, búsqueda y contacto.

## Integrantes

| Integrante | Rol | GitHub | LinkedIn |
|---|---|---|---|
| José Pablo Osorio Mallqui | Fundador & Arquitecto de Software | [@StoneFind22](https://github.com/StoneFind22) | [LinkedIn](https://www.linkedin.com/in/jos%C3%A9-osorio-mallqui-719166397) |
| Arlette D'Alessandra Suárez Román | Cofundadora & Diseñadora UI/UX | [@alesan21](https://github.com/alesan21) | [LinkedIn](https://www.linkedin.com/in/arlette-suarez-roman-653805342) |

> Conócenos en [Sudolabs Perú](https://www.sudolabs.space/equipo)

## Sobre el Proyecto
Nestlong es un Producto Minimo Viable (MVP) para una plataforma de alquiler residencial enfocada en la larga estancia. Conecta a inquilinos y propietarios buscando promover un alquiler justo, transparente y con fianza protegida, todo bajo una interfaz moderna, limpia y centrada en la experiencia del usuario (UI/UX).

## Arquitectura
- `css/global.css`: Estilos personalizados adicionales.
- `js/data.js`: Mock data y estructura de datos globales.
- `js/app.js`: Logica de la aplicacion, renderizado y animaciones.
- `index.html`: Pagina de inicio con catalogo y filtros reactivos.
- `propiedad.html`: Detalles de la propiedad de alquiler.
- `contacto.html`: Formulario de postulacion e informacion de contacto.

**Stack Tecnologico:** HTML5 Semantico, Bootstrap 5.3.3 (Estructura y validacion), Tailwind CSS via Play CDN (Estilos y microinteracciones), Vanilla JS ES6+ (Logica sin librerias), Google Fonts (Plus Jakarta Sans) y Picsum Photos. Se utiliza un enfoque de framework hibrido combinando la robustez de los componentes de Bootstrap con la flexibilidad y el diseno moderno de utilidades de Tailwind CSS.

## Funcionalidades
- Carrusel/Slideshow automatico en el Hero.
- Filtros reactivos combinados con busqueda de texto y ordenamiento por precio.
- Paginas de detalle de propiedad renderizadas dinamicamente.
- Validacion de formulario robusta y accesible.
- Seccion de Testimonios y Preguntas Frecuentes (FAQ).
- Listado de Barrios Destacados y Propiedades Similares.
- Animaciones al hacer scroll (Intersection Observer) y contadores animados.
- Boton de volver arriba con desvanecimiento fluido.

## Accesibilidad (WCAG 2.2 AA)
El proyecto ha sido disenado siguiendo estandares de accesibilidad WCAG 2.2 AA. Se emplean paletas con altos ratios de contraste, marcado de HTML semantico, atributos WAI-ARIA correspondientes para elementos interactivos, etiquetas explicitas (`label`) para todos los controles de formulario e iconos en SVG nativo sin uso de emojis.

## Documentacion de Marca
Puedes encontrar los recursos visuales y guias de diseno en la carpeta `/brand` o consultar el [Brandbook Nestlong](#).

## Paleta de Colores

| Color | Hexadecimal | Uso | Contraste (Blanco) |
|---|---|---|---|
| Slate Dark | `#1E293B` | Texto principal, encabezados, fondos oscuros | Alto |
| Sky Primary | `#0369A1` | Acciones principales, botones, enlaces | Alto |
| Emerald Price | `#047857` | Precios, elementos de disponibilidad, exito | Alto |
| Slate Bg | `#F8FAFC` | Fondos de seccion, tarjetas secundarias | Bajo |
