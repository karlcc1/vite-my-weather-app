import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FetchWeather from './FetchWeather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <FetchWeather />
    </div>
  )
}

export default App
