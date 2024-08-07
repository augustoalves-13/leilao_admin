import { lazy, useEffect, useState } from "react";
import FormDrawer from "../../components/FormDrawer";
import HeaderView from "../../components/HeaderView";
import { Sidebar } from "../../components/Sidebar";
import "./index.scss";
import api from "../../utils/api";
import { toast } from "react-toastify";
import fetchRequest from "../../utils/fetchRequest";
import TableUI from "../../components/Table";

const EstablishmentView = () => {
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [data, setData] = useState([]);

  const EstRequest = async () => {
    const resp = await fetchRequest("establishment");
    setData(resp);
  };

  useEffect(() => {
    EstRequest();
  }, []);

  const columns = [
    { label: "Nome", accessor: "fantasy_name" },
    { label: "CNPJ", accessor: "document_number" },
    { label: "Chave de Estabelecimento", accessor: "key_establishment" },
  ];

  const fields = [
    { label: "DADOS DO ESTABELECIMENTO", type: "divider" },
    { name: "fantasy_name", label: "Nome Fantasia *" },
    { name: "name", label: "Nome" },
    { name: "documet_number", label: "CNPJ *" },
    { name: "email", label: "E-mail" },
    { name: "cell_state", label: "DDD" },
    { name: "cell_number", label: "Numero de celular" },
    { label: "ENDEREÇO", type: "divider" },
    { name: "country", label: "País" },
    { name: "postal_code", label: "CEP" },
    { name: "address", label: "Rua" },
    { name: "number", label: "Número" },
    { name: "neighborhood", label: "Bairro" },
    { name: "city", label: "Cidade" },
    { name: "state", label: "Estado" },
  ];

  const handleFormChange = (data) => {
    setFormValue(data);
  };

  const onSubmit = async () => {
    try {
      const requestJson = {
        ...formValue,
        address: {
          address: formValue.address,
          number: formValue.number,
          postal_code: formValue.postal_code,
          neighborhood: formValue.neighborhood,
          city: formValue.city,
          state: formValue.state,
          country: formValue.country,
        },
      };
      await api.post("establishment", requestJson);
      setAddDrawerOpen(false);
      toast.success("Operação concluída");
    } catch (e) {
      toast.error(e?.response?.data?.error);
    }
  };

  return (
    <main className="establishment-container-main">
      <Sidebar />
      <section className="establishment-contents">
        <HeaderView title='Estabelecimento'/>

        
        <TableUI
          options={{
            name:"Adicionar Estabelecimento",
            onClick: () => setAddDrawerOpen(true)
          }}
          data={data ?? []}
          columns={columns}
        />

        <FormDrawer
          options={{
            name: "ADICIONAR ESTABELECIMENTO",
            submitText: "CADASTRAR",
            cancelText: "CANCELAR",
          }}
          fields={fields}
          onChange={handleFormChange}
          open={addDrawerOpen}
          handleClose={() => {
            setAddDrawerOpen(false);
          }}
          onSubmit={onSubmit}
        />
      </section>
    </main>
  );
};

export default EstablishmentView;
