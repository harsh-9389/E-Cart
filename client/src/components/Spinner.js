import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Spinner = () => {
  const [count, setCoount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCoount((prevValue) => --prevValue);
    }, 1000);
    if (count === 0) {
      navigate("/login", { state: location.pathname });
    }
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-center">redirecting to you in {count} seconds</h1>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
