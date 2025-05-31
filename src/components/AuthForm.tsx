"use client";
import React, { Suspense, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/store";
import { loginCustomer } from "@/store/slice/customerSlice";


interface AuthFormProps {
  type: "login" | "register" | "forgot" | "reset";
}

interface RegisterFormData {
  full_name: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
}

export default function AuthForm({ type }: AuthFormProps) {

  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    full_name: "",
    email: "",
    phone: 0,
    password: "",
    confirmPassword: "",
  });

  const searchparams = useSearchParams();
  const userid = searchparams.get("userId");
  const secret = searchparams.get("secret");

  const [loading2, setIsLoading2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.customer);
  const isLogin = type === "login";
  const isRegister = type === "register";
  const isForgot = type === "forgot";
  const isReset = type === "reset";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setIsLoading2(true);

    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        setValidationError("Passwords don't match");
        setIsLoading2(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          
          body: JSON.stringify({
            full_name: formData.full_name,
            email: formData.email,
            password: formData.password,
            phone:Number(formData.phone),
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        if (data.success && data.token) {

          localStorage.setItem("user", data.token);
          localStorage.setItem("userid", data.user.id);
          toast.success("Account created successfully!");
          console.log("Registration successful, redirecting to profile...");

            // await dispatch(registerCustomer({
            //         full_name: formData.full_name,
            //         email: formData.email,
            //         password: formData.password,
            //     })).unwrap();

          router.push("/profile");
          
        
        } else {
          toast.error("Registration failed. Please try again.");
          throw new Error(data.message || "Registration failed");
        }
      } catch (err: unknown) {
        toast.error("Registration failed. Please try again.");
        console.error("Registration error:", err);
        if (err instanceof Error) {
          setValidationError(
            err.message || "Registration failed. Please try again."
          );
        } else {
          setValidationError("Registration failed. Please try again.");
        }
        setIsLoading2(false);
        // setIsNavigating(false); // Stop loading on error
      }
    }
    
    else if (isLogin) {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            rememberMe,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message);
         
          // throw new Error(data.message || "Login failed");
        }
        if (data.success && data.token) {
           localStorage.setItem('token', data.token);
          localStorage.setItem("user", data.token);
          localStorage.setItem("userid", data.user.id);
          // Map Document to User type 
         
          toast.success("Login successful!");
          console.log("Login successful, redirecting to profile...");
            await dispatch(loginCustomer({
                    email: formData.email,
                    password: formData.password,
                    rememberMe: true,
                })).unwrap();
          router.push("/profile");
        }
      } catch (error) {
        console.error("Login error:", error);

        toast.error("Login failed");
        setValidationError("Login failed. Please try again.");

        setIsLoading(false);
      }
    }
    
    
    else if (isForgot) {
      try {
        const response = await fetch("/api/auth/forgot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        });

        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Error in Sending Reset Link");
        if (data.success) {
          toast.success("Reset Link send successfully");
          router.push("/login");
        }
      } catch (err: unknown) {
        console.error("Error in Sending Reset Link:", err);
        if (err instanceof Error) {
          setValidationError(err.message || "Error in Sending Reset Link");
        } else {
          setValidationError("Error in Sending Reset Link");
        }
        setIsLoading2(false);
      }
    } 
    
    else if (isReset) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Password don't match");
        setIsLoading2(false);
        return;
      }
      try {
        const response = await fetch("/api/auth/reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userid,
            secret,
            password: formData.password,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Reset Failed");
        if (data.success) {
          toast.success("Password reset successfully");
          console.log("Password reset successfully...");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error in Reseting password:", error);
        toast.error("Error in reseting password");
        // setValidationError(err.message || "Error in Reseting password");
        setIsLoading2(false);
      }
    }

    
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex pt-24 items-center bg-beige text-dark-green flex-col p-4">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-xl text-dark-green mb-6 font-medium">
          <h2 className="text-2xl lg:text-4xl tracking-wide uppercase font-light text-center mb-2">
            {isLogin && "Log In to AAYUSH BHARAT"}
            {isRegister && "Sign Up to AAYSH BHARAT"}
            {isForgot && "Reset Your Password"}
            {isReset && "Set New Password"}
          </h2>

          {isLogin && (
            <p className="text-center text-base mb-4">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-green-900">
                Register
              </a>
            </p>
          )}
          {isRegister && (
            <p className="text-center text-base mb-4">
              Already have an account?{" "}
              <a href="/login" className="text-green-900">
                Log In
              </a>
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col">
            {isRegister && (
              <>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className="p-3 my-2 border rounded"
                  required
                />

                <label>Phone Number</label>
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="p-3 my-2 border rounded"
                  required
                />
              </>
            )}

            {(isLogin || isRegister || isForgot) && (
              <>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="p-3 my-2 border rounded"
                  required
                />
              </>
            )}

            {!isForgot && (
              <>
                <label>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="p-3 my-2 border rounded w-full pr-10"
                    required
                  />
                  {formData.password && (
                    <span
                      className="absolute right-3 top-5 cursor-pointer text-xl"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  )}
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between my-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      Remember Me
                    </label>
                    <a href="/forgot" className="text-green-900 text-sm">
                      Forgot Password?
                    </a>
                  </div>
                )}

                {(isRegister || isReset) && (
                  <>
                    <label>Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="p-3 my-2 border rounded w-full pr-10"
                        required
                      />
                      {formData.confirmPassword && (
                        <span
                          className="absolute right-3 top-5 cursor-pointer text-xl"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            {validationError && (
              <p className="text-red-600 text-sm my-2">{validationError}</p>
            )}

            <button
              type="submit"
              className="bg-dark-green text-white py-3 my-2 rounded text-lg uppercase"
            >
              {loading2
                ? "Loading..."
                : isLogin
                ? "Log In"
                : isRegister
                ? "Sign Up"
                : isForgot
                ? "Send Reset Link"
                : isReset
                ? "Reset Password"
                : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </Suspense>
  );
}
