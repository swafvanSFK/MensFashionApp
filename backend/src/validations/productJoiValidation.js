import Joi from "joi";

const addProductJoi = Joi.object({
  productName: Joi.string().trim().required(),
  description: Joi.string().required(),
  brand: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().min(0).required(),
  variants: Joi.array().items(
    Joi.object({
      color: Joi.string().optional(),
      size: Joi.string().optional(),
      price: Joi.number().min(0).required(),
      stock: Joi.number().min(0).required(),
    })
  ),
  stock: Joi.number().min(0).required(),
  images: Joi.array().optional(),
  isFeatured: Joi.boolean().optional(),
  discountPercentage: Joi.number().min(0).max(100).optional().allow(''),
  discountedPrice : Joi.number().optional().allow('')
});

export default addProductJoi;
