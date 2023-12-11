const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    
    name:{
        type:String,
        requied:true,
    },
    ratings:{
        type:Number,
        default:0,
    },
    stock:{
        type:Number,
        default:1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        required: [true, 'plz add price'],
        maxLength: 8,
      },
      description: {
        type: String,
        required: [true, 'plz add description'],
      },
      category: {
        type: String,
        required: [true, 'plz add category'],
      },
      images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      reviews: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("Product", productSchema);