# ayipeytecnology.com

Sitio web de **Administración Ayipey Tecnology SA de CV**.

Sitio estático (HTML + CSS + JS, sin dependencias ni compilación). Para publicarlo, sube el contenido de este repositorio a la raíz pública del hosting (`public_html`, `www`, etc.).

## Estructura

```
index.html          Página principal
css/styles.css      Estilos
js/projects.js      Lista de proyectos del portafolio  <- editar aquí
js/main.js          Menú, portafolio, animaciones y formulario
assets/logo.svg       Logo horizontal (fondo claro)
assets/logo-dark.svg  Logo horizontal (fondo oscuro)
assets/logo-mark.svg  Isotipo / favicon
```

## Agregar un proyecto

Edita `js/projects.js` y copia un objeto de la lista. Los campos están documentados al inicio del archivo.

## Formulario de contacto

El formulario abre el cliente de correo del visitante con el mensaje dirigido a `contacto@ayipeytecnology.com`. Para cambiar el correo, búscalo en `index.html` y `js/main.js`.
