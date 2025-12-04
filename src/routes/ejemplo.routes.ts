import { Router } from 'express';
import { EjemploController } from '../controllers/Ejemplo.controller';

const router = Router();
const ejemploController = new EjemploController();

// Rutas CRUD
router.get('/', ejemploController.getAll);
router.get('/:id', ejemploController.getById);
router.post('/', ejemploController.create);
router.put('/:id', ejemploController.update);
router.delete('/:id', ejemploController.delete);

export default router;

