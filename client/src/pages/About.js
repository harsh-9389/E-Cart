import React from "react";
import Layout from "./../components/layout/Layout";
import aboutImg from "./../images/aboutus.jpg";

const About = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={aboutImg}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            We are an E-commerce platform that provides a wide range of
            products. We have a variety of products available in different
            categories. We provide the best quality products at the best price.
            We have a user-friendly interface that allows users to easily
            navigate through the website. We have a secure payment gateway that
            ensures the safety of your transactions. We have a dedicated team of
            customer service representatives who are always ready to assist you
            with any queries or concerns. We are committed to providing the best
            shopping experience to our customers. We value your feedback and
            suggestions. Please feel free to contact us with any feedback or
            suggestions. We look forward to serving you.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
