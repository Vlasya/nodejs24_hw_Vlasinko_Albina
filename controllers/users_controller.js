const userService = require('../services/users_service');

function getAllUsers(_req, resp) {
  const userList = userService.getAllUsers();
  resp.send(userList);
}

function getUserById(req, resp) {
  const { userId } = req.params;

  const videoItem = userService.getUserById(userId);
  resp.json(videoItem);
}

function addNewUser(req, resp) {
  userService.addNewUser(req.body);
  resp.status(201).json(req.body);
}

function deleteUserById(req, resp) {
  const { userId } = req.params;
  userService.deleteUserById(userId);
  resp.status(204).send();
}

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  deleteUserById,
};
