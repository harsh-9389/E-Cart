import React from "react";
import Layout from "../../components/layout/Layout";
import { AdminMenu } from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title="Admin-Dashboard">
      <div className="container-fluid bg-light py-4">
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm p-3">
              <AdminMenu />
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow-lg p-4">
              <h3 className="mb-3">
                <i className="bi bi-person-circle me-2"></i> Admin Name: {auth?.user?.name}
              </h3>
              <h3 className="mb-3">
                <i className="bi bi-envelope-fill me-2"></i> Admin Email: {auth?.user?.email}
              </h3>
              <h3>
                <i className="bi bi-telephone-fill me-2"></i> Admin Contact: {auth?.user?.phone}
              </h3>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default AdminDashboard;
