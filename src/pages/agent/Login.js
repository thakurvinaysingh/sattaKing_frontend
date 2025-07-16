import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function AgentLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ UserName: "", Password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await axios.post("/api/users/login", form);
      if (res.data.success && res.data.user?.userType === "agent") {
        login({ ...res.data.user, token: res.data.token });
        navigate("/agent/dashboard");
      } else {
        setError("Not authorized or not an agent");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4E7584] via-[#63B0CD] to-[#4E7584]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col gap-5 animate-fade-in"
        autoComplete="off"
      >
        <h2 className="text-3xl font-bold text-center text-[#4E7584] mb-2 tracking-tight">
          Agent Login
        </h2>
        <p className="text-center text-[#63B0CD] mb-2 text-base">
          Sign in to manage your Ghadi results
        </p>
        <div className="flex flex-col gap-2">
          <label className="text-[#4E7584] font-medium" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="px-4 py-3 border border-[#63B0CD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#63B0CD] text-[#4E7584] font-semibold transition"
            type="text"
            placeholder="Enter username"
            value={form.UserName}
            autoFocus
            onChange={e => setForm({ ...form, UserName: e.target.value })}
            disabled={loading}
            required
          />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label className="text-[#4E7584] font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="px-4 py-3 border border-[#63B0CD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#63B0CD] text-[#4E7584] font-semibold pr-12 transition"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={form.Password}
            onChange={e => setForm({ ...form, Password: e.target.value })}
            disabled={loading}
            required
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-3 top-9 text-[#4E7584] hover:text-[#63B0CD] transition"
            onClick={() => setShowPassword(s => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Eye-off SVG
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.054.162-2.065.464-3.019m1.33-2.063a10.024 10.024 0 013.857-2.239m6.288 0A10.054 10.054 0 0121.475 5.98m.464 3.02a9.982 9.982 0 01-1.225 6.179m-1.329 2.061a10.024 10.024 0 01-3.858 2.241m-6.287 0A10.05 10.05 0 012.525 18.02m-.464-3.02A9.982 9.982 0 013.287 8.821" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 01-3 3m0-6a3 3 0 013 3m0 0a3 3 0 00-3 3m0-6a3 3 0 00-3 3" />
              </svg>
            ) : (
              // Eye SVG
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
                <circle cx={12} cy={12} r={3} />
              </svg>
            )}
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-xl text-center font-medium transition mb-2">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full bg-[#63B0CD] hover:bg-[#4E7584] transition text-white font-bold py-3 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span>
              <svg className="inline w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}

// import React, { useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios";

// export default function AgentLogin() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ UserName: "", Password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError(""); setLoading(true);
//     try {
//       const res = await axios.post("/api/users/login", form);
//       if (res.data.success && res.data.user?.userType === "agent") {
        
//        console.log(res.data)
//         login({ ...res.data.user, token: res.data.token });
//         navigate("/agent/dashboard");
//       } else {
//         setError("Not authorized or not an agent");
//       }
      
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-blue-50">
//       <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-8 w-full max-w-xs">
//         <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Agent Login</h2>
//         <input
//           className="mb-3 px-3 py-2 w-full border rounded"
//           type="text"
//           placeholder="Username"
//           value={form.UserName}
//           autoFocus
//           onChange={e => setForm({ ...form, UserName: e.target.value })}
//         />
//         <input
//           className="mb-3 px-3 py-2 w-full border rounded"
//           type="password"
//           placeholder="Password"
//           value={form.Password}
//           onChange={e => setForm({ ...form, Password: e.target.value })}
//         />
//         {error && <div className="text-red-500 mb-2">{error}</div>}
//         <button type="submit" disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }

