import './index.scss'
import HeaderView from "../../components/HeaderView"
import { Sidebar } from "../../components/Sidebar"
import { useEffect, useMemo, useState } from 'react'
import fetchRequest from '../../utils/fetchRequest'
import TableUI from '../../components/Table'
import FormDrawer from '../../components/FormDrawer'
import { type } from '@testing-library/user-event/dist/type'

const CategoriesView = () => {
   const [addDrawerOpen, setAddDrawerOpen] = useState(false)
   const [formValue, setFormValue] = useState({})
   const [data,setData] = useState([])

   const categoriesRequest = async () => {
      const req = await fetchRequest('store/categories')
      console.log(req)
      setData(req)
   }

   const optionsStore = useMemo(async () => {
      const req = await fetchRequest('establishment/1/store')
      return req
   },[])

   useEffect(()=>{
      categoriesRequest()
   },[])

   const fields = [
      {label: "DADOS DA CATEGORIA", type: 'divider'},
      {label:"Loja", name:"store", type:"select", selectOptions: optionsStore},
      {name: 'name', label:"Nome da categoria"},
      {name: 'image_path', label: 'Logo da categoria', id: 'image_path', type: 'file'}
   ]

   const columns = [
      {label: "Nome", accessor: 'name'},
      {label: "Criado em", accessor: 'created_at'}
   ]

   const handleChange = (data) => {
      setFormValue(data)
   }

   return (
      <main className="categories-container-main">
         <Sidebar/>
         <section className="categories-contents">
            <HeaderView title="Categorias"/>

            <TableUI
               data={data ?? []}
               columns={columns}
               options={{
                  name: 'Adicionar Categoria',
                  onClick: () => setAddDrawerOpen(true)
               }}
            />
            
            <FormDrawer
               options={{
                  name:"ADICIONAR CATEGORIA",
                  cancelText: 'CANCELAR',
                  submitText: 'CADASTRAR'
               }}
               fields={fields}
               onChange={handleChange}
               open={addDrawerOpen}
               handleClose={() => {
                  setAddDrawerOpen(false)
                  setFormValue({})
               }}
            />

         </section>
      </main>
   )
}

export default CategoriesView