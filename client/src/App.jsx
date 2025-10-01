import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Holy Street Store</h1>
        <p>Streetwear Premium</p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edite <code>src/App.jsx</code> e salve para testar HMR
          </p>
        </div>
        <p className="read-the-docs">
          Clique no logo do Vite e React para saber mais
        </p>
      </header>
    </div>
  )
}

export default App
