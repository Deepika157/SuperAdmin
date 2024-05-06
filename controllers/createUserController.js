const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');


router.post('/create-user', async (req, res) => {
    try {
        const { username, gender, phone, email, password, confirmPassword, roles } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send({ message: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        const userId = generateUserID();
        const lastUpdated = new Date();

        const user = new User({ username, gender, phone, email, lastUpdated, password, confirmPassword, roles, userId });
        await user.save();

        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get('/showAllUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.put('/edit-user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, gender, phone, email, password, confirmPassword } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, gender, phone, email, password, confirmPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delete-user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ message: 'User deleted successfully', data: deletedUser });
    } catch (error) {
        res.status(400).send(error);
    }
});

let userIDCounter = 1;

function generateUserID() {
    const paddedID = String(userIDCounter).padStart(3, '0');
    userIDCounter++;
    return paddedID;
}

module.exports = router;


