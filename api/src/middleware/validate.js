const createHttpError = require("http-errors");
const Validators = require("../Validations");

module.exports = function (validatorName) {
  if (!Validators.hasOwnProperty(validatorName))
    throw new Error(`'${validatorName}' validator is not exist`);

  return async function (req, res, next) {
    try {
      const validated = await Validators[validatorName].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error.isJoi)
        return next(createHttpError(422, { message: error.message }));
      next(createHttpError(500));
    }
  };
};
