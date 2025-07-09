import react from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/landing.jsx"

function App() {
  return (
    <>
     <BrowserRouter basename="/portfolio/">
      <Routes>
        <Route
          path="/landing"
          element={
              <Landing />
          }
        />  
        <Route
          path="*"
          element={
            <Navigate to="/landing" replace />
          }
        />
      </Routes> 
    </BrowserRouter>
  </>
  )
}

export default App;
