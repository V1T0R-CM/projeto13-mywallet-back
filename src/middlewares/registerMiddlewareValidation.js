import registerSchema from "../schemas/registerSchema.js";

export default function registerMiddlewareValidation(req, res, next) {
  const validation = registerSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }
  if(req.body.password!==req.body.repeatPassword){
    return res.sendStatus(422);
  }

  next();
}