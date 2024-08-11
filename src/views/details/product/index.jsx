import { useParams } from 'react-router-dom'
import './index.scss'
import { useEffect, useState } from 'react'
import fetchRequest from '../../../utils/fetchRequest'
import { API_URL } from '../../../utils/api'
import PDFViewer from 'pdf-viewer-reactjs'

const DetailsProductView = () => {
  const [productData, setProductData] = useState({})

  const {id} = useParams()

  const productRequest = async () => {
    const request = await fetchRequest('categories/products')

    const productRequired = request.find(item => item.id == id)
    setProductData(productRequired)
  }  

  useEffect(() => {
    productRequest()
    console.log(productData)
  },[])

  console.log(API_URL+productData.datasheet)

  return (
    <main className='main-product-container-view'>
      <img className='bg-image' src={API_URL + productData.details_image}/>
      <section className='content-gradient'>
        <img src={API_URL + productData.initial_image} className='product-logo' />

        <div className="content-info">
          <h2>Nome: {productData?.name}</h2>
          <h2>Registro: {productData?.register}</h2>
          <h2>Código: {productData?.code_product}</h2>
          <h2>Raça: {productData?.race}</h2>
          <h2>Criador: {productData?.creator}</h2>
          <h2>Proprietário: {productData?.owner}</h2>
          <h2>Curral: {productData?.corral}</h2>
          <div>
            <button onClick={()=>{
              window.open(API_URL+productData.datasheet, '_blank')
            }}>FICHA TECNICA</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default DetailsProductView