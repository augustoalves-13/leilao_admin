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
    {name:'name', label:'Nome do victor'},
    {name:'name', label:'Nome do device'},
    {name:'name', label:'Nome do device'},
    {name:'name', label:'Nome do device'},
    {name:'name', label:'Nome do device', type:'password'}
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
