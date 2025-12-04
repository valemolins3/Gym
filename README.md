# Proyecto Valen

Proyecto Express con TypeScript usando arquitectura MVC con servicios y repositorios.

## Estructura del Proyecto

```
proyecto-valen/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuración de conexión a SQL Server
│   ├── models/
│   │   └── Ejemplo.model.ts     # Interfaces y tipos de datos
│   ├── repositories/
│   │   └── Ejemplo.repository.ts # Acceso a datos (queries SQL)
│   ├── services/
│   │   └── Ejemplo.service.ts    # Lógica de negocio
│   ├── controllers/
│   │   └── Ejemplo.controller.ts # Manejo de requests/responses HTTP
│   ├── views/
│   │   └── ejemplo.view.ts       # Formateo de respuestas
│   ├── routes/
│   │   └── ejemplo.routes.ts     # Definición de rutas
│   └── index.ts                  # Punto de entrada de la aplicación
├── .env                          # Variables de entorno (no incluido en git)
├── .env.example                  # Ejemplo de variables de entorno
├── package.json
├── tsconfig.json
└── README.md
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```env
PORT=3000
DB_SERVER=localhost
DB_PORT=1433
DB_DATABASE=tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_OPTIONS_ENCRYPT=true
DB_OPTIONS_TRUST_SERVER_CERTIFICATE=true
```

## Uso

### Desarrollo
```bash
npm run dev
```

### Compilar
```bash
npm run build
```

### Producción
```bash
npm start
```

## Arquitectura

El proyecto sigue una arquitectura en capas:

1. **Models**: Define las interfaces y tipos de datos
2. **Repositories**: Maneja el acceso a la base de datos (queries SQL)
3. **Services**: Contiene la lógica de negocio y validaciones
4. **Controllers**: Maneja las peticiones HTTP y respuestas
5. **Views**: Formatea las respuestas antes de enviarlas al cliente
6. **Routes**: Define las rutas de la API

## Ejemplo de Uso

El proyecto incluye un ejemplo completo con la entidad "Ejemplo" que puedes usar como referencia para crear nuevas entidades.

Para usar el ejemplo, descomenta las líneas en `src/index.ts`:
```typescript
import ejemploRoutes from './routes/ejemplo.routes';
app.use('/api/ejemplo', ejemploRoutes);
```

## Rutas de Ejemplo

- `GET /api/ejemplo` - Obtener todos los ejemplos
- `GET /api/ejemplo/:id` - Obtener un ejemplo por ID
- `POST /api/ejemplo` - Crear un nuevo ejemplo
- `PUT /api/ejemplo/:id` - Actualizar un ejemplo
- `DELETE /api/ejemplo/:id` - Eliminar un ejemplo

