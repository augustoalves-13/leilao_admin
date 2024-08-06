import React, { useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import HeaderView from '../../components/HeaderView'
import FormDrawer from '../../components/FormDrawer'

export const DeviceView = () => {
  const [addDrawerOpen, setAddDrawerOpen] = useState(true)
  const [formValue, setFormValue] = useState({})

  const fields = [
    {type: 'divider', label:"DADOS DO DEVICE"},
    //{name: 'initial_image', type:'file'}
    {name:'footer_path', label:'Logo', type:'file'},
    {name:'Initial_image_path', label:'Imagem inicial', type:'file'},
    {name:'Primary_color', label:'Cor primária'},
    {name:'Secondary_color', label:'Cor secundária'},
    {name:'Text_color', label:'Cor dos textos', type:'password'}
  ]

  const handleFormChange = (data) => {
    setFormValue(data)
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
          fields={fields}
          onChange={handleFormChange}
          handleClose={() => setAddDrawerOpen(false)}
        />
      </section>
    </main>
  )
}
