import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext'; // Assuming you have an AppContext

const ForgotPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState('request'); // 'request', 'otp', or 'reset'
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setStage('otp'); // Change stage to 'otp' after requesting reset
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/verify-otp`, { email, otp });
      if (response.data.success) {
        toast.success(response.data.message);
        setStage('reset'); // Change stage to 'reset' after OTP verification
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/reset-password`, { // Removed token, now sending email
        email, // Send email for user identification
        password: newPassword,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login'); // Redirect to login after successful reset
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (stage === 'request') {
    return (
      <div className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold">Forgot Password</p>
          <p>Enter your email address to reset your password.</p>
          <form onSubmit={handleRequestReset} className="w-full">
            <div className="w-full mb-3">
              <p>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md text-base"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          <p className="mt-2">
            Remember your password? <Link to="/login" className="text-primary underline cursor-pointer">Login here</Link>
          </p>
        </div>
      </div>
    );
  } else if (stage === 'otp') {
    return (
      <div className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold">Verify OTP</p>
          <p>
            An OTP has been sent to your email. Please enter it below to proceed with password reset.
          </p>
          <form onSubmit={handleVerifyOTP} className="w-full">
            <div className="w-full mb-3">
              <p>OTP</p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md text-base"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
          <p className="mt-2">
            Didn't receive the OTP? <Link to="/forgot-password" className="text-primary underline cursor-pointer">Resend OTP</Link>
          </p>
        </div>
      </div>
    );
  } else if (stage === 'reset') {
    return (
      <div className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold">Reset Your Password</p>
          <form onSubmit={handleResetPassword} className="w-full">
            <div className="w-full mb-3">
              <p>New Password</p>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                required
              />
            </div>
            <div className="w-full mb-3">
              <p>Confirm New Password</p>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md text-base"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
          <p className="mt-2">
            Remember your password? <Link to="/login" className="text-primary underline cursor-pointer">Login here</Link>
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default ForgotPassword;