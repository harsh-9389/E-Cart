import React, { useState, useEffect } from "react";
import { AdminMenu } from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2">
          <AdminMenu />
        </div>

        {/* Products Section */}
        <div className="col-md-10">
          <h1 className="text-center mb-4">All Products List</h1>

          {/* Products Grid */}
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link text-decoration-none"
              >
                <div className="card m-3" style={{ width: "18rem" }}>
                  {/* Product Image */}
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "200px", objectFit: "contain" }}
                  />

                  {/* Product Details */}
                  <div className="card-body text-center">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.length > 50
                        ? `${p.description.substring(0, 50)}...`
                        : p.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
