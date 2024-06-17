import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageGraph from './assets/pages/PageGraph';

function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<PageGraph/>}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
