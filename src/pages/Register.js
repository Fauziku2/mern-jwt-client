import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const registerSubmit = async (data) => {
    if (data.password === data.cpassword) {
      const userData = {
        user: data.user,
        email: data.email,
        password: data.password
      }
      try {
        const { data } =  await axios.post('/auth/register', userData);
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
        toast.error(error, {
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
    } else {
      toast.error('Passwords does not match', {
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
  };

  return (
    <div className="row bgcolor p-4">
      <h2 className="text-white text-center pb-1">Ay! Captain Register here</h2>
      <div className="col-md-5 mx-auto py-5 px-5">
        <div className="card p-3 bg-white">
          <h2 className="pt-2 px-4">Register</h2>
          <form noValidate className="mt-5 mx-4" onSubmit={handleSubmit(registerSubmit)}>
            <div className="form-group">
              <h5>Name</h5>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                required
                autoFocus
                { ...register('user', { required: true, minLength: 6 }) }
              />
              { errors.user && <p className="text-danger mt-1">Name should be of at least 6 characters</p> }
            </div>
            <div className="form-group mt-4">
              <h5>Email address</h5>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                required
                {
                ...register(
                  'email',
                  {
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  }
                )}
              />
              { errors.email && <p className="text-danger mt-1">Please check and enter correct email</p>}
            </div>
            <div className="form-group mt-4">
              <h5>Password</h5>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                required
                { ...register('password', { required: true, pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/ }) }
              />
              { errors.password && (
                <div>
                  <p className="text-danger">Password should be of length 8-16</p>
                  <p className="text-danger">Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character</p>
                </div>
              )}
            </div>
            <div className="form-group mt-4">
              <h5>Confirm password</h5>
              <input
                type="password"
                className="form-control"
                placeholder="Enter confirm password"
                required
                { ...register('cpassword', { required: true, pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/ }) }
              />
              { errors.cpassword && (
                <div>
                  <p className="text-danger">Password should be of length 8-16</p>
                  <p className="text-danger">Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character</p>
                </div>
              ) }
            </div>
            <div className="text-center">
              <button className="submit-btn mt-5" type="submit">Submit</button>
            </div>
          </form>
          <Link className="text-primary text-center my-3" to="/">Already registered?Click here to login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
