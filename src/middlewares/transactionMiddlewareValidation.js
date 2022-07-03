import transactionSchema from "../schemas/transactionSchema.js";
import db from "../db.js";

export default async function transactionMiddlewareValidation(req, res, next) {
    const validation = transactionSchema.validate(req.body);
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    const session =  await db.collection('sessions').findOne({ token });

    if (!session){
        return res.sendStatus(401);
    }

    if (validation.error) {
      return res.sendStatus(422);
    }

    next();
}