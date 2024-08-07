import { useNavigate } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import Storage from "local-storage";

export const Sidebar = () => {
  const navigate = useNavigate();

  const sidebarData = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Usuários", path: "/user" },
    { label: "Estabelecimento", path: "/establishment" },
    { label: "Loja", path: "/store" },
    { label: "Device", path: "/device" },
  ];

  const [storageData, setStorageData] = useState();

  const GetUser = () => {
    const user = Storage("@user");
    if (user == null) {
      navigate("/");
    } else {
      setStorageData(user);
    }
  };

  useEffect(() => {
    GetUser();
    console.log(storageData);
  }, []);

  return (
    <aside className="aside-container-main">
      <h3>{storageData?.name}</h3>
      <nav>
        {sidebarData.map((item, index) => (
          <button key={index} onClick={() => navigate(item.path)}>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};
