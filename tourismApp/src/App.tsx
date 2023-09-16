import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';

// for each route we have path and element
function App() {
  return (
    <Routes>
      <Route path='' element={<Layout/>}> 
        <Route index element={<HomePage/>}/>
        <Route path='/signin' element={<SigninPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
