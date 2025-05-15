"use client";

import React, { useState } from "react";

interface AuthFormProps {
  type: "login" | "register" | "forgot";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const isLogin = type === "login";
  const isRegister = type === "register";
  const isForgot = type === "forgot";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with", { email, password });
    } else if (isRegister) {
      console.log("Registering with", { fullName, phone, email, password, confirmPassword });
    } else if (isForgot) {
      console.log("Sending reset email to", email);
    }
  };

  return (
    <div className="flex mt-18 items-center bg-beige text-dark-green flex-col p-4">
        <h1 className="lg:text-4xl text-2xl font-medium tracking-wider uppercase  py-4">{type}</h1>
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-xl text-dark-green mb-6 font-medium">
        <h2 className="text-2xl lg:text-4xl tracking-wide uppercase font-light text-center mb-2">
          {isLogin && "Log In to Rai's Spices"}
          {isRegister && "Sign Up to Rai's Spices"}
          {isForgot && "Reset Your Password"}
        </h2>

        {isLogin && (
          <p className="text-center text-base mb-4">
            Don&apos;t have an account? <a href="/auth/register" className="text-green-900">Register</a>
          </p>
        )}
        {isRegister && (
          <p className="text-center text-base mb-4">
            Already have an account? <a href="/auth/login" className="text-green-900">Log In</a>
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col ">
          {isRegister && (
            <>
            <label htmlFor="Full Name">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="p-3 my-2 border rounded"
              />
              <label htmlFor="phoneNumber">Phone Numer</label>
             
              <input
                type="text"
                placeholder="Enter 10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="p-3 my-2 border rounded"
              />
            </>
          )}
<label htmlFor="email">Email</label>
             
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 my-2 border rounded"
          />

          {!isForgot && (
            <>
            <label htmlFor="password">Password</label>
             
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 my-2 border rounded"
              />
              {isRegister && (
                <>
                <label htmlFor="confirmPassword">Confirm Password</label>
             
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="p-3 my-3 border rounded"
                  />
              </>
              )}
            </>
          )}

          <button
            type="submit"
            className="bg-dark-green text-white py-3 my-2 rounded text-lg uppercase"
          >
            {isLogin && "Log In"}
            {isRegister && "Sign Up"}
            {isForgot && "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
