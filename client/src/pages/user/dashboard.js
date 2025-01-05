import React from "react";
import Layout from "./../../components/layout/Layout";
import { UserMenu } from "./../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"user Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          {/* User Menu */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* User Profile Card */}
          <div className="col-md-9">
            <div className="card w-75 p-4 shadow" >
              <h3>Name: {auth?.user?.name || "N/A"}</h3>
              <h3>Email: {auth?.user?.email || "N/A"}</h3>
              <h3>Address: {auth?.user?.address || "No address provided"}</h3>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Dashboard;
