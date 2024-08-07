import { useState } from 'react'
import './index.scss'
import Storage from 'local-storage'
import { useNavigate } from 'react-router-dom'

const HeaderView = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const navigateTo = useNavigate()

  const logOut = () => {
    Storage('@user', null)    
    navigateTo('/')
  }

  return (
    <header className='header-container-main'>

      <div onClick={() => setModalVisible(!modalVisible)} className='user-radio-content'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account</title><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
      </div>
      { modalVisible && (
        <div className='header-modal-container'>
          <button onClick={logOut}>Sair</button>
          <button></button>
        </div>
        )
      }
    </header>
  )
}

export default HeaderView