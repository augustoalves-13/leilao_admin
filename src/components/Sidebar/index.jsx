import { useNavigate } from 'react-router-dom'
import './index.scss'

export const Sidebar = () => {

  const navigate = useNavigate()

  const sidebarData = [
      {label: "Dashboard", path:"/dashboard"},
      {label: "Usuários", path:"/user"},
      {label: "Estabelecimento", path:"/establishment"},
      {label: "Loja", path:"/store"},
      {label: "Device", path:"/device"}
  ]

  return (
    <aside className='aside-container-main'>
      
      <nav>
      {
        sidebarData.map((item, index) => (
          <button key={index} onClick={() => navigate(item.path)}>
            {item.label}
          </button>
        ))
      }
      </nav>  

    </aside>
  )
}
