const express = require('express');
const pagesRouter = express.Router();
const formUrlEncoder = express.urlencoded({ extended: false });

const userService = require('../services/users_service');
const { userValidator } = require('../middlewares/validators');

pagesRouter.get('/', (_req, resp) => {
  const userList = userService.getAllUsers();
  resp.render('index', { userList });
});

pagesRouter
  .route('/add-user')
  .get((_req, resp) => {
    resp.render('add_user');
  })
  .post(formUrlEncoder,userValidator, (req, resp) => {
    userService.addNewUser(req.body)
    resp.redirect('/')
  });

module.exports = {
  pagesRouter,
};
