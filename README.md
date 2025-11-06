# Micro Frontends con Webpack 5 y Module Federation

Este proyecto es un ejemplo de arquitectura **Micro Frontend (MF)** utilizando **Webpack 5 Module Federation**. El contenedor principal (host) está desarrollado en **React**, mientras que los micro frontends remotos están construidos en **Angular** y **React** respectivamente.

## Estructura del Monorepo
mf-monorepo
│
├── /host-react         # Aplicación contenedora (React)
├── /remote-angular     # Micro frontend remoto (Angular)
└── /remote-react       # Micro frontend remoto (React)

## Tecnologías utilizadas

- 🧩 **Module Federation** (Webpack 5)
- ⚛️ **React 18** (host y uno de los remotes)
- 🅰️ **Angular 16+** (otro remote)
- 📦 **Webpack 5** (configuración personalizada)
- 🧪 **Jest**, **Testing Library**, **Karma** (según el stack de cada micro frontend)

## Cómo funciona

- El **host** carga dinámicamente los remotes en tiempo de ejecución usando `ModuleFederationPlugin`.
- Cada remote expone uno o más componentes que el host puede renderizar.
- La comunicación entre micro frontends se realiza mediante props, eventos o un bus compartido (opcional).

## Instalación

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/mf-monorepo.git
cd mf-monorepo

# Instala dependencias por proyecto
cd host-react && npm install
cd ../remote-angular && npm install
cd ../remote-react && npm install