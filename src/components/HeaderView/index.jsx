import { useEffect, useState } from "react";
import "./index.scss";
import Storage from "local-storage";
import { useNavigate } from "react-router-dom";

const HeaderView = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [storageData, setStorageData] = useState();

  const GetUser = () =>{
    const user = Storage('@user')
    if(user == null){
      navigateTo('/')
    }
    else{
      setStorageData(user)
    }
  }

  useEffect(()=>{
    GetUser();
    console.log(storageData)
  },[])


  const navigateTo = useNavigate();

  const logOut = () => {
    Storage("@user", null);
    navigateTo("/");
  };

  return (
    <header className="header-container-main">
      <h1>{props.title}</h1>
      <div
        onClick={() => setModalVisible(!modalVisible)}
        className="user-radio-content"
      >
        <h3>{storageData?.name.slice(0,1)}</h3>
      </div>
      {modalVisible && (
        <div className="header-modal-container">
          <button onClick={logOut}>Sair</button>
          <button></button>
        </div>
      )}
    </header>
  );
};

export default HeaderView;
