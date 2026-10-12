import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

const LoginModal = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      {/* Login Trigger Button */}
      <label htmlFor="login_modal" className="btn btn-primary mr-4 rounded-full btn-outline">
        Login
      </label>

      {/* Modal */}
      <input type="checkbox" id="login_modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle" role="dialog">
        <div className="modal-box w-full max-w-md mx-auto">

          {/* Header */}
          <h3 className="font-bold text-2xl text-center mb-1">
            Welcome back 
          </h3>
          <p className="text-center text-sm text-base-content/60 mb-6">
            Login to your EventGate account
          </p>

          {/* Email */}
          <div className="w-full mb-3">
            <label className="block text-sm font-medium mb-1">Email</label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <FaEnvelope className="text-base-content/50" />
              <input type="email" className="grow" placeholder="you@example.com" />
            </label>
          </div>

          {/* Password */}
          <div className="w-full mb-6">
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Password</label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <FaLock className="text-base-content/50" />
              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-base-content/50 hover:text-base-content"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </label>
          </div>

          {/* Login Button */}
          <button className="btn btn-primary w-full rounded-full mb-3">
            Login
          </button>

          {/* Divider */}
          <div className="divider text-xs text-base-content/40">OR</div>

          {/* Redirect to Sign Up */}
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary font-semibold hover:underline">
              Sign Up
            </a>
          </p>

          {/* Close Button */}
          <div className="modal-action mt-4">
            <label htmlFor="login_modal" className="btn btn-ghost btn-sm cursor-pointer">
              Close
            </label>
          </div>

        </div>

        {/* Click outside to close */}
        <label className="modal-backdrop" htmlFor="login_modal">Close</label>
      </div>
    </>
  )
}

export default LoginModal