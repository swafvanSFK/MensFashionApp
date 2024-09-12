import Joi from 'joi'

const addProductCategoryJoi = Joi.object({
    category : Joi.string()
        .min(3)
        .required(),
    description : Joi.string().allow('').optional()
})

export default addProductCategoryJoi