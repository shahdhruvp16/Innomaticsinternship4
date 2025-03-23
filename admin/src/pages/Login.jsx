import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const endpoint = state === "Admin" ? "/api/admin/login" : "/api/doctor/login";
      const { data } = await axios.post(backendUrl + endpoint, { email, password });

      if (data.success) {
        localStorage.setItem('aToken', data.token);
        setAToken(data.token);
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 rounded-2xl p-8 sm:p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6 uppercase tracking-widest">
          <span className="text-[#6C63FF]">{state}</span> Login
        </h2>

        <div className="mb-5">
          <label className="block text-gray-300 font-medium mb-2">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF] transition placeholder-gray-400"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF] transition placeholder-gray-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#6C63FF] text-white py-3 rounded-lg font-medium hover:bg-[#5149e6] hover:scale-105 transition duration-300 shadow-lg"
        >
          Login
        </button>

        <p className="mt-4 text-gray-300 text-center">
          {state === "Admin" ? (
            <>
              Doctor Login?{" "}
              <span
                className="text-[#6C63FF] underline cursor-pointer"
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{" "}
              <span
                className="text-[#6C63FF] underline cursor-pointer"
                onClick={() => setState("Admin")}
              >
                Click here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
