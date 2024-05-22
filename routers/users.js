const { Router } = require('express');
const { userValidator, userIdValidator } = require('../middlewares/validators');

const userRouter = Router();

userRouter.get('/', (_req, resp) => {
  resp.status(200).send([]);
});

userRouter.get('/:userId', userIdValidator, (req, resp) => {
  resp.json({ userId: req.params.userId });
});

userRouter.post('/', userValidator, (req, resp) => {
  resp.status(201).json(req.body);
});

userRouter.delete('/:userId', userIdValidator, (req, resp) => {
  resp.status(400).send();
});

module.exports = {
  userRouter,
};
