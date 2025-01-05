import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  //initalp details
  useEffect(() => {
    //getProduct
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.category._id);
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.slug) getProduct();
  }, [params?.slug]);


  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          {/* Product Details Section */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="img-fluid rounded"
              alt={product.name}
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center mb-4">Product Details</h1>
            <h6><strong>Name:</strong> {product.name}</h6>
            <h6><strong>Description:</strong> {product.description}</h6>
            <h6><strong>Price:</strong> ${product.price}</h6>
            <h6><strong>Category:</strong> {product?.category?.name}</h6>
            <button
              className="btn btn-secondary mt-3"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                toast.success("Item added to cart");
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        <hr className="my-4" />

        {/* Similar Products Section */}
        <div>
          <h4 className="mb-3">Similar Products</h4>
          {relatedProducts.length < 1 ? (
            <p className="text-center text-muted">No Similar Products found</p>
          ) : (
            <div className="row g-3">
              {relatedProducts.map((p) => (
                <div className="col-md-4 col-sm-6" key={p._id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top img-fluid"
                      alt={p.name}
                      style={{ maxHeight: "300px", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text text-truncate">{p.description.substring(0, 50)}...</p>
                      <p className="card-text"><strong>$ {p.price}</strong></p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                            toast.success("Item added to cart");
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </Layout>
  );
};

export default ProductDetails;
