import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes, notFoundRoute } from './system/routes'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
        <Route path={notFoundRoute.path} element={<notFoundRoute.component />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
