const Products = require('../models/productModel.js');
const ApiFeatures = require('../utils/apifeatcher.js');

//create admin product
exports.createProduct = async (req, res) => {
       
        try {
            req.body.user = req.user._id;
            const product = await Products.create(req.body);
            
            res.status(201).json({
                success: true,
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal Server Error',
            });
        }

  }
//get single product
exports.getproduct = async (req, res) => {
    const product = await Products.findById(req.params.id);
  
    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'Product not found',
        });
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  };
  
//get all product admin
exports.getAdminProducts = async (req, res, next) => {
  try {
    const products = await Products.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
  });
  }
    
};
  //get all products
exports.getProducts = async (req, res) => {
    try {
        const resultPerPage = 8;
        const productsCount = await Products.countDocuments();
        const apiFeature = new ApiFeatures(Products.find(), req.query)
            .search()
            .filter()
            
            apiFeature.pagination(resultPerPage);
        let product = await apiFeature.query;
        let filteredProductsCount = product.length;

         
        
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            });
        }
       
            res.status(200).json({
                success: true,
                product,
                productsCount,
                resultPerPage,
                filteredProductsCount,
            });
        
    } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal Server Error',
            });
    }

   
  }

//update product
exports.updateproduct = async(req, res)=> {

    let product = await Products.findById(req.params.id);

    if(!product){
       return res.status(500).json({
            success:false,
            error: 'Internal Server Error',
        })
    }

    product = await Products.findByIdAndUpdate(req.params.id, req.body)
    res.status(201).json({
        success:true,
        data:product,
    })

}

//delete product
exports.deleteproduct = async (req,res)=>{
    try {
        
        let product = await Products.findById(req.params.id);
        if(!product){
            return res.status(500).json({
                 success:false,
                 error: 'Internal Server Error',
             })
         }

         product = await Products.findByIdAndDelete(req.params.id);
         res.status(201).json({
            success:true,
            data:product,
        })
    
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}

//create or update product reviews
exports.createProductReview = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated',
            });
        }
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };
      const product = await Products.findById(productId);

      const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
        });
      } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
      }
      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
      product.ratings = avg / product.reviews.length;
      await product.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        product:product
      });
    } catch (error) {
        res.status(501).json({
            success: false,
            
          });
    }
    
}
// Get All Reviews of a product
exports.getProductReviews = async (req, res) => {
    try {
        const product = await Products.findById(req.query.id);
  
    if (!product) {
        res.status(501).json({
            success: false,
            error:"product not found"
          });
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
    } catch (error) {
        res.status(501).json({
            success: false,
            error:error
          });
    }
    
  };

  //delete product review
exports.deleteReview  = async (req, res) => {
    try {
        const product = await Products.findById(req.query.productId);

        if(!product){
            return res.error(501).json({
                success:false,
                error:"product not found"
            })
        }
        const reviews = product.reviews.filter((item)=>  item._id.toString() !== req.query.id.toString());
        let avg = 0;
    
      reviews.forEach((rev) => {
        avg += rev.rating;
      });
    
      let ratings = 0;
    
      if (reviews.length === 0) {
        ratings = 0;
      } else {
        ratings = avg / reviews.length;
      }
    
      const numOfReviews = reviews.length;
    
      await Products.findByIdAndUpdate(
        req.query.productId,
        {
          reviews,
          ratings,
          numOfReviews,
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
    
      res.status(200).json({
        success: true,
      });
    } catch (error) {
        res.status(501).json({
            success: false,
            error:error
          });
    }
    
}