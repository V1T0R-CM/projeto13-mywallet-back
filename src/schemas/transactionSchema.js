import joi from "joi";

const transactionSchema = joi.object({
    value: joi.string().required(),
    description: joi.string().required(),
});

export default transactionSchema;