# Sport GYM Center - Progressive Web App (PWA)

## Descripción del Proyecto

El proyecto **Sport GYM Center** busca transformar una página web existente, desarrollada en React.js, en una **Progressive Web App (PWA)**. Esta conversión permitirá a los usuarios realizar diversas acciones como visitas al sitio, compra de productos, renovación de membresías y agregar productos al carrito. Además, el proyecto implementará un sistema de retroalimentación (Feedback) para evaluar la satisfacción de los usuarios en relación a su experiencia y los productos ofrecidos.

## Objetivo

El objetivo de este proyecto es mejorar la accesibilidad, el rendimiento y la experiencia de usuario mediante la conversión de la página web a PWA. Además, se desarrollará un sistema de feedback para obtener datos clave que permitan mejorar continuamente la experiencia en la página y la oferta de productos.

### Alcance

1. **Conversión a PWA**:
   - Transformar la página web actual en una PWA, asegurando funcionalidad tanto online como offline.
   - Implementar un **Service Worker** para gestionar los recursos y mejorar los tiempos de carga.
   - Crear un archivo **manifiesto** para permitir la instalación de la PWA en dispositivos móviles.
   - Garantizar una experiencia totalmente **responsive**.

2. **Sistema de Feedback**:
   - Desarrollar un sistema de retroalimentación que permita a los usuarios calificar su experiencia en momentos clave.
   - Recopilar y analizar los resultados del feedback para realizar mejoras en la experiencia de usuario y los productos.

El proyecto se desarrollará bajo la **metodología ágil Scrum** para asegurar entregas rápidas y adaptables.

## Herramienta de Control de Versiones

Este proyecto utiliza **Git** como sistema de control de versiones, alojado en **GitHub**. El flujo de trabajo implementado es **GitFlow**, lo que permite una clara organización y gestión de las ramas y versiones.

### Flujo de Trabajo con GitFlow

- **Rama principal (main)**: Contiene la versión estable del proyecto, lista para producción.
- **Rama de desarrollo (develop)**: Contiene las nuevas funcionalidades y correcciones en curso.
- **Ramas de características (feature branches)**: Se crean a partir de la rama `develop` para añadir nuevas funcionalidades. Al completarse, se fusionan nuevamente a `develop` tras una revisión mediante Pull Request.
- **Ramas de hotfix y release**: Se utilizan para gestionar correcciones urgentes y la preparación de nuevas versiones para producción.

## Estrategia de Versionamiento y Gestión de Ramas

### Estrategia de Versionamiento

El proyecto sigue el modelo de **GitFlow** y utiliza el versionamiento **SemVer** (Versionado Semántico), lo que facilita la identificación de actualizaciones y parches en el software:

- Versiones principales (`MAJOR`): Cambios grandes que no son retrocompatibles.
- Versiones menores (`MINOR`): Nuevas funcionalidades que son retrocompatibles.
- Parches (`PATCH`): Correcciones de errores y mejoras menores.

### Estrategia de Gestión de Ramas

- **Rama Main**: Contiene el código estable y listo para producción.
- **Rama Develop**: Se utiliza para el desarrollo de nuevas características.
- **Ramas Feature**: Para nuevas funcionalidades, se crean desde `develop` y se fusionan tras ser revisadas.

## Estrategia de Despliegue y Proceso de CI/CD

### Estrategia de Despliegue

Para el despliegue del proyecto, se ha implementado una estrategia de **Blue-Green Deployment**. Esta técnica asegura mínimas interrupciones del servicio al realizar actualizaciones. Se mantienen dos entornos: uno activo (Green) y otro actualizado (Blue). Una vez verificado el despliegue en el entorno Blue, el tráfico se redirige a este entorno actualizado.

### Entornos de Despliegue

1. **Desarrollo**: Entorno para pruebas y desarrollo de nuevas funcionalidades.
2. **Staging**: Entorno de preproducción para pruebas completas antes del lanzamiento.
3. **Producción**: Entorno final donde la aplicación será accesible para los usuarios, utilizando **Blue-Green Deployment** para minimizar el impacto durante los despliegues.

### Proceso de CI/CD

Utilizamos **GitHub Actions** para implementar un proceso de **Integración Continua (CI)**. Cada push o pull request en las ramas principales activa automáticamente pruebas y validaciones, asegurando la calidad del código antes de su integración en producción.

## Instrucciones para Clonar, Instalar y Ejecutar el Proyecto

### Clonar el Repositorio

Para clonar el proyecto, ejecuta el siguiente comando en tu terminal:

```bash
git clone https://github.com/usuario/sport-gym-center.git
