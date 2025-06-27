import react from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/landing.jsx"

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route
          path="/landing"
          element={
              <Landing />
          }
        />  
      </Routes> 
    </BrowserRouter>
  </>
  )
}

export default App;
