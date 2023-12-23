import React, {  useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../redux/action/orderAction";
import Loader from "../../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import LaunchIcon from "@material-ui/icons/Launch";
import './MyOrder.css'
const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, order } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            const statusValue = params.value || ""; 
            return statusValue === "Delivered" ? "greenColor" : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => (
            <Link to={`/order/${params.id}`}>
              <LaunchIcon />
            </Link>
          ),
        },
      ];
    // Check if order is an array before using forEach
    const rows = [];

  order &&
    order.forEach((item, index) => {
      rows.push({
        itemsQty: item.itemOrder.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(myOrders());
    }, [dispatch, alert, error]);
  
    return (
      <div>
        {loading ? (
          <Loader /> 
        ) : (
          <div className="myOrdersPage">
            {order && order.length > 0 && (
              <div>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="myOrdersTable"
                  autoHeight
                />
        {user && 
        <p id="myOrdersHeading">
        {user.name}'s Orders
      </p>}
                
              </div>
            )}
          </div> 
        )} 
      </div>
    );
};

export default MyOrders;