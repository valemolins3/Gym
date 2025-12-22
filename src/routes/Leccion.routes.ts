import { LeccionController } from "../controllers/Leccion.controller";
import { Router } from 'express';

const router = Router();
const leccionController = new LeccionController();

router.get ('/', leccionController.getAll)
router.post ('/',leccionController.crearLeccion)
/* router.put ('/:id',leccionController.actualizarLeccion) */
export default router