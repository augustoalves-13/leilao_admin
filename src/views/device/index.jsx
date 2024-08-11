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
    { name: "footer_path", label: "Logo", type: "file", id: "footer_path" },
    {
      name: "initial_image_path",
      label: "Imagem inicial",
      type: "file",
      id: "initial_image_path"
    },
    { name: "primary_color", label: "Cor primária", type: 'color' },
    { name: "secondary_color", label: "Cor secundária", type: 'color' },
    { name: "text_color", label: "Cor dos textos", type: 'color' },
  ];

  const handleFormChange = (data) => {
    setFormValue(data);
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      
      Object.keys(formValue).forEach((key)=>{
        if(formData[key] instanceof File){
          formData.append(key, formValue[key])
        } else {
          formData.append(key, formValue[key])
        }
      })

      await api.post("store/1/device", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAddDrawerOpen(false);
      toast.success("Operação concluída");
    } catch (e) {
      toast.error(e?.response?.data?.error);
    }
  };

  console.log(formValue)

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
