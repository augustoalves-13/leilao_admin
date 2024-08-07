import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import HeaderView from "../../components/HeaderView";
import FormDrawer from "../../components/FormDrawer";
import api from "../../utils/api";
import { toast } from "react-toastify";
import fetchRequest from "../../utils/fetchRequest";
import TableUI from "../../components/Table";
import "./index.scss"
import dayjs from "dayjs";

export const DeviceView = () => {
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [data, setData] = useState([]);

  const DeviceRequest = async () => {
    const resp = await fetchRequest("store/1/device");
   const mapResp = resp.map((item)=>{
    return{
   ...item,
   created_at:dayjs(item.created_at).format('DD/MM/YYYY')
    }
   }) 
    setData(mapResp);
    console.log("a", data);
  };

  useEffect(() => {
    DeviceRequest();
  }, []);
  
  const columns = [
    {label: "Criado em", accessor:"created_at"},
    {label: "Chave do terminal", accessor:"key_device"},
  ];

  const fields = [
    { type: "divider", label: "DADOS DO DEVICE" },
    //{name: 'initial_image', type:'file'}
    { name: "footer_path", label: "Logo", type: "file", id: "footer_path" },
    {
      name: "initial_image_path",
      label: "Imagem inicial",
      type: "initial_image_path",
    },
    { name: "primary_color", label: "Cor primária" },
    { name: "secondary_color", label: "Cor secundária" },
    { name: "text_color", label: "Cor dos textos", type: "password" },
  ];

  const handleFormChange = (data) => {
    setFormValue(data);
  };

  const onSubmit = async () => {
    try {
      await api.post("/store/1/devices", formValue, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formData = new FormData();
      formData.append("footer_path", formValue.footer_path);
      formData.append("initial_image", formValue.initial_image_path);
      setAddDrawerOpen(false);

      toast.success("Operação concluída");
    } catch (e) {
      toast.error(e?.response?.data?.error);
    }
  };

  return (
    <main className="device-container-main">
      <Sidebar />
      <section className="device-contents">
        <HeaderView title='Terminais'/>
       
        <TableUI
          options={{
            name:"Adicionar Terminal",
            onClick: () => setAddDrawerOpen(true)
          }}
          data={data ?? []}
          columns={columns}
        />
        
        
       
       
       
        <FormDrawer
          options={{
            name: "ADICIONAR DEVICE",
            cancelText: "CANCELAR",
            submitText: "CONFIRMAR",
          }}
          open={addDrawerOpen}
          onSubmit={onSubmit}
          fields={fields}
          onChange={handleFormChange}
          handleClose={() => setAddDrawerOpen(false)}
        />
      </section>
    </main>
  );
};
