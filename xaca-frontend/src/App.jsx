import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import PaginaIncio from './pages/PaginaInicio'
import PaginaNavegacion from './pages/PaginaNavegacion'
import PaginaPrendas from './pages/PaginaPrendas'
import PaginaPrestadas from './pages/PaginaPrestadas'
import PaginaProveedores from './pages/PaginaProveedores'
import PaginaNotfound from './pages/PaginaNotFound'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<PaginaIncio />} />
          <Route path="/categoria/:id" element={<PaginaNavegacion />} />
          <Route path="/tipo/:id" element={<PaginaPrendas />} />
          <Route path="/prestadas" element={<PaginaPrestadas />} />
          <Route path="/proveedores" element={<PaginaProveedores />} />
          <Route path="*" element={<PaginaNotfound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App