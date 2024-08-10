import { useNavigate } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import Storage from "local-storage";
import { Typography } from "@mui/material";


const sidebarData = [
  { label: "Dashboard", path: "/dashboard", icon: 'pie_chart' },
  { label: "Usuários", path: "/user", icon: 'person' },
  { label: "Estabelecimento", path: "/establishment", icon: 'location_city' },
  { label: "Loja", path: "/store", icon: 'store' },
  { label: "Terminais", path: "/device", icon: 'devices' },
  { label: "Produtos", path: "/product", icon: 'category' },
];

export const Sidebar = () => {
  const [storageData, setStorageData] = useState();
  const [sidebarActive, setSidebarActive] = useState(false)

  const navigate = useNavigate();

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
  }, []);

  return (
    <div className={`aside-main ${sidebarActive ? 'aside-enable-main' : 'aside-disabled-main'}`}>
      <aside onMouseEnter={() => setSidebarActive(true)} onMouseLeave={() => setSidebarActive(false)} className="aside-content-main">
        <div className="user-aside-info">
          <div className="user-radio">
            <h2>{storageData?.name?.slice(0, 1)}</h2>
          </div>
          <h3>{sidebarActive ? storageData?.name : ''}</h3>
        </div>
        <nav>
          {sidebarData.map((item, index) => (
            <button key={index} onClick={() => navigate(item.path)}>
              <span className="material-symbols-outlined">
                {item.icon}
              </span>
              <Typography className="button-title">
                {sidebarActive ? item.label : ''}
              </Typography>
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
};
