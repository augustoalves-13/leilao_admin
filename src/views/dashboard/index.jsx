import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Storage from "local-storage";

export const DashboardView = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    if (Storage("@user") == null) {
      navigateTo("/");
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};
