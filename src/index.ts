import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getConnection, closeConnection } from './config/database';

import routes from './routes/Index.routes'

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/', routes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

// Inicializar servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await getConnection();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await closeConnection();
  process.exit(0);
});

startServer();

export default app;

