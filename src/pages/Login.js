import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const loginSubmit = async (evt) => {
    evt.preventDefault();
    const userData = { email, password };
    try {
      const { data } = await axios.post('/auth/login', userData);
      if (data.success) {
        toast.success(data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem('data', JSON.stringify(data.token));
        navigate('/dashboard');
      } else {
        toast.error(data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="row bgcolor py-4">
      <h2 className="text-white text-center">Ay! Captain Welcome back</h2>
      <div className="col-md-4 mx-auto py-5">
        <div className="card p-3 bg-white">
          <h2>Login</h2>
          <form onSubmit={loginSubmit} className="mt-5 mx-4">
            <div className="form-group">
              <h5>Email address</h5>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter email"
                required
                autoFocus
              />
            </div>
            <div className="form-group mt-4">
              <h5>Password</h5>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="mt-5 submit-btn">Submit</button>
            </div>
          </form>
          <Link className="text-primary text-center my-3" to="/register">Not registered? Click here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
