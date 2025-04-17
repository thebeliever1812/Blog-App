import './App.css'
import { useDispatch } from 'react-redux'
import { login, logout } from './features/auth/authSlice'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth.js'
import { Header, Footer } from './components/index.js'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return loading ? <div className='h-screen w-full bg-[#1f1d1d] text-center flex justify-center relative'>
    <span className="absolute loader top-5"></span>
  </div> :
    <div className='h-screen w-full bg-[#1f1d1d] text-center'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
}

export default App
