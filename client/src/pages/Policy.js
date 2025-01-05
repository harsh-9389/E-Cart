import React from "react";
import Layout from "./../components/layout/Layout";
import policyImg from "./../images/policy.jpg";

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus">
        <div className="col-md-6 ">
          <img
            src={policyImg}
            alt="contactus"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-4">
          <h4 className="mb-4">Privacy Policies</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Data Collection:</strong> We collect data only to enhance user experience.
            </li>
            <li className="list-group-item">
              <strong>Data Usage:</strong> Your data is never shared with third-party services without consent.
            </li>
            <li className="list-group-item">
              <strong>Data Security:</strong> We use encryption to protect user information.
            </li>
            <li className="list-group-item">
              <strong>Cookies:</strong> Our site uses cookies to improve functionality and analytics.
            </li>
            <li className="list-group-item">
              <strong>User Rights:</strong> Users can request data deletion or updates anytime.
            </li>
            <li className="list-group-item">
              <strong>Policy Updates:</strong> We reserve the right to update policies at any time.
            </li>
          </ul>
        </div>

      </div>
    </Layout>
  );
};

export default Policy;
