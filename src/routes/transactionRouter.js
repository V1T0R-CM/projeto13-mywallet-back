import { Router } from 'express';
import { deposit, withdraw, extract } from '../controllers/transactionController.js';
import transactionMiddlewareValidation from '../middlewares/transactionMiddlewareValidation.js';

const transactionRouter = Router();
transactionRouter.post("/deposit", transactionMiddlewareValidation, deposit);
transactionRouter.post("/withdraw", transactionMiddlewareValidation, withdraw);
transactionRouter.get("/extract", extract)
export default transactionRouter;