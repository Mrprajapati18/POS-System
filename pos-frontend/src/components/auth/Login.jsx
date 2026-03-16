// import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query"
// import { login } from "../../https/index"
// import { enqueueSnackbar } from "notistack";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../redux/slices/userSlice";
// import { useNavigate } from "react-router-dom";
 
// const Login = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const[formData, setFormData] = useState({
//       email: "",
//       password: "",
//     });
  
//     const handleChange = (e) => {
//       setFormData({...formData, [e.target.name]: e.target.value});
//     }

  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       loginMutation.mutate(formData);
//     }

//     const loginMutation = useMutation({
//       mutationFn: (reqData) => login(reqData),
//       onSuccess: (res) => {
//           const { data } = res;
//           console.log(data);
//           const { _id, name, email, phone, role } = data.data;
//           dispatch(setUser({ _id, name, email, phone, role }));
//           navigate("/");
//       },
//       onError: (error) => {
//         const { response } = error;
//         enqueueSnackbar(response.data.message, { variant: "error" });
//       }
//     })

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
//             Company Email
//           </label>
//           <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter Company email"
//               className="bg-transparent flex-1 text-white focus:outline-none"
//               required
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
//             Password
//           </label>
//           <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter password"
//               className="bg-transparent flex-1 text-white focus:outline-none"
//               required
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
//         >
//           Sign in
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

 
  const loginMutation = useMutation({
    mutationFn: (reqData) => login(reqData),
    onSuccess: (res) => {
      const { data } = res;
      const { _id, name, email, phone, role } = data.data;
      dispatch(setUser({ _id, name, email, phone, role }));
      navigate("/");
    },
    onError: (error) => {
      const { response } = error;
      enqueueSnackbar(response.data.message, { variant: "error" });
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Company Email
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Company email"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Password
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 cursor-pointer"
              id="rememberMe"
            />
            <label
              className="ml-2 text-[#ababab] text-sm font-medium cursor-pointer"
              htmlFor="rememberMe"
            >
              Remember me
            </label>
          </div>
          <a href="#" className="text-[#ababab] text-sm font-medium">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;