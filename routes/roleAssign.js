const express = require('express');
const router = express.Router();
const { assignRole, accept, reject, showAllAssignRoles, editRole, deleteRole } = require('../controllers/assignRoleController');

router.post('/assign', assignRole);
router.post('/accept', accept);
router.post('/reject', reject);
router.get('/showAll/:id', showAllAssignRoles);
router.put('/edit/:id', editRole);
router.delete('/delete/:id', deleteRole);

module.exports={
  routes: router
}



