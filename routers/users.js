const { Router } = require('express');
const userController = require('../controllers/users_controller');
const { userValidator, userIdValidator } = require('../middlewares/validators');

function notFoundErrorHandler(err, _req, resp, _next) {
  resp.status(404).json({ error: err.message });
}

const userRouter = Router();

// get list of users
userRouter.get('/', userController.getAllUsers);

//get user by ID
userRouter.get(
  '/:userId',
  userIdValidator,
  userController.getUserById,
  notFoundErrorHandler
);

//add new user
userRouter.post('/', userValidator, userController.addNewUser);

//delete user by ID
userRouter.delete(
  '/:userId',
  userIdValidator,
  userController.deleteUserById,
  notFoundErrorHandler
);

// this works for ALL not existing above
userRouter.use((_req, resp) => {
  resp.status(404).send();
});

module.exports = {
  userRouter,
};
