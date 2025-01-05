import React, { useState, useEffect } from "react";
import { UserMenu } from "../../components/layout/UserMenu";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          {/* User Menu */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Orders Section */}
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Orders</h1>

            {orders?.map((o, i) => (
              <div className="border shadow mb-4 p-3 rounded">
                <table className="table table-bordered">
                  <thead>
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
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Product Details Section */}
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-3 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height="100px"
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div className="col-md-8">
                        <h5>{p.name}</h5>
                        <p>{p.description.substring(0, 30)}...</p>
                        <p><strong>Price:</strong> {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
