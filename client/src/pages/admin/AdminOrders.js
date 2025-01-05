import React, { useState, useEffect } from "react";
import axios from "axios";
import { AdminMenu } from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  // eslint-disable-next-line 
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  // eslint-disable-next-line 
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line 
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      // eslint-disable-next-line 
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center my-4">All Orders</h1>
          {orders?.map((o, i) => (
            <div className="border shadow mb-4 rounded" key={o._id}>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                        className="w-100"
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createAt).fromNow()}</td>
                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                <h5 className="mt-3">Order Details:</h5>
                <div className="row">
                  {o?.products?.map((p, i) => (
                    <div className="col-md-6 mb-3" key={p._id}>
                      <div className="card p-2 h-100 shadow-sm">
                        <div className="row g-0">
                          <div className="col-4 text-center">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="img-fluid rounded"
                              alt={p.name}
                              style={{ maxHeight: "100px" }}
                            />
                          </div>
                          <div className="col-8">
                            <div className="card-body">
                              <h6 className="card-title">{p.name}</h6>
                              <p className="card-text">
                                {p.description.substring(0, 30)}...
                              </p>
                              <p className="card-text">
                                <strong>Price:</strong> ${p.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </Layout>
  );
};

export default AdminOrders;
