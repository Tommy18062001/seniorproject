import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import PlacePage from './pages/PlacePage';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4000";
// axios.defaults.withCredentials = true;

// for each route we have path and element
function App() {
  return (
    <Routes>
      <Route path='' element={<Layout/>}> 
        <Route index element={<HomePage/>}/>
        <Route path='/signin' element={<SigninPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/place/:id' element={<PlacePage/>}/>
      </Route>
    </Routes>
  )
}

export default App
