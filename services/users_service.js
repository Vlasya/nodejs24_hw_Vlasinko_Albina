const dataSource = [
  {
    id: 1,
    username: 'John Smith',
    email: 'johnsmith32@server.com',
  },
  {
    id: 2,
    username: 'Sinda Nicols',
    email: 'sinda32@server.com',
  },
];

// initial max index available to use
dataSource._maxIndex = Math.max(...dataSource.map((item) => item.id));

function getAllUsers() {
  return [...dataSource];
}

function getUserById(userId) {
  const userItem = dataSource.find(({ id }) => id === userId);
  if (!userItem) {
    throw new Error('User does not exist');
  }

  return userItem;
}

function addNewUser(metadata) {
  dataSource._maxIndex += 1;

  const newUserItem = {
    ...metadata,
    id: dataSource._maxIndex,
  };

  dataSource.push(newUserItem);
  return newUserItem;
}

function deleteUserById(userId) {
  const elemIndex = dataSource.findIndex((item) => item.id === userId);
  if (elemIndex < 0) {
    throw new Error('User does not exist');
  }

  dataSource.splice(elemIndex, 1);
}

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  deleteUserById,
};
