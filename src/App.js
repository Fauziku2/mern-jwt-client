import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          } />
          <Route path="/verify/:token" element={
            <PublicRoutes>
              <VerifyEmail />
            </PublicRoutes>
          } />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

export function ProtectedRoutes({ children }) {
  const auth = localStorage.getItem('data');
  if (auth) {
    return children;
  } else {
    return <Navigate to="/" />
  }
}

export function PublicRoutes({ children }) {
  const auth = localStorage.getItem('data');
  if (auth) {
    return <Navigate to="/dashboard" />
  } else {
    return children;
  }
}


