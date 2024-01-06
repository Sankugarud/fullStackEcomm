import React, { useEffect } from "react";
// import Sidebar from "../SideBar/SideBar.js";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../redux/action/getproduct.js";
import { getAllOrders } from "../../redux/action/orderAction.js";
import { getAllUsers } from "../../redux/action/usercalled.js";
import { Chart as ChartJS, registerables } from 'chart.js';
import './DashBoard.css'

const Dashboard = () => {
  const dispatch = useDispatch();
  ChartJS.register(...registerables);
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let outOfStock = 0;
  products.product &&
    products.product.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
    scales: {
      y: {
        type: 'linear',
        position: 'left',
      },
    },
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
       <div className="dashboardContainer">
        <div className="dashboardSummary">
        <h1 component="h1">Dashboard</h1>
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <div>
                <p>Product</p>
                <p>{products && products.length}</p>
              </div>
            </Link>
            <Link to="/admin/orders">
              <div>
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </div>
            </Link>
            <Link className="userDiv" to="/admin/users">
              <div>
                <p>Users</p>
                <p>{users && users.length}</p>
              </div>
            </Link>
            <Link to="/admin/reviews">
              <p>Reviews</p>
            </Link>
          </div>
        </div>

          <div className="lowerComponents">
            <div className="lineChart">
              <Line data={lineState} />
            </div>

            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default Dashboard;