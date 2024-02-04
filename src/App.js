import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const location = useLocation();

  const handleLogOff = () => {
    // Sunucuya logoff talebi gönderilebilir
    // Ardından localStorage temizlenebilir
    // localStorage.clear();
  };

  return (
    <div className="App">
      
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={location.pathname !== "/main" && '/sign-in'}>
              To-Do-List
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  {location.pathname !== "/main" && <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>}
                </li>
                <li className="nav-item">
                  {location.pathname !== "/main" && <Link className="nav-link" to={'/sign-up'}>
                    Register
                  </Link>}
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  {location.pathname === "/main" && <Link className="nav-link" to={'/'} onClick={handleLogOff}>
                    Log Off
                  </Link>}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      
    </div>
  );
}

export default App;
