import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { TripProvider } from "./context/TripContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <TripProvider>
          <App />
        </TripProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
