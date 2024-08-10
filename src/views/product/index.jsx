import React, { useEffect, useState } from "react";
import HeaderView from "../../components/HeaderView";
import { Sidebar } from "../../components/Sidebar";
import "./index.scss";
import FormDrawer from "../../components/FormDrawer";
import fetchRequest from "../../utils/fetchRequest";
import TableUI from "../../components/Table";
import { toast } from "react-toastify";

export const ProductView = () => {
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [data, setdata] = useState([]);

 
 const productRequest= async () => {
    const resp = await fetchRequest("categories/products")
    console.log('request', resp)
    setdata(resp)
    console.log(data)
 };

 useEffect(() => {
  productRequest();
 },[]);

const columns = [
  {label: "nome", accessor: "name"},
  {label: 'Categoria', accessor: 'category_name'}
];
 
 
  const fields = [
    { label: "DADOS DO PRODUTOS", type: "divider" },
    { name: "name", label: "Nome" },
    { name: "register", label: "Numero do Registro" },
    { name: "code_product", label: "Codigo do Produto" },
    { name: "race", label: "Raça" },
    { name: "creator", label: "Criador" },
    { name: "owner", label: "Proprietario" },
    { label: "Curral", name: "corral" },
    { name: "initial_iamge", label: "Logo do Produto", type:'file', id:'initial_image' },
    { name: "details_image", label: "Imagem de Capa",  type:'file', id:"details_image"},
    { name: "datasheet", label: "Ficha técnica", type:'file', id:"datasheet" },
  
  ];


  const onSubmit = async () => {
    try{

    const FormData = new FormData();
    FormData.append("initial_image",formValue.initial_image);
    FormData.append("details_image", formValue.details_image);
    FormData.append("datasheet",formValue.datasheet);
    setAddDrawerOpen(false);

    toast.success("Operação concluida");
    } catch(e){
      toast.error(e?.response?.data?.error);
    } 
  }

  const handleFormChange = (d) => {
    setFormValue(d);
  };

  return (
    <main className="product-container-main">
      <Sidebar />
      <section className="product-container">
        <HeaderView title="Produtos" />

       <TableUI 
       options={{
          name:"Adiconar Produtos",
          onClick: () => setAddDrawerOpen(true)
        }}
        data={data ?? []}
        columns={columns}
       />
       
       
        <FormDrawer
          open={addDrawerOpen}
          options={{
            name: "ADICONAR PRODUTOS",
            submitText: "CADRASTAR",
            cancelText: "CANCELAR",
          }}
          fields={fields}
          onChange={handleFormChange}
          handleClose={() => setAddDrawerOpen(false)}
          onSubmit={onSubmit}
        />
      </section>
    </main>
  );
};
