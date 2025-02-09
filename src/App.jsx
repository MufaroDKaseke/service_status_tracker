import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import CurrentStatus from './components/CurrentStatus'
import History from './components/History'
import Latency from './components/Latency'


function App() {

  return (
    <>
      <Header />
      <main className='container'>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <CurrentStatus />
            <History />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
