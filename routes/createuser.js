const express = require('express');
const router = express.Router();
const {  createuser, showAllUsers, editUser, deleteUser} = require('../controllers/createUserController');

router.post('/create', createuser);
router.get('/showAll/:id', showAllUsers);
router.put('/edit/:id', editUser);
router.delete('/delete/:id', deleteUser);

module.exports={
  routes: router
}