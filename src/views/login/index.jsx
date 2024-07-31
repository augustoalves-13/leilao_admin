import { toast } from 'react-toastify'
import { EntryField } from '../../components/inputs'
import api from '../../utils/api'
import './index.scss'
import React, { useRef, useState } from 'react' 
import LoadingBar from 'react-top-loading-bar'
import Button from '../../components/Button'

const LoginView = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successLogin, setSuccessLogin] = useState(false)

  const ref = useRef(null)

  const loginSubmit = async () => {
    try {
      const request = await api.post('login', {email: email, password: password})
      console.log(request)

      if(request.data)
      setSuccessLogin(true)

      ref.current.continuousStart()
    } catch (e) {
      ref.current.complete()
      toast.error(e?.response?.data?.error)
    }
  }

  return (
    <main className='main-login-container'>
      <LoadingBar color='red' ref={ref}/>
      <h1>Login</h1>
      <section className='form-content'>
        <EntryField 
          label='E-mail'
          onChange={e => setEmail(e.target.value)}
        />
        <EntryField 
          onChange={e => setPassword(e.target.value)}
          label='Senha'
          type='password'
        />
      </section>
      <div className='form-submit'>
        <Button type='progress' disabled={successLogin} onClick={loginSubmit}>Entrar</Button>
      </div>
    </main>
  )
}

export default LoginView