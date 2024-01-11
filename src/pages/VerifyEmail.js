import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const params = useParams();

  useEffect(() => {
    const tokenVerify = async () => {
      try {
        const { data } = await axios.post('/auth/verify-mail', { token: params.token });
        console.log('data', data);
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

          setTimeout(() => {
            window.close();
          }, 4000);
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

          setTimeout(() => {
            window.close();
          }, 4000);
        }
      } catch (err) {
        console.log(err);
      }
    };
    tokenVerify();
  }, [params.token]);

  return (
    <div className="mx-auto">
      <Link className="btn btn-dark" to="/">Go to login page</Link>
      <h1>Verify mail page</h1>
    </div>
  )
};

export default VerifyEmail;
