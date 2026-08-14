// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// function Register() {
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//         role: "customer"
//     });

//   const handleRegister = async () => {
//     await axios.post("http://localhost:5000/api/auth/register", form);
//     alert("Account created!");
//   };

//   return (
//   <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

//     {/* 🌌 BACKGROUND SAME AS HOME */}
//     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500 opacity-20 blur-3xl rounded-full z-0"></div>
//     <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full z-0"></div>

//     {/* 🔥 CARD */}
//     <div className="relative z-10 bg-black/80 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-2xl">

//       <h2 className="text-3xl text-center text-white mb-2">
//         Create Account
//       </h2>

//       <p className="text-gray-400 text-center mb-6">
//         Join our platform
//       </p>

//       <input
//         placeholder="Name"
//         className="w-full p-3 mb-3 rounded-full bg-gray-800 text-white outline-none"
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />

//       <input
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

//       <select
//         className="w-full p-3 mb-4 rounded-full bg-gray-800 text-white outline-none"
//         onChange={(e) => setForm({ ...form, role: e.target.value })}
//       >
//         <option value="customer">Customer</option>
//         <option value="worker">Worker</option>
//       </select>

//       <button
//         onClick={handleRegister}
//         className="w-full py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold"
//       >
//         Sign Up
//       </button>

//       <p className="text-center text-gray-400 mt-6 text-sm">
//         Already have an account?
//         <span
//           onClick={() => navigate("/login")}
//           className="text-blue-400 ml-2 cursor-pointer"
//         >
//           Login
//         </span>
//       </p>

//     </div>
//   </div>
// );
// }

// export default Register;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      // 🔴 validation
      if (!form.name || !form.email || !form.password) {
        toast.warning("⚠️ Please fill all fields");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      toast.success("Account created successfully 🚀");

      // 👉 redirect to login
      navigate("/login");

    } catch (err) {
      console.log(err.response?.data);

      toast.error(
        err.response?.data?.message || "Registration failed ❌"
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
          Create Account
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Join our platform
        </p>

        <input
          placeholder="Name"
          className="w-full p-3 mb-3 rounded-full bg-gray-800 text-white outline-none"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <select
          className="w-full p-3 mb-4 rounded-full bg-gray-800 text-white outline-none"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="customer">Customer</option>
          <option value="worker">Worker</option>
        </select>

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-3 rounded-full font-semibold transition ${
            loading
              ? "bg-gray-500"
              : "bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90"
          }`}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 ml-2 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;