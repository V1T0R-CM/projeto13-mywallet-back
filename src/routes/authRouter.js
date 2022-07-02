import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import registerMiddlewareValidation from '../middlewares/registerMiddlewareValidation.js';

const authRouter = Router();
authRouter.post("/sign-up", registerMiddlewareValidation, signUp);
authRouter.post("/sign-in", signIn);
export default authRouter;