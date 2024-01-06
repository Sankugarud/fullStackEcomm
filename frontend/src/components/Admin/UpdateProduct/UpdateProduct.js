import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  productDetails,
} from "../../redux/action/getproduct";
import { useAlert } from "react-alert";
import  Button  from "@mui/material/Button";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import './UpdateProduct.css'
import { updateProductReset } from "../../redux/action/productActionFunction";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error: updateError, isUpdated,} = useSelector((state) => state.productModify);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);


  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  const productId = id;
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        dispatch(productDetails(productId));
      } catch (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
    };
  
    if (!product || product.product._id !== productId) {
      fetchProductDetails();
    }
     if(product && product.product._id === productId) {
      // Set your state based on the fetched product details
      setName(product.product.name);
      setDescription(product.product.description);
      setPrice(product.product.price);
      setCategory(product.product.category);
      setStock(product.product.stock);
    }
  
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
  
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: updateProductReset });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm ={
      name:name,
      price:price,
      description:description,
      category:category,
      Stock:Stock,
    }


   
    dispatch(updateProduct(productId, myForm));
  };

  
  return (
    <Fragment>
      <div className="productDashboard">
        <div className="updateProductContainer">
          <form
            className="updateProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

         

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;