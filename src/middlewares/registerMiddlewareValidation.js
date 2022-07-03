import registerSchema from "../schemas/registerSchema.js";
import db from "../db.js";

export default async function registerMiddlewareValidation(req, res, next) {
  const validation = registerSchema.validate(req.body);
  const registro = await db.collection('users').findOne({email: req.body.email})
  if (validation.error) {
    return res.sendStatus(422);
  }
  if(req.body.password!==req.body.repeatPassword){
    return res.sendStatus(422);
  }
  if(registro){
    return res.sendStatus(422);
  }

  next();
}