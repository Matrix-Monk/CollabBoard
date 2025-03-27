"use client";

import React, { useEffect, useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface AuthPageProps {
  mode: "signin" | "signup";
}

const AuthPage = ({mode}: AuthPageProps) => {
    
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
      
      if (mode === "signup") {
        
          useEffect(() => {
              
              setIsLoading(true);
             
              axios
            
          }, [])
          
    }
      
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    if (mode === "signin") {
      router.push("/signup");
    } else {
      router.push("/signin");
    }
  };

   return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
         <div className="text-center">
           <h2 className="text-3xl font-bold text-gray-900">
             {mode === "signin" ? "Welcome Back" : "Create Account"}
           </h2>
           <p className="mt-2 text-sm text-gray-600">
             {mode === "signin"
               ? "Sign in to access your account"
               : "Sign up to get started"}
           </p>
         </div>

         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
           {mode === "signup" && (
             <div className="relative">
               <label htmlFor="name" className="sr-only">
                 Full Name
               </label>
               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
               <input
                 id="name"
                 name="name"
                 type="text"
                 required={mode === "signup"}
                 value={formData.name}
                 onChange={handleChange}
                 className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                 placeholder="Full Name"
               />
             </div>
           )}

           <div className="relative">
             <label htmlFor="email" className="sr-only">
               Email address
             </label>
             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
             <input
               id="email"
               name="email"
               type="email"
               required
               value={formData.email}
               onChange={handleChange}
               className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
               placeholder="Email address"
             />
           </div>

           <div className="relative">
             <label htmlFor="password" className="sr-only">
               Password
             </label>
             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
             <input
               id="password"
               name="password"
               type="password"
               required
               value={formData.password}
               onChange={handleChange}
               className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
               placeholder="Password"
             />
           </div>

           <div>
             <button
               type="submit"
               className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
             >
               <span className="absolute right-3 inset-y-0 flex items-center">
                 <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
               </span>
               {mode === "signin" ? "Sign In" : "Sign Up"}
             </button>
           </div>
         </form>

         <div className="text-center">
           <button
             onClick={toggleMode}
             className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
           >
             {mode === "signin"
               ? "Don't have an account? Sign Up"
               : "Already have an account? Sign In"}
           </button>
         </div>
       </div>
     </div>
   );
};

export default AuthPage;
