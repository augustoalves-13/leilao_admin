import React, { useEffect, useMemo, useState } from 'react'
import FormDrawer from '../../components/FormDrawer'
import Button from '../../components/Button'
import api from '../../utils/api'
import { toast } from 'react-toastify'

const UserView = () => {
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [formValue, setFormValue] = useState({})
  const [gets, setGets] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await api.get('gets');
        setGets(req.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const fields = [
    {label: "DADOS DO USUÁRIO", type:"divider"},
    {label:"Perfil", name:"profile", type:'select', selectOptions: gets?.profiles},
    {label:"Nome", name:"name", },
    {label:"CPF", name:"document_number", },
    {label:"Gênero", name:"gender", type:'select', selectOptions: gets?.genders},
    {label:"DDI", name:"cell_state", },
    {label:"Número de Celular", name:"cell_number", },
    {label:"E-mail", name:"email", },
    {label:"Senha", name:"password", type:'password'}
  ]
  
  const handleFormChange = (data) => {
    setFormValue(data)
  }

  console.log(formValue)

  const onSubmit = async () => {
    try {
      await api.post('users', formValue)

      setAddDrawerOpen(false)
      toast.success('Operação concluída')
    } catch (e) {
      toast.error(e?.response?.data?.error)
    }
  }

  return (
    <main>
      <Button size={10} onClick={() => setAddDrawerOpen(true)}>abrir</Button>
      <FormDrawer
        options={{
          name:"Adicionar Usuário",
          cancelText:"CANCELAR",
          submitText:"CONFIRMAR"
        }}
        onChange={handleFormChange}
        open={addDrawerOpen}
        handleClose={() => {
          setAddDrawerOpen(false)
        }}
        onSubmit={onSubmit}
        fields={fields}
      />
    </main>
  )
}

export default UserView