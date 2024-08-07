import React, { useEffect, useState } from "react";
import FormDrawer from "../../components/FormDrawer";
import Button from "../../components/Button";
import api from "../../utils/api";
import { toast } from "react-toastify";
import HeaderView from "../../components/HeaderView";
import "./index.scss";
import { Sidebar } from "../../components/Sidebar";
import TableUI from "../../components/Table";
import fetchRequest from "../../utils/fetchRequest";

const UserView = () => {
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [gets, setGets] = useState(null);
  const [data, setData] = useState([])

  const userRequest = async () => {
    const resp = await fetchRequest('users')
    setData(resp)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await api.get("gets");
        setGets(req.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    userRequest()
    fetchData()
  }, []);

  const fields = [
    { label: "DADOS DO USUÁRIO", type: "divider" },
    {
      label: "Perfil",
      name: "profile",
      type: "select",
      selectOptions: gets?.profiles,
    },
    { label: "Nome", name: "name" },
    { label: "CPF", name: "document_number" },
    {
      label: "Gênero",
      name: "gender",
      type: "select",
      selectOptions: gets?.genders,
    },
    { label: "DDI", name: "cell_state" },
    { label: "Número de Celular", name: "cell_number" },
    { label: "E-mail", name: "email" },
    { label: "Senha", name: "password", type: "password" },
  ];

  const handleFormChange = (data) => {
    setFormValue(data);
  };

  const onSubmit = async () => {
    try {
      await api.post("users", formValue);

      setAddDrawerOpen(false);
      toast.success("Operação concluída");
    } catch (e) {
      toast.error(e?.response?.data?.error);
    }
  };

  const columns = [
    { label: 'Nome', accessor: 'name' },
    { label: 'Telefone', accessor: 'cell_number' },
    { label: 'Email', accessor: 'email' },
  ];

  return (
    <main className="user-container-main">
      <Sidebar />
      <section className="user-content">
        <HeaderView title='Usuários' />

        <TableUI
          options={{
            name:"Adicionar Usuário",
            onClick: () => setAddDrawerOpen(true)
          }}
          data={data ?? []}
          columns={columns}
        />

        <FormDrawer
          options={{
            name: "Adicionar Usuário",
            cancelText: "CANCELAR",
            submitText: "CONFIRMAR",
          }}
          onChange={handleFormChange}
          open={addDrawerOpen}
          handleClose={() => {
            setAddDrawerOpen(false);
          }}
          onSubmit={onSubmit}
          fields={fields}
        />
      </section>
    </main>
  );
};

export default UserView;
