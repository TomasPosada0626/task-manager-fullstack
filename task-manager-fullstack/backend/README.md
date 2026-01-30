# Backend

Estructura principal del backend para la aplicación de gestión de tareas.

- src/config: Configuración y variables de entorno
- src/controllers: Lógica de controladores para usuarios y tareas
- src/middlewares: Middlewares de autenticación, validación y manejo de errores
- src/models: Modelos de Mongoose para usuarios y tareas
- src/routes: Definición de rutas de la API
- src/services: Lógica de negocio y acceso a datos
- src/utils: Utilidades y helpers

# Endpoints principales

## Auth

### POST /api/auth/register
- Registro de usuario
- Body: `{ "email": string, "password": string, "role?": "user" | "admin" }`
- Respuesta: usuario creado (sin contraseña)

### POST /api/auth/login
- Login de usuario
- Body: `{ "email": string, "password": string }`
- Respuesta: `{ token, user }`

---

## Tareas (protegido, requiere JWT)

### POST /api/tasks
- Crear tarea
- Body: `{ "title": string, "description?": string, "status?": "pending"|"in-progress"|"completed", "priority?": "low"|"medium"|"high", "dueDate?": string }`
- Respuesta: tarea creada

### GET /api/tasks
- Listar tareas del usuario autenticado
- Query opcional: `status`, `priority`
- Respuesta: array de tareas

### GET /api/tasks/:id
- Obtener tarea por ID (solo si pertenece al usuario)
- Respuesta: tarea

### PUT /api/tasks/:id
- Editar tarea (solo si pertenece al usuario)
- Body: campos editables
- Respuesta: tarea actualizada

### DELETE /api/tasks/:id
- Eliminar tarea (solo si pertenece al usuario)
- Respuesta: 204 sin contenido

---

Todos los endpoints de tareas requieren autenticación por JWT en el header `Authorization: Bearer <token>`.
