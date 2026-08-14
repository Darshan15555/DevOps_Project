// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//     const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleLogin = async () => {
//     const res = await axios.post("http://localhost:5000/api/auth/login", form);
//     localStorage.setItem("user", JSON.stringify(res.data));
//     window.location.href = "/search";
//   };

//   return (
//   <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

//     {/* 🌌 BACKGROUND SAME AS HOME */}
//     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500 opacity-20 blur-3xl rounded-full z-0"></div>
//     <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full z-0"></div>

//     {/* 🔥 CARD */}
//     <div className="relative z-10 bg-black/80 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-2xl">

//       <h2 className="text-3xl text-center text-white mb-2">
//         Welcome Back
//       </h2>

//       <p className="text-gray-400 text-center mb-6">
//         Login to your account
//       </p>

//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full p-3 mb-3 rounded-full bg-gray-800 text-white outline-none"
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full p-3 mb-4 rounded-full bg-gray-800 text-white outline-none"
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />

//       <button
//         onClick={handleLogin}
//         className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
//       >
//         Login
//       </button>

//       <p className="text-center text-gray-400 mt-6 text-sm">
//         Don’t have an account?
//         <span
//           onClick={() => navigate("/register")}
//           className="text-blue-400 ml-2 cursor-pointer"
//         >
//           Sign Up
//         </span>
//       </p>

//     </div>
//   </div>
// );
// }

// export default Login;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      // 🔴 validation
      if (!form.email || !form.password) {
        toast.warning("⚠️ Please fill all fields");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password
        }
      );

      // ✅ save user
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Login successful 🚀");

      // ✅ navigate properly
      navigate("/search");

    } catch (err) {
      console.log(err.response?.data);

      // 🔥 show backend error
      toast.error(
        err.response?.data?.message || "Login failed ❌"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      {/* 🌌 BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500 opacity-20 blur-3xl rounded-full z-0"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full z-0"></div>

      {/* 🔥 CARD */}
      <div className="relative z-10 bg-black/80 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-2xl">

        <h2 className="text-3xl text-center text-white mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Login to your account
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded-full bg-gray-800 text-white outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-full bg-gray-800 text-white outline-none"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-full font-semibold transition ${
            loading
              ? "bg-gray-500"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don’t have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 ml-2 cursor-pointer"
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;