const express = require('express');
const Coupon = require('../models/Coupon');
const User = require('../models/User');


const assignCoupon = async (req, res) => {
    try {
        const { userid, couponCode, discountPercentage } = req.body;
        const user = await User.findOne({ userId: userid });

        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        const lastUpdated = new Date();
        const saveData = await Coupon({ userid: userid, couponCode: couponCode, discountPercentage: discountPercentage, lastUpdated: lastUpdated }).save();

        res.status(200).send({ message: 'Role assigned successfully', data: saveData });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const showAllAssignCoupon = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.send(coupons);
    } catch (error) {
        res.status(500).send(error);
    }
};

const editCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { couponName, code, discountPercentage } = req.body;

        const updatedCoupon = await Coupon.findByIdAndUpdate(
            id,
            { couponName, code, discountPercentage },
            { new: true }
        );

        if (!updatedCoupon) {
            return res.status(404).send({ message: 'Role not found' });
        }

        res.status(200).send({ message: 'Role updated successfully', data: updatedCoupon });
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCoupon = await Coupon.findByIdAndDelete(id);

        if (!deletedCoupon) {
            return res.status(404).send({ message: 'Coupon not found' });
        }

        res.status(200).send({ message: 'Coupon deleted successfully', data: deletedCoupon });
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    assignCoupon,
    showAllAssignCoupon,
    editCoupon,
    deleteCoupon
};
