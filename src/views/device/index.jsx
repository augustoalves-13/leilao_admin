import React, { useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import HeaderView from '../../components/HeaderView'
import FormDrawer from '../../components/FormDrawer'
import api from '../../utils/api'
import { toast } from 'react-toastify'

export const DeviceView = () => {
  const [addDrawerOpen, setAddDrawerOpen] = useState(true)
  const [formValue, setFormValue] = useState({})

  const fields = [
    {type: 'divider', label:"DADOS DO DEVICE"},
    //{name: 'initial_image', type:'file'}
    {name:'footer_path', label:'Logo', type:'file', id:'footer_path'},
    {name:'initial_image_path', label:'Imagem inicial', type:'initial_image_path', },
    {name:'primary_color', label:'Cor primária'},
    {name:'secondary_color', label:'Cor secundária'},
    {name:'text_color', label:'Cor dos textos', type:'password'}
  ]

  const handleFormChange = (data) => {
    setFormValue(data)
  }

  const onSubmit = async () => {
    try {
      await api.post('/store/1/devices', formValue, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })

      const formData = new FormData()
      formData.append('footer_path', formValue.footer_path)
      formData.append('initial_image', formValue.initial_image_path)
      setAddDrawerOpen(false)

      toast.success('Operação concluída')
    } catch (e) {
      toast.error(e?.response?.data?.error)
    }
  }

  return (
    <main>
      <Sidebar/>
      <section>
        <HeaderView/>
        <FormDrawer
          options={{
            name:'ADICIONAR DEVICE',
            cancelText: 'CANCELAR',
            submitText: 'CONFIRMAR'
          }}
          open={addDrawerOpen}
          onSubmit={onSubmit}
          fields={fields}
          onChange={handleFormChange}
          handleClose={() => setAddDrawerOpen(false)}
        />
      </section>
    </main>
  )
}
