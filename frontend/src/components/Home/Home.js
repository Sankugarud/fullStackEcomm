import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';

import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Loader from '../Layout/Loader/Loader';
import { clearErrors, getproduct } from '../redux/action/getproduct';
import { useAlert } from 'react-alert';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://t4.ftcdn.net/jpg/03/06/69/49/360_F_306694930_S3Z8H9Qk1MN79ZUe7bEWqTFuonRZdemw.jpg',
  },
  {
    label: 'Bird',
    imgPath:
      'https://cdn.vectorstock.com/i/preview-1x/57/56/template-banner-for-online-store-with-shopping-vector-42935756.jpg',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897328.jpg?w=740&t=st=1703258125~exp=1703258725~hmac=43be32926779336ac19d86063a76b1479d67853f65b965b7f5f1a3596fb435a3',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
    'https://as2.ftcdn.net/v2/jpg/03/65/85/43/1000_F_365854329_gu5JaTNVwIZeD3pYWqZK0e05dRkfnAUK.jpg',
  },
];

function Home() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const { products, loading, error } = useSelector((state) => state.products);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
const handleClick = () => {
  navigate('/products')
}
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
  }
  dispatch(getproduct())
  }, [dispatch,alert,error])
  return (
    <div>
        {loading ? (
      <Loader/>
    ) : (

      <Box sx={{ width:'90%', minHeight:'70vh',  margin: 'auto', flexGrow: 1 }}>
      
<AutoPlaySwipeableViews
  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
  index={activeStep}
  onChangeIndex={handleStepChange}
  enableMouseEvents
>
  {images.map((step, index) => (
    <div key={step.label}>
      {Math.abs(activeStep - index) <= 2 ? (
        <Box
          component="img"
          sx={{
            width:"100%",
            display: 'block',
            overflow: 'hidden',
            objectFit: 'cover',
            borderRadius:"1rem",
            border:'none',
            height: '60vh',
          }}
          src={step.imgPath}
          alt={step.label}
        />
      ) : null}
    </div>
  ))}
</AutoPlaySwipeableViews>
      <MobileStepper 
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      </Box>
    )}
    <div className="productContainer" id="productContainer">
            {products.product &&
              products.product.slice(-4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
                <div className='gotoProducts'>
                <Button variant="contained" onClick={handleClick}  color="primary"
  sx={{ marginTop: '1rem', backgroundColor:'#353232', color: 'white' }}> All products</Button>
                </div>
          

    </div>
    
    
  );
}

export default Home;
 