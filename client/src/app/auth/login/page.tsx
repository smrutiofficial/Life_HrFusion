"use client";

import { useState,useEffect } from "react";
import axios from "axios";
// import Bg from "../../image/work.png";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {backend_link} from "@/app/constants/constant";
import Preloader from "@/app/components/preload.comp";

export default function Login() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect if token exists
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/");
      }
    }
  }, [router]);


  const handleLogin = async (e: React.FormEvent) => {
    
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_link}/user/login`,
        { email, password },
        { withCredentials: true } // Ensure cookies are included
      );
      localStorage.setItem("token", response.data.token);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
<>
{loading ? (
        <Preloader />
      ) : (

        <>
        <div>
          <div className="flex flex-row">
            <div className="w-1/2 h-[100vh] overflow-hidden bg-[#10121f] flex justify-center items-center">
              {/* image  */}
              {/* <Image src="" alt="bg-image" className="h-full w-full object-cover"></Image> */}
            </div>
            <div className="w-1/2 flex flex-col justify-center bg-[#1D2135]">
              <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold pb-6">
                  Life <span className="text-[#897EEF]"> Hrfusion</span>
                </h1>
                <p className="text-[2.8rem] font-medium">Welcome Back</p>
                <p className="text-[1.2rem]">Please login to your account</p>
              </div>
              <div className="flex items-center justify-center mt-8">
                <form
                  className="flex flex-col w-1/2 gap-4"
                  onSubmit={handleLogin}
                >
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input py-3 px-4 rounded-lg bg-[#272B43] text-gray-200"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input py-3 px-4 rounded-lg bg-[#272B43] text-gray-200"
                  />
                  <p className="flex items-center justify-center text-gray-400 font-medium">
                    Forgot Password?
                  </p>
                  <button
                    type="submit"
                    className="py-3 px-4 rounded-lg bg-[#897EEF] text-[#272B43] font-medium"
                  >
                    Login
                  </button>
                  <p className="flex items-center justify-center text-gray-400 text-sm font-medium mt-8">
                    Or Continue With
                  </p>
                  <button
                    type="submit"
                    className="py-3 px-4 rounded-lg bg-[#db5a5e] text-white font-medium"
                  >
                    Sign with Google
                  </button>
                  <p className="flex items-center justify-center text-gray-300 font-medium mt-4">
                    Don&apos;t have an account ?&nbsp;
                    <span className="text-[#897EEF]">
                      <Link href="/auth/register">Register</Link>
                    </span>
                  </p>
  
                  {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
      )}
</>

  );
}