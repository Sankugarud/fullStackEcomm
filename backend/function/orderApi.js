const Orders = require('../models/orderModel')
const Products = require('../models/productModel')


exports.createOrder = async (req, res) => {
    try {
      console.log(req.body);
        const {
            shippingInfo,
            itemOrder,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;
        const order = await Orders.create({
            shippingInfo,
            itemOrder,
            paidAt:Date.now(),
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user:req.user._id
        })
        res.status(201).json({
            success:true,
            order:order
        })
    } catch (error) {
      console.log(error)
         res.status(501).json({
            success:false,
            error:error
        })
    }
    
}

//get a single order of id
exports.getSingleOrder = async(req,res) => {
    try {
        const order = await Orders.findById(req.params.id).populate(
            "user",
            "name email"
          );
        
          if (!order) {
            returnres.status(404).json({
                success:false,
                error:"oreder not found"
            })
          }
          res.status(200).json({
            success: true,
            order,
          });
    } catch (error) {
        res.status(501).json({
            success:false,
            error:error
        })
    }
}

// get logged in user  Orders
exports.myOrders = async (req, res) => {
    try {
        const userId = req.user._id; 
        const order = await Orders.find({ user: userId });
        if(!order){
            return  res.status(501).json({
                success:false,
                error:"order not found"
            })
        }
        res.status(200).json({
        success: true,
        order,
        });
    } catch (error) {
        res.status(501).json({
            success:false,
            error:error
        })
    }
    
  };

  // get all Orders -- Admin
exports.getAllOrders = async (req, res) => {
    try {
        const order = await Orders.find();
  
        let totalAmount = 0;
    
        order.forEach((order) => {
            totalAmount += order.totalPrice;
        });
    
        res.status(200).json({
            success: true,
            totalAmount,
            order,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            error:error
        });
    }
    
  };

  //update order - admin
  exports.updateOrder = async (req, res) => {
    const order = await Orders.findById(req.params.id);
    console.log(order)
    if (!order) {
      return res.status(404).json({
        success: false,
        error:"Order not found with this Id"
      });
    }
  
    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        error:"You have already delivered this order"
      });
    }
  
    if (req.body.status === "Shipped") {
      order.itemOrder.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  };
  
  async function updateStock(id, quantity) {
    const product = await Products.findById(id);
  
    product.stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }

  //delete order - admin
  exports.deleteOrder = async (req, res) => {
    try {
        
        const order = await Orders.findById(req.params.id);
       
        if (!order) {
          return res.status(404).json({
            success: false,
            error: "order not found",
          });
        }
    
        await Orders.deleteOne({_id:req.params.id});
    
        res.status(200).json({
          success: true,
        });
      } catch (error) {
        res.status(501).json({
          success: false,
          error: error,
        });
      }
    
  };