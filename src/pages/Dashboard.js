import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [userData, setUserData] = useState({ user: '', email: '' });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const updateSubmit = async (data) => {
    if (data.password === data.cpassword) {
      const updateUser = {
        email: userData.email,
        password: data.password,
        currentPassword: data.currentPassword
      }
      try {
        // const { data } = axios.post('/auth/update', { updateUser });
        const { data } = await axios.post('/auth/update', { updateUser });
        console.log('data', data);
        if (data.success) {
          toast.success(data.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
            theme: 'colored'
          });
          await localStorage.removeItem('data');
          setTimeout(() => {
            window.location.href = '/';
          }, 3500);
        } else {
          toast.error(data.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
            theme: 'colored'
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Password's does not match", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
        theme: 'colored'
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('data');
    navigate('/');
  };

  const loadData = useCallback(async () => {
    try {
      const token = await JSON.parse(localStorage.getItem('data'));
      const { data } = await axios.get('/auth/userdata', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data.success) {
        setUserData(data.data);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  useEffect(() => {
    loadData()
  }, [loadData]);

  return (
    <div className="container">
      <div className="bg-success p-5">
        <h2 className='text-white text-center'>Dashboard</h2>
      </div>
      <div className="mt-5 p-3">
        <button className="btn mt-3 btn-danger float-end" onClick={logout}>Logout</button>
        <br />
        <h2 className="mt-5">{ userData?.user }</h2>
        <h2>{ userData?.email }</h2>
      </div>
      <div className="mt-4">
        <div className="col-md-5 mx-auto mt-3 p-5">
          <div className="card p-3 bg-white">
            <h2 className="pt-2 px-4 text-center">Update Details</h2>
            <form className="mt-5 mx-4" onSubmit={handleSubmit(updateSubmit)}>
              <div className="form-group">
                <h5>Name</h5>
                <input type="text" value={userData?.user} className="form-control" readOnly/>
              </div>
              <div className="form-group mt-4">
                <h5>Email</h5>
                <input type="email" value={userData?.email} className="form-control" readOnly/>
              </div>
              <div className="form-group mt-4">
                <h5>Current Password</h5>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter current password"
                  { ...register('currentPassword', { required: true, pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/ }) }
                />
              </div>
              <div className="form-group mt-4">
                <h5>New Password</h5>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  { ...register('password', { required: true, pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/ }) }
                />
                { errors.password && (
                  <div>
                    <p className="text-danger">Password should be of length 8-16</p>
                    <p className="text-danger">Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character</p>
                  </div>
                ) }
              </div>
              <div className="form-group mt-4">
                <h5>Confirm New Password</h5>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter confirm new password"
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
                <button type="submit" className="submit-btn mt-5">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
