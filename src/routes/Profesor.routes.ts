
import { ProfesorController } from "../controllers/Profesor.controller";
import { Router } from 'express';

const router = Router();
const profesorController = new ProfesorController();

router.get('/', profesorController.getAll);
router.post('/', profesorController.crearProfesor);
router.put('/:id', profesorController.actualizarProfesor);

export default router;