Plataforma Restaurant Manager (SaaS) - WIP

·Descripción del proyecto:

Plataforma SaaS desarrollada para la gestión operativa de un negocio real del sector hostelero (panadería y pastelería con servicio a mesas).

El sistema está diseñado para digitalizar y optimizar los flujos de trabajo internos entre camareros, cocina y administración, permitiendo una gestión más eficiente de pedidos y reduciendo errores en el servicio.

Actualmente el proyecto se encuentra en fase de desarrollo activo, con el backend completamente funcional y la integración del sistema en tiempo real en progreso.

·Objetivo del sistema

Digitalizar la toma de pedidos en mesa
Mejorar la comunicación entre sala y cocina
Reducir errores en la gestión manual de pedidos
Permitir seguimiento del estado de los pedidos en tiempo real
Preparar una arquitectura escalable tipo SaaS para futuros clientes

·Funcionalidades principales

1. Sistema de roles (RBAC)

El sistema cuenta con control de acceso basado en roles:
Administrador: gestión completa del sistema
Camarero: creación y gestión de pedidos en mesa
Cocina: gestión del flujo de preparación de pedidos

2. Gestión de pedidos

El sistema implementa un flujo completo de estados para los pedidos:
pendiente → preparando → listo → entregado → pagado

3. Características:

Transiciones controladas por rol
Validación de reglas de negocio en backend
Prevención de cambios de estado inválidos
Preparado para sincronización en tiempo real

4. Autenticación y seguridad

Autenticación basada en JWT (Access Token + Refresh Token)
Middleware de protección de rutas
Contraseñas hasheadas con bcrypt
Preparado para autenticación en Socket.IO mediante JWT en handshake

5. Arquitectura del sistema

El proyecto sigue una arquitectura en capas:
Routes → definición de endpoints
Controllers → gestión de requests y responses
Services → lógica de negocio
Repositories → acceso a base de datos
Models → esquemas de datos

6. Características de arquitectura:

Separación clara de responsabilidades
Código escalable y mantenible
Preparado para modelo SaaS multi-cliente

7. Validación e integridad de datos

Validación de esquemas con Zod
MongoDB + Mongoose como base de datos
Soft delete en entidades críticas
Control estricto de roles y estados

· Stack tecnológico

Backend:

Node.js
Express.js

Base de datos:

MongoDB
Mongoose

Tiempo real (en desarrollo):

Socket.IO
Autenticación JWT en handshake

Seguridad:

JWT
bcrypt

·Frontend (en desarrollo):

Angular
Tailwind CSS

·Estado del proyecto

✔ Backend completado
✔ Autenticación completa
✔ Gestión de usuarios
✔ Gestión de productos
✔ Sistema de pedidos con lógica de estados
✔ Arquitectura base sólida

· En desarrollo

Sistema de tiempo real con Socket.IO
Sincronización entre cocina y sala

·Próximamente

Dashboard en Angular
Interfaz de gestión de pedidos en tiempo real
Optimización de experiencia de usuario en entorno real

· Contexto real del proyecto

Este sistema se está desarrollando para un negocio real del sector hostelero (panadería y pastelería con servicio a mesas), con el objetivo de modernizar su operativa diaria.

El sistema reemplaza procesos manuales por un flujo digital estructurado y preparado para escalar a múltiples negocios en el futuro.

· Arquitectura de visión

El sistema está diseñado como base de un producto SaaS:

Multi-rol
Escalable
Preparado para múltiples clientes
Enfocado en operaciones reales de negocio

· Autor

Desarrollado por: Ricardo Ferreira
Full Stack Developer

· Nota importante
El sistema está en desarrollo activo. La arquitectura actual está preparada para la integración del sistema en tiempo real como siguiente gran etapa del proyecto.