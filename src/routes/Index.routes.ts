import socioRoutes from './Socio.routes';
import profesorRoutes from './Profesor.routes';
import leccionRoutes from './Leccion.routes';


import { Router } from 'express';

const router = Router();
router.use("/Socios", socioRoutes)
router.use("/Profesor", profesorRoutes)
router.use("/Leccion", leccionRoutes)


export default router