# CollabHub

## Descripción

**CollabHub** es una plataforma web orientada a estudiantes, recién egresados y principiantes que buscan colaborar en proyectos de desarrollo de software, encontrar compañeros de equipo y adquirir experiencia práctica.

El proyecto busca resolver un problema recurrente en el mundo tecnológico: **el círculo de "necesitas experiencia para conseguir experiencia"**. Muchos principiantes tienen conocimientos teóricos pero no oportunidades para aplicarlos en proyectos reales. CollabHub conecta a estas personas entre sí, permitiéndoles publicar sus ideas, descubrir proyectos que necesitan colaboradores y formar equipos donde todos aprenden creando juntos.

## Objetivos

- **Facilitar la colaboración** entre personas con intereses tecnológicos afines, sin importar su nivel de experiencia.
- **Democratizar el aprendizaje práctico** permitiendo que cualquier persona pueda proponer un proyecto o unirse a uno existente.
- **Construir un espacio de comunidad** donde estudiantes y recién egresados encuentren compañeros de equipo complementarios.
- **Convertir el conocimiento en experiencia** mediante proyectos reales que puedan formar parte de un portafolio profesional.
- **Reducir la barrera de entrada** al mundo del desarrollo de software profesional.

## Características principales

Las siguientes funcionalidades están implementadas en el frontend actual del proyecto:

### Navegación y estructura general
- **Barra de navegación fija** con efecto visual al hacer scroll y menú hamburguesa responsive para móviles.
- **Navegación por anclas** con scroll suave a las distintas secciones de la página.
- **Pie de página** con enlaces de navegación, comunidad y contacto.

### Sección Hero
- Presentación principal con llamada a la acción: "Explorar proyectos" y "Compartir una idea".
- Composición visual interactiva con imagen central y tarjetas flotantes que muestran información de proyectos y colaboradores.
- Diseño responsive que oculta elementos decorativos en pantallas pequeñas.

### Explorar proyectos
- **Búsqueda en tiempo real** por nombre o descripción del proyecto.
- **Sistema de filtros** por tecnología, categoría y nivel de dificultad.
- **Tarjetas de proyecto** que muestran nombre, descripción, tecnologías requeridas, perfiles buscados, barra de progreso de colaboradores y fecha de publicación.
- **Estado vacío** cuando no hay resultados que coincidan con los criterios de búsqueda.
- **Botón "Ver todos / Mostrar menos"** para expandir o contraer la lista de proyectos.

### Busco colaborar
- **Tarjetas de perfil** de colaboradores con foto, nombre, rol y biografía.
- Información sobre tecnologías que domina, tecnologías que quiere aprender y tipo de proyecto que busca.
- **Botón "Ver perfil"** que abre un modal con información detallada del colaborador.

### Cómo funciona
- Sección de 4 pasos que explican el flujo: compartir idea, descubrir personas, formar equipo y colaborar.

### Sección de IA (demostración visual)
- Presentación visual de un asistente con IA que transforma una idea en una propuesta estructurada.
- **Esta función es únicamente visual** y está marcada como "Próximamente". No hay integración real con IA.

### Beneficios
- Sección de 4 tarjetas con fotos que destacan las ventajas de unirse a la plataforma.

### Modales
- **Modal de publicación** con dos modos:
  - **"Proponer un proyecto"**: formulario con nombre, descripción, tecnologías, nivel, perfiles buscados y plazas disponibles.
  - **"Busco colaborar"**: formulario con nombre, perfil, tecnologías conocidas, tecnologías a aprender y tipo de proyecto buscado.
  - Validación de campos obligatorios con mensajes de error.
  - Estado de éxito tras enviar el formulario.
- **Modal de detalle de proyecto**: muestra información ampliada con tecnologías, perfiles, equipo actual y botón "Quiero unirme".
- **Modal de detalle de colaborador**: muestra biografía, habilidades, intereses y botón "Contactar".

### Sistema de iconos
- **Iconos SVG personalizados** estilo Lucide (40+ iconos) implementados sin dependencias externas.

### Diseño y estilos
- **Sistema de diseño completo** con variables CSS: paleta de colores, tipografías, radios, sombras y transiciones.
- **Tipografías**: Plus Jakarta Sans para títulos e Inter para cuerpo de texto.
- **Diseño responsive** con breakpoints para tablet y móvil.
- **Animaciones y micro-interacciones**: tarjetas flotantes, hover states, fadeIn, escala y transiciones suaves.

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | ^21.1.0 | Framework principal (standalone components, signals, control flow nativo) |
| TypeScript | ^5.9.3 | Lenguaje de programación |
| RxJS | ^7.8.1 | Librería de programación reactiva (dependencia de Angular) |
| Angular Forms | ^21.1.0 | Reactive Forms para validación del modal de publicación |
| Angular CLI | ^21.1.0 | Herramienta de build y desarrollo |
| HTML5 / CSS3 | - | Estructura y estilos (sin preprocesadores ni frameworks CSS) |
| Google Fonts | - | Tipografías Plus Jakarta Sans e Inter |
| Netlify | - | Plataforma de despliegue |

El proyecto **no utiliza** librerías de componentes externas (como Angular Material o Bootstrap). Todos los componentes y estilos son propios. Tampoco cuenta con base de datos ni backend: los datos son estáticos y están definidos en `src/data/models.ts`.

## Estructura del proyecto

```
collabhub/
├── angular.json                # Configuración de Angular CLI (build, serve, rutas)
├── netlify.toml                # Configuración de despliegue en Netlify
├── package.json                # Dependencias y scripts del proyecto
├── package-lock.json           # Versiones bloqueadas de dependencias
├── tsconfig.json               # Configuración general de TypeScript
├── tsconfig.app.json           # Configuración de TypeScript para la app
├── .gitignore                  # Archivos y carpetas ignorados por git
└── src/
    ├── main.ts                 # Punto de entrada: hace bootstrap de la aplicación
    ├── app.ts                  # Componente raíz que estructura todas las secciones
    ├── index.html              # HTML principal (carga de fuentes y estilos)
    ├── global_styles.css       # Sistema de diseño: variables CSS, reset, botones, utilidades
    ├── data/
    │   └── models.ts           # Tipos, interfaces y datos de demostración (proyectos, colaboradores, beneficios, pasos)
    ├── shared/
    │   ├── icon.component.ts   # Sistema de iconos SVG personalizados (40+ iconos)
    │   ├── modal.service.ts    # Servicio con signals para controlar apertura de modales
    │   └── validators.ts      # Validadores personalizados (nombre, email, password, numeros)
    └── components/
        ├── navbar.component.ts              # Barra de navegación fija con menú móvil
        ├── hero.component.ts                # Sección principal con CTA y composición visual
        ├── project-list.component.ts        # Listado de proyectos con búsqueda y filtros
        ├── project-card.component.ts        # Tarjeta individual de proyecto
        ├── collaboration-list.component.ts  # Listado de perfiles de colaboradores
        ├── how-it-works.component.ts        # Sección de 4 pasos del proceso
        ├── ai-assistant-section.component.ts# Sección de IA (demostración visual)
        ├── benefits.component.ts            # Sección de beneficios con tarjetas
        ├── footer.component.ts              # Pie de página
        ├── publish-modal.component.ts       # Modal de publicación (proyecto/colaborador)
        └── detail-modals.component.ts       # Modales de detalle de proyecto y colaborador
```

## Instalación

### Requisitos previos

- **Node.js** versión 18 o superior
- **npm** (incluido con Node.js)

### Pasos

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/collabhub.git
cd collabhub
```

2. Instala las dependencias:

```bash
npm install
```

## Ejecución local

Para iniciar el servidor de desarrollo:

```bash
npm start
```

Esto ejecuta `ng serve` e inicia la aplicación en `http://localhost:4200` por defecto. El servidor recarga automáticamente al guardar cambios en los archivos.

### Compilación para producción

Para generar el build de producción:

```bash
npm run build
```

Los archivos compilados se generan en `dist/demo/`. El proyecto está configurado para desplegarse en Netlify, que ejecuta `npx ng build` y publica el contenido de `dist/demo/browser`.

## Capturas de pantalla

> Esta sección está preparada para incluir capturas de pantalla del proyecto. Agrega las imágenes correspondientes aquí:

| Sección | Captura |
|---|---|
| Inicio (Hero) | _Pendiente_ |
| Explorar proyectos | _Pendiente_ |
| Filtros de proyectos | _Pendiente_ |
| Busco colaborar | _Pendiente_ |
| Cómo funciona | _Pendiente_ |
| Asistente IA | _Pendiente_ |
| Beneficios | _Pendiente_ |
| Modal de publicación | _Pendiente_ |
| Modal de detalle de proyecto | _Pendiente_ |
| Modal de detalle de colaborador | _Pendiente_ |
| Vista móvil | _Pendiente_ |

## Estado del proyecto

### Funcionalidades terminadas

- [x] Diseño visual completo de todas las secciones
- [x] Sistema de navegación con menú responsive
- [x] Listado de proyectos con búsqueda y filtros funcionales
- [x] Tarjetas de proyecto con barra de progreso de colaboradores
- [x] Listado de perfiles de colaboradores
- [x] Sección "Cómo funciona" con 4 pasos
- [x] Sección de beneficios
- [x] Modal de publicación con validación avanzada de formularios (dos modos, validadores personalizados)
- [x] Modales de detalle de proyecto y colaborador
- [x] Sistema de iconos SVG personalizados
- [x] Sistema de diseño con variables CSS
- [x] Diseño responsive completo (desktop, tablet, phablet y móvil) con múltiples breakpoints
- [x] Animaciones y micro-interacciones
- [x] Configuración de despliegue en Netlify

### Funcionalidades pendientes

- [ ] **Autenticación de usuarios**: los botones de "Iniciar sesión" existen pero no tienen funcionalidad. No hay formulario de registro ni de inicio de sesión implementado.
- [ ] **Backend y base de datos**: no hay servidor ni persistencia de datos. Todos los datos son estáticos.
- [ ] **Publicación real de proyectos**: el modal de publicación muestra un estado de éxito pero no guarda la información en ningún servidor.
- [ ] **Integración con IA**: la sección del asistente es una demostración visual, la funcionalidad no está implementada.
- [ ] **Contacto entre usuarios**: el botón "Contactar" en el detalle de colaborador no realiza ninguna acción real.
- [ ] **Unirse a un proyecto**: el botón "Quiero unirme" abre el modal de publicación pero no procesa una solicitud real.
- [ ] **Enlaces de redes sociales**: los enlaces sociales del pie de página no están conectados a perfiles reales.
- [ ] **Gestión de perfil de usuario**: no existe funcionalidad para crear o editar un perfil personal. No hay formulario de edición de perfil.
- [ ] **Sistema de notificaciones**: no implementado.

> **Nota sobre formularios**: el único formulario funcional en la aplicación es el modal de publicación (modo "Proponer un proyecto" y "Busco colaborar"). No existen formularios de registro, inicio de sesión ni edición de perfil.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar con el proyecto:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Descripción clara del cambio"
   ```
4. Envía tus cambios a tu fork:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request describiendo los cambios realizados.

### Convenciones sugeridas

- Mantén el estilo de código existente (standalone components, signals, estilos en cada componente).
- Usa nombres descriptivos para componentes, variables y funciones en español o inglés según el contexto del proyecto.
- Verifica que el proyecto compile sin errores antes de enviar un Pull Request:
  ```bash
  npm run build
  ```

## Licencia

**Pendiente de definir.** El proyecto no incluye un archivo de licencia en este momento. Si deseas utilizar o contribuir al código, contacta primero a los responsables del proyecto para acordar los términos de uso.
