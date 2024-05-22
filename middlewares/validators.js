const yup = require('yup');

const MESSAGES = {
  missing: 'should be provided',
  email: 'Invalid email format',
  wrongType: (type) => `should be ${type}`,
};

const userValidationSchema = yup.object({
  username: yup
    .string()
    .typeError(MESSAGES.wrongType('a string'))
    .required(MESSAGES.missing),
  email: yup
    .string()
    .typeError(MESSAGES.wrongType('a string'))
    .email(MESSAGES.email)
    .required(MESSAGES.missing),
});

const userIdSchema = yup
  .number()
  .typeError(MESSAGES.wrongType('a number'))
  .required(MESSAGES.missing)
  .integer(MESSAGES.wrongType('an integer'))
  .positive('should be more than 0');

const userValidator = async (req, resp, next) => {
  try {
    await userValidationSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const errors = err.inner.reduce((acc, curr) => {
      if (!acc[curr.path]) {
        acc[curr.path] = [];
      }

      acc[curr.path].push(curr.message);
      return acc;
    }, {});

    resp.status(400).send({ errors });
  }
};

const userIdValidator = async (req, resp, next) => {
  try {
    const parsedId = await userIdSchema.validate(req.params.userId);
    req.params.userId = parsedId;
    next();
  } catch (err) {
    const errors = {
      userId: err.message,
    };
    resp.status(400).send({ errors });
  }
};

module.exports = {
  userValidator,
  userIdValidator,
};
