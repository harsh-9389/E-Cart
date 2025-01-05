import React from "react";
import "../../css/HomeSlider.css";
import bg1 from "../../images/slider-bg1.jpg";
// import bg2 from "../../images/slider-bg2.jpg";
import iphone from "../../images/slider-bnr.jpg";
import { useNavigate } from "react-router-dom";

const HomeSlider = () => {
  const navigate = useNavigate();
  return (
    <div className="my-slider">
      <section className="hero-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 custom-padding-right">
              <div className="slider-head">
                {/* Start Hero Slider */}
                <div className="hero-slider">
                  {/* Start Single Slider */}
                  <div
                    className="single-slider"
                    style={{
                      backgroundImage: `url(${bg1})`,
                    }}
                  >
                    <div className="content">
                      <h2>
                        <span>No restocking fee ($35 savings)</span>
                        M75 Sport Watch
                      </h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <h3>
                        <span>Now Only</span> $120.99
                      </h3>
                      <button
                        style={{
                          width: "6rem",
                          background: "#FF7518",
                          borderRadius: "0.5rem",
                          border: "none",
                          padding: "0.6rem",
                          margin: "1rem",
                        }}
                        onClick={() => navigate(`/product/Men's-watch`)}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                  {/* End Single Slider */}
                </div>
                {/* End Hero Slider */}
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="row">
                <div className="col-lg-12 col-md-6 col-12 md-custom-padding">
                  {/* Start Small Banner */}
                  <div
                    className="hero-small-banner"
                    style={{
                      backgroundImage: `url(${iphone})`,
                    }}
                  >
                    <div className="content">
                      <h2>
                        <span>Newly Arrived</span>
                        iPhone 12 Pro Max
                      </h2>
                      <h3>$230</h3>
                      <button
                        style={{
                          width: "6rem",
                          background: "#FF7518",
                          borderRadius: "0.5rem",
                          border: "none",
                          padding: "0.6rem",
                          margin: "1rem",
                        }}
                        onClick={() => navigate(`/product/iPhone-12-Pro-max`)}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                  {/* End Small Banner */}
                </div>
                <div className="col-lg-12 col-md-6 col-12">
                  {/* Start Small Banner */}
                  <div className="hero-small-banner style2">
                    <div className="content">
                      <h2>Weekly Sale!</h2>
                      <p>
                        Saving up to 50% off all online store items this week.
                      </p>
                      <div className="button">
                        <a className="btn" href="product-grids.html">
                          Shop Now
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Start Small Banner */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSlider;
