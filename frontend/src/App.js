// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddTripPage from "./pages/RideHistoryPage/RideHistoryPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import TripDetailsPage from "./pages/TripDetailsPage/TripDetailsPage";
import UserDetailsPage from "./pages/UserDetailsPage/UserDetailsPage";
import RideHistoryPage from "./pages/RideHistoryPage/RideHistoryPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage />
          }
        />
        {/* <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/details" element={<TripDetailsPage />} />
        <Route path="/user" element={<UserDetailsPage />} />
        <Route path="/rides" element={<PrivateRoute><RideHistoryPage/></PrivateRoute>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
