import "../src/styles/main.scss";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Loader from './pages/Loader';
import Filter from "./pages/Filter";

import Profiles from './pages/Profiles';

import Sidebar from "./components/Sidebar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { auth } from "./firebase";

function App() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUserName(user.displayName);
          setUserEmail(user.email);
          setIsAuthenticated(true);
        } else {
          setUserName("");
          setUserEmail("");
          setIsAuthenticated(false);
        }
      });
    }, []);

    useEffect(() => {
      // Simulate an API call or some loading process
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // Adjust the duration as necessary
  
      return () => clearTimeout(timer);
    }, []);
  
    if (loading) {
      return <Loader />;
    }
  

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={<Signup setUsername={setUserName} />}/>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                </Routes>

                {isAuthenticated && <Sidebar name={userName} email={userEmail} />}

                {isAuthenticated && (
                  <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profiles/:contactNo" element={<Profiles />} />
                      
                 
                      <Route path="/filter" element={<Filter />} />
                      
                  </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
