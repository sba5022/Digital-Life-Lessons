// "use client";
// import { authClient } from "@/lib/auth-client";
// import { useState } from "react";
// import Link from "next/link";
// import { Card, CardBody, Input, Button } from "@heroui/react";
// import { FcGoogle } from "react-icons/fc";
// import { useRouter } from "next/navigation";
// import { createAuthClient } from "better-auth/client";
// const LoginPage = () => {
//   const [error, setError] = useState("");
// const router = useRouter();
//   const handleLogin = async(e) => {
//     e.preventDefault();
//     setError("");

//     const form = e.target;

//     // const name = form.name.value;
//     const email = form.email.value;
   
//     const password = form.password.value;

//     // Password Validation
//     if (!/[A-Z]/.test(password)) {
//       return setError("Password must contain at least one uppercase letter.");
//     }

//     if (!/[a-z]/.test(password)) {
//       return setError("Password must contain at least one lowercase letter.");
//     }

//     if (password.length < 6) {
//       return setError("Password must be at least 6 characters long.");
//     }

//     const user = {
//     //   name,
//       email,
      
//       password,
//     };

//     console.log(user);
// const { data, error } = await authClient.signIn.email({
//     email: user.email, // required
//     password: user.password, // required
//     rememberMe: true,
//     callbackURL: "/",
// });
// if (data) {
//   router.push("/login");
// }

// if(error){
//   alert(error.message);
// }
// console.log({data, error});
//     // Registration Logic Here

//   };

//   // const handleGoogleLogin = () => {
//   //   console.log("Google Login");
//   // };
//   const authClient = createAuthClient();

//   const handleGoogleLogIn = async () => {
//     await authClient.signIn.social({
//       provider: "google",

//     })

//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-10">
//       <Card className="w-full max-w-lg bg-slate-900/80 backdrop-blur-lg border border-slate-700 shadow-2xl">
       

//           <div className="text-center mb-8">

//             <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white mx-auto">
//               DL
//             </div>

//             <h1 className="text-3xl font-bold text-white mt-4">
//               Login
//             </h1>

//             <p className="text-slate-400 mt-2">
//               Welcome back! Please enter your details.
//             </p>

//           </div>

//           <form
//             onSubmit={handleLogin}
//             className="space-y-5 space-x-5"
//           >

//             <Input
//               name="email"
//               label="Email"
//               type="email"
//               placeholder="example@email.com"
//               variant="bordered"
//               required
//             />

//             <Input
//               name="password"
//               label="Password"
//               type="password"
//               placeholder="Enter password"
//               variant="bordered"
//               required
//             />

          

        

//             <div className="text-sm text-slate-400 space-y-1">
//               <p>Password must:</p>
//               <ul className="list-disc list-inside">
//                 <li>Contain at least one uppercase letter</li>
//                 <li>Contain at least one lowercase letter</li>
//                 <li>Be at least 6 characters long</li>
//               </ul>
//             </div>

//             {error && (
//               <p className="text-red-500 text-sm font-medium">
//                 {error}
//               </p>
//             )}

//             <Button
//               type="submit"
//               color="primary"
//               className="w-full"
//             >
//                 Login
//             </Button>

//           </form>

//           <div className="flex items-center gap-3 my-6">

//             <div className="flex-1 border-t border-slate-700"></div>

//             <span className="text-slate-400 text-sm">
//               OR
//             </span>

//             <div className="flex-1 border-t border-slate-700"></div>

//           </div>

//           <Button
            
//             className="w-full btn btn-success"
//             startContent={<FcGoogle size={22} />}
//             onPress={handleGoogleLogIn}
//           >
//             Continue with Google
//           </Button>

//           <p className="text-center text-slate-400 mt-6">
//             Do not have an account?{" "}
//             <Link
//               href="/register"
//               className="text-indigo-400 hover:text-indigo-300 font-semibold"
//             >
//               Register
//             </Link>
//           </p>

      
//       </Card>
//     </div>
//   );
// }
// export default LoginPage;
"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { Card, Input, Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    if (!/[A-Z]/.test(password)) {
      setError(
        "Password must contain at least one uppercase letter."
      );
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError(
        "Password must contain at least one lowercase letter."
      );
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      setLoading(false);
      return;
    }

    try {
      const { data, error } =
        await authClient.signIn.email({
          email,
          password,
          rememberMe: true,
          callbackURL: "/",
        });

      if (error) {
        setError(error.message);
        return;
      }

      if (data) {
        router.push("/");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex">


      <section className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="w-full max-w-md"
        >

          {/* Logo */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            className="mb-10"
          >
            <div className="w-14 h-14 bg-white text-black flex items-center justify-center text-xl font-bold">
              DL
            </div>
          </motion.div>

          {/* Heading */}
          <div className="mb-8">

            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Digital Life Lessons
            </p>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Welcome
              <span className="text-white/40"> back.</span>
            </h1>

            <p className="text-white/40 mt-4">
              Continue your journey of learning,
              reflecting and growing.
            </p>

          </div>

       
          <Card
            radius="none"
            className="
              bg-[#080808]
              border
              border-white/10
              p-6
              md:p-8
              shadow-2xl
            "
          >

            <form
              onSubmit={handleLogin}
              className="space-y-6"
            >

              {/* Email */}
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="example@email.com"
                variant="bordered"
                isRequired
                classNames={{
                  input: "text-white",
                  label: "text-white/60",
                  inputWrapper:
                    "border-white/10 hover:border-white/30",
                }}
              />

              {/* Password */}
              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                variant="bordered"
                isRequired
                classNames={{
                  input: "text-white",
                  label: "text-white/60",
                  inputWrapper:
                    "border-white/10 hover:border-white/30",
                }}
              />

              {/* Password info */}
              <div className="text-xs text-white/30 space-y-1">
                <p>Password must contain:</p>

                <p>• At least one uppercase letter</p>
                <p>• At least one lowercase letter</p>
                <p>• At least 6 characters</p>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    border
                    border-red-500/20
                    bg-red-500/10
                    text-red-400
                    p-3
                    text-sm
                  "
                >
                  {error}
                </motion.div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                isLoading={loading}
                className="
                  w-full
                  bg-white
                  text-black
                  font-semibold
                  h-12
                  hover:bg-white/90
                  transition-all
                "
                radius="none"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-7">

              <div className="flex-1 h-px bg-white/10" />

              <span className="text-xs text-white/30">
                OR
              </span>

              <div className="flex-1 h-px bg-white/10" />

            </div>

            {/* Google */}
            <Button
              onPress={handleGoogleLogin}
              className="
                w-full
                h-12
                bg-transparent
                border
                border-white/10
                text-white
                hover:bg-white/5
              "
              radius="none"
              startContent={<FcGoogle size={20} />}
            >
              Continue with Google
            </Button>

            {/* Register */}
            <p className="text-center text-sm text-white/40 mt-7">

              Don't have an account?{" "}

              <Link
                href="/register"
                className="
                  text-white
                  font-semibold
                  hover:text-white/60
                  transition
                "
              >
                Create one
              </Link>

            </p>

          </Card>

        
          <p className="text-center text-xs text-white/20 mt-8">
            Learn from yesterday. Build a better tomorrow.
          </p>

        </motion.div>

      </section>


     

      <section className="hidden lg:block lg:w-1/2 relative overflow-hidden">

      
        <motion.img
          src="https://i.ibb.co.com/rRNV7844/Screenshot-2026-08-15-at-9-13-13-AM.png"
          alt="Life lessons and personal growth"
          initial={{
            scale: 1.15,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/20
            to-transparent
          "
        />

        {/* Content */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.9,
          }}
          className="
            absolute
            bottom-16
            left-12
            right-12
          "
        >

          <p className="
            uppercase
            tracking-[0.4em]
            text-xs
            text-white/50
            mb-5
          ">
            Reflect · Learn · Grow
          </p>

          <h2 className="
            text-5xl
            xl:text-6xl
            font-bold
            leading-tight
            max-w-xl
          ">
            Every experience
            <br />
            leaves a lesson.
          </h2>

          <p className="
            mt-6
            text-white/60
            max-w-lg
            leading-7
          ">
            Your experiences shape who you are.
            Preserve the lessons, share your wisdom,
            and inspire someone else's journey.
          </p>

          {/* Animated line */}
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: "120px",
            }}
            transition={{
              delay: 1,
              duration: 0.8,
            }}
            className="
              h-[2px]
              bg-white
              mt-8
            "
          />

        </motion.div>

        {/* Floating quote */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            top-12
            right-12
            border
            border-white/20
            bg-black/30
            backdrop-blur-md
            px-5
            py-3
          "
        >
          <p className="text-xs text-white/70">
            "Growth begins with reflection."
          </p>
        </motion.div>

      </section>

    </main>
  );
}