const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
        mobileNo: {
            type: Number,
            required: true,
        }
    },
    itemOrder: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
              },
        }
        
        ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);
// {
//     "shippingInfo":{
//         "address":"xyz",
//         "city":"mumbai",
//         "state":"maharashtra",
//         "country":"india",
//         "mobileNo":7715012295,
//         "pincode":400078
//     },
//     "itemOrder":{
//         "product":"6560a1d84409cbde19534c3f",
//         "name":"iphone10",
//         "price":20000,
//         "image":"abc",
//         "quantity":2
//     },
//     "paymentInfo":{
//         "id":"sample",
//         "status":"success"
//     },
//     "itemsPrice":20000,
//     "taxPrice":36,
//     "shippingPrice":100,
//     "totalPrice":20136
// }