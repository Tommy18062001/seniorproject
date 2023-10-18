import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import PlacePage from "./pages/PlacePage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import AccountEditPage from "./pages/AccountEditPage";
import PlaceEditPage from "./pages/PlaceEditPage";
import PlacesPage from "./pages/PlacesPage";
import DestinationsPage from "./pages/DestinationsPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

// for each route we have path and element
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/:id" element={<AccountEditPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlaceEditPage />} />
          <Route path="/account/places/edit/:id" element={<PlaceEditPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
