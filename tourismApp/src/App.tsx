import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import PlacePage from "./pages/places/PlacePage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/account/AccountPage";
import AccountEditPage from "./pages/account/AccountEditPage";
import PlaceEditPage from "./pages/places/PlaceEditPage";
import PlacesPage from "./pages/places/PlacesPage";
import BookingsPage from "./pages/bookings/BookingsPage";
import AboutPage from "./pages/AboutPage";
import BookingEditPage from "./pages/bookings/BookingEditPage";
import DestinationsPage from "./pages/places/DestinationsPage";

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
          <Route
            path="/account/bookings/"
            element={<BookingsPage isUserAdmin={true} />}
          />
          <Route path="/account/bookings/:id" element={<BookingsPage />} />
          <Route
            path="/account/bookings/edit/:id"
            element={<BookingEditPage />}
          />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/aboutUs" element={<AboutPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
