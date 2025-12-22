import { SocioController } from "../controllers/Socio.controller";
import { Router } from 'express';

const router = Router();
const socioController = new SocioController();

router.get ('/', socioController.getAll)
router.post ('/',socioController.crearSocio)
router.put ('/:id',socioController.actualizarSocio)
export default router