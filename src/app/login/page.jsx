"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardBody, Input, Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/client";
const LoginPage = () => {
  const [error, setError] = useState("");
const router = useRouter();
  const handleLogin = async(e) => {
    e.preventDefault();
    setError("");

    const form = e.target;

    // const name = form.name.value;
    const email = form.email.value;
   
    const password = form.password.value;

    // Password Validation
    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      return setError("Password must contain at least one lowercase letter.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    const user = {
    //   name,
      email,
      
      password,
    };

    console.log(user);
const { data, error } = await authClient.signIn.email({
    email: user.email, // required
    password: user.password, // required
    rememberMe: true,
    callbackURL: "/",
});
if (data) {
  router.push("/login");
}

if(error){
  alert(error.message);
}
console.log({data, error});
    // Registration Logic Here

  };

  // const handleGoogleLogin = () => {
  //   console.log("Google Login");
  // };
  const authClient = createAuthClient();

  const handleGoogleLogIn = async () => {
    await authClient.signIn.social({
      provider: "google",

    })

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg bg-slate-900/80 backdrop-blur-lg border border-slate-700 shadow-2xl">
       

          <div className="text-center mb-8">

            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white mx-auto">
              DL
            </div>

            <h1 className="text-3xl font-bold text-white mt-4">
              Login
            </h1>

            <p className="text-slate-400 mt-2">
              Welcome back! Please enter your details.
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5 space-x-5"
          >

            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="example@email.com"
              variant="bordered"
              required
            />

            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password"
              variant="bordered"
              required
            />

          

        

            <div className="text-sm text-slate-400 space-y-1">
              <p>Password must:</p>
              <ul className="list-disc list-inside">
                <li>Contain at least one uppercase letter</li>
                <li>Contain at least one lowercase letter</li>
                <li>Be at least 6 characters long</li>
              </ul>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">
                {error}
              </p>
            )}

            <Button
              type="submit"
              color="primary"
              className="w-full"
            >
                Login
            </Button>

          </form>

          <div className="flex items-center gap-3 my-6">

            <div className="flex-1 border-t border-slate-700"></div>

            <span className="text-slate-400 text-sm">
              OR
            </span>

            <div className="flex-1 border-t border-slate-700"></div>

          </div>

          <Button
            
            className="w-full btn btn-success"
            startContent={<FcGoogle size={22} />}
            onPress={handleGoogleLogIn}
          >
            Continue with Google
          </Button>

          <p className="text-center text-slate-400 mt-6">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Register
            </Link>
          </p>

      
      </Card>
    </div>
  );
}
export default LoginPage;