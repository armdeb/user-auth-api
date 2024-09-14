# User Management System

Este proyecto es un sistema de gestión de usuarios que incluye autenticación segura y gestión de perfiles. Utiliza NestJS para el backend, MongoDB como base de datos, y JWT para la autenticación.

## Estructura del Proyecto

- **`src/`**: Contiene el código fuente de la aplicación.
  - **`auth/`**: Módulo de autenticación, incluyendo controladores, servicios y guardias.
  - **`users/`**: Módulo de usuarios, incluyendo controladores, servicios y esquemas.
  - **`config/`**: Configuración global de la aplicación.
  - **`common/`**: Utilidades y filtros de excepciones.
  - **`swagger/`**: Configuración de Swagger para la documentación de la API.
  - **`utils/`**: Utilidades generales, como la gestión de contraseñas.
  - **`main.ts`**: Archivo de entrada para iniciar la aplicación.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (v14.x o superior)
- [MongoDB](https://www.mongodb.com/) (para desarrollo local) o una conexión a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/user-management-system.git
   cd user-management-system

 2. **Clona el repositorio:**  
  npm install

 3. **Configura la base de datos**  

Crea un archivo .env en la raíz del proyecto y agrega tu cadena de conexión a MongoDB:
Ya está con mi usuario
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@clusterdebook.qxwuc.mongodb.net/?retryWrites=true&w=majority


  **Ejecución**  

Para iniciar la aplicación en modo desarrollo, ejecuta:

npm run start:dev
Esto iniciará el servidor en http://localhost:3000.

 **Pruebas**  

Para ejecutar las pruebas, utiliza:


npm run test

Esto ejecutará todos los tests definidos en la carpeta src/test.


 **Documentación de la API**  
La documentación de la API está disponible en Swagger. Una vez que la aplicación esté en funcionamiento, visita http://localhost:3000/api para explorar y probar los endpoints de la API.

Comentarios Adicionales
Autenticación: Se utiliza JWT para la autenticación de usuarios y bcrypt para el hash de contraseñas.
Seguridad: La aplicación incluye medidas básicas de seguridad como limitación de tasa y validación de entrada.
Documentación: La API está documentada utilizando Swagger para facilitar la prueba y comprensión de los endpoints.
