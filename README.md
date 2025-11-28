# ClientBase CRM 🚀

Sistema de gestión de clientes y proyectos desarrollado con Next.js y Prisma.

## 📋 Descripción
ClientBase es una aplicación web diseñada para freelancers y pequeñas empresas. Permite centralizar la información de contacto de los clientes y llevar un seguimiento detallado de los proyectos asignados a cada uno.

## 🛠️ Tecnologías Utilizadas
- **Frontend:** Next.js (React), Tailwind CSS.
- **Backend:** Next.js API Routes.
- **Base de Datos:** SQLite (vía Prisma ORM).
- **Control de Versiones:** Git & GitHub.

## ✨ Funcionalidades
1. **Gestión de Clientes (CRUD):**
   - Registro de nuevos clientes.
   - Listado y visualización de cartera.
   - Edición de datos de contacto.
   - Eliminación de registros.

2. **Gestión de Proyectos (Relacional):**
   - Creación de proyectos asignados a un cliente específico (Relación 1:N).
   - Panel visual de tarjetas de proyectos.
   - Eliminación en cascada (Si se borra un cliente, se borran sus proyectos).

## 🚀 Instalación y Uso Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/client-base-crm.git](https://github.com/TU_USUARIO/client-base-crm.git)
Instalar dependencias:

Bash

npm install
Configurar Base de Datos:

Bash

npx prisma migrate dev --name init
Correr el servidor:

Bash

npm run dev
Abrir en el navegador: Visita http://localhost:3000


3.  Guarda el archivo.
4.  Haz un último push rápido para subir este README:
    ```bash
    git add .
    git commit -m "Actualizar documentacion README"
    git push
    ```

---

### 💡 Consejos Finales para la Presentación

Si el profesor te pregunta, aquí tienes las "respuestas correctas":

1.  **"¿Qué base de datos usaron?"**
    * *Tú:* "Usamos **SQLite** gestionada a través de **Prisma ORM**. Elegimos Prisma porque nos permite manejar las relaciones entre Clientes y Proyectos de forma segura y tipada."

2.  **"¿Cómo se conectan el Cliente y el Proyecto?"**
    * *Tú:* "Es una relación de **Uno a Muchos (1:N)**. En el esquema de base de datos, el modelo `Cliente` tiene un array de proyectos, y el modelo `Proyecto` tiene una llave foránea `clienteId`."

3.  **"¿Dónde está el Backend?"**
    * *Tú:* "Usamos la arquitectura **Serverless** de Next.js. Todo el backend vive en la carpeta `/pages/api`, donde creamos endpoints REST para comunicar el frontend con la base de datos."

---


¿Hay algo más en lo que te pueda ayudar o ya cerramos sesión por hoy para que descanses?