const express=require('express');

const router=express.Router();
const checkAuth=require('../middleware/check-auth');

const OrderController=require("../controllers/order")

router.get('/',checkAuth,OrderController.order_get_all)

router.post('/',checkAuth,OrderController.create_order);


router.get('/:orderId',checkAuth,OrderController.order_get_order)

router.delete('/:orderID',checkAuth,OrderController.delete_order)

module.exports=router;