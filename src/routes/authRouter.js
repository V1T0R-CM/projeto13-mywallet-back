import { Router } from 'express';
import { signUp, signIn, logOut } from '../controllers/authController.js';
import registerMiddlewareValidation from '../middlewares/registerMiddlewareValidation.js';

const authRouter = Router();
authRouter.post("/sign-up", registerMiddlewareValidation, signUp);
authRouter.post("/sign-in", signIn);
authRouter.delete("/sessions", logOut)
export default authRouter;