const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Role = require('../models/Role');
const { commentModel } = require('../models/Test');


router.post('/assign-role', async (req, res) => {
  try {
    const { username, userid, rolename, description } = req.body;
    const user = await User.findOne({ username, userId: userid });
    
    
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const lastUpdated = new Date();

    const saveDetails = await Role({ userid: userid, username: user.username, description: description, rolename: rolename, lastUpdated: lastUpdated }).save();

    user.rolePhase = rolename;
    await user.save();

    res.status(200).send({ message: 'Role assigned successfully', data: saveDetails });

  } catch (error) {
    res.status(400).send(error);
  }

});


router.post('/accept', async (req, res) => {
  
  try {
    const user = await User.findOne({ userId: req.body.uid });

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const updatedStatus = await Role.findOneAndUpdate(
      { userid: req.body.uid },
      { status: 'accepted' },
    );

    if (!updatedStatus) { throw new Error('Error while updating status!') }

    return res.status(200).json({ message: 'Status accepted' });

  } catch (error) {
    res.status(500).json({ error });
  }
});


router.post('/reject', async (req, res) => {
   
  try {
    const user = await User.findOne({ userId: req.body.uid });

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const updatedStatus = await Role.findOneAndUpdate(
      { userid: req.body.uid },
      { status: 'rejected' },
    );

    if (!updatedStatus) { throw new Error('Error while updating status!') }

    return res.status(200).json({ message: 'Status rejected' });

  } catch (error) {
    res.status(500).json({ error });
  }
});


router.get('/showAllAssignRoles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.send(roles);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.put('/edit-role/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName, description } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { roleName, description },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).send({ message: 'Role not found' });
    }

    res.status(200).send({ message: 'Role updated successfully', data: updatedRole });
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete('/delete-role/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).send({ message: 'Role not found' });
    }

    res.status(200).send({ message: 'Role deleted successfully', data: deletedRole });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;



