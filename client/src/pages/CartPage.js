import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
        return null;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      // eslint-disable-next-line
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-3 mb-3 rounded">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center mb-4">
              {cart?.length
                ? `You have ${cart.length} item(s) in your cart ${auth?.token ? "" : "please login to checkout"
                }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          {/* Cart Items */}
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-3 p-3 card flex-row align-items-center shadow">
                <div className="col-md-4 text-center">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="img-fluid rounded"
                    alt={p.name}
                    style={{ maxHeight: "150px" }}
                  />
                </div>
                <div className="col-md-8">
                  <h5>{p.name}</h5>
                  <p>{p.description?.substring(0, 30)}...</p>
                  <p>
                    <strong>Price:</strong> ${p.price}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="col-md-4">
            <div className="card p-3 shadow">
              <h2 className="text-center">Cart Summary</h2>
              <p className="text-center">Total | Checkout | Payment</p>
              <hr />
              <h4 className="text-center mb-3">Total: {totalPrice()}</h4>

              {/* Address Section */}
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h5>Current Address</h5>
                  <p>{auth?.user?.address}</p>
                  <button
                    className="btn btn-outline-warning w-100"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning w-100"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Add Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning w-100"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}

              {/* Payment Section */}
              {clientToken && cart?.length > 0 && (
                <div className="mt-3">
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className={`btn btn-primary w-100 ${loading ? "text-secondary" : ""
                      }`}
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default CartPage;
