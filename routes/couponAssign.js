const express = require('express');
const router = express.Router();
const { assignCoupon, showAllAssignCoupon, editCoupon, deleteCoupon } = require('../controllers/assignCouponController');

router.post('/assign', assignCoupon);
router.get('/showAll/:id', showAllAssignCoupon);
router.put('/edit/:id', editCoupon);
router.delete('/delete/:id', deleteCoupon);

module.exports={
  routes: router
}


