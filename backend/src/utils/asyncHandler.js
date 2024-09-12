
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch((error) => {
      res.status(400).send({message: error.message});
      if (error.joi) {
        res.status(405).send({ message: 'Joi validation error', error });
      } else {
        next(error);
      }
    });
};

export default asyncHandler;
