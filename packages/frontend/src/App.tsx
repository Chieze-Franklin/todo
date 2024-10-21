import ToDo from './components/ToDo'
import Login from './components/Login'

function App() {
  const token = sessionStorage.getItem('token')
  if (token) {
    return (
      <div className='bg-stone-900 grid py-4 min-h-screen'>
        <ToDo />
      </div>
    )
  } else {
    return (
      <div className='bg-stone-900 grid py-4 min-h-screen'>
        <Login />
      </div>
    )
  }
}

export default App
