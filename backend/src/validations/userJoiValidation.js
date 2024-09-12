import Joi from "joi";

const signUpJoi =  Joi.object({
  userName: Joi.string().min(3).max(30).required().trim(),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Password do not match" }),
  });

const loginJoi = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
});

export { signUpJoi, loginJoi };
