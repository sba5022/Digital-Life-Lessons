"use client";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardBody, Input, Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
//  import { createAuthClient } from "better-auth/client";
const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [role, setRole] = useState("user");
  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: "Sumaia",
  //       email: "sumaia@example.com",
  //       isPremium: false,
  //     }),
  //   });

  //   const datat = await res.json();
  //   console.log(datat);
  //   const form = e.target;

  //   const name = form.name.value;
  //   const email = form.email.value;
  //   const photo = form.photo.value;
  //   const password = form.password.value;
  //   const plan = role === "user" ? "user_free" : "admin_free"; // Set plan based on role

  //   // Password Validation
  //   if (!/[A-Z]/.test(password)) {
  //     return setError("Password must contain at least one uppercase letter.");
  //   }

  //   if (!/[a-z]/.test(password)) {
  //     return setError("Password must contain at least one lowercase letter.");
  //   }

  //   if (password.length < 6) {
  //     return setError("Password must be at least 6 characters long.");
  //   }

  //   const user = {
  //     name,
  //     email,
  //     photo,
  //     password,
  //     role: role,
  //     plan
  //   };

  //   console.log(user);
  //   const { data, error } = await authClient.signUp.email({
  //     name: user.name, // required
  //     email: user.email, // required
  //     password: user.password, // required
  //     image: user.photo,
  //     role: user.role,
  //     plan: user.plan

  //   });

  //   if (data) {
  //     router.push("/login");
  //   }

  //   if (error) {
  //     alert(error.message);
  //   }
  //   console.log({ data, error });

  //   // Registration Logic Here
  // };
  // const authClient = createAuthClient();
  const handleRegister = async (e) => {
  e.preventDefault();
  setError("");

  const form = e.target;

  const name = form.name.value;
  const email = form.email.value;
  const photo = form.photo.value;
  const password = form.password.value;

  const plan = role === "user" ? "user_free" : "admin_free";

  // Password validation
  if (!/[A-Z]/.test(password)) {
    return setError(
      "Password must contain at least one uppercase letter."
    );
  }

  if (!/[a-z]/.test(password)) {
    return setError(
      "Password must contain at least one lowercase letter."
    );
  }

  if (password.length < 6) {
    return setError(
      "Password must be at least 6 characters long."
    );
  }

  // First create account with Better Auth
  const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
    image: photo,
    
  });

  if (error) {
    console.error("Better Auth error:", error);
    setError(error.message);
    return;
  }

  console.log("Better Auth user:", data);

  // Then save your custom user information
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          photo,
          role,
          plan,
          isPremium: false,
        }),
      }
    );

    const result = await res.json();

    console.log("MongoDB response:", result);

    if (!res.ok) {
      throw new Error(result.message || "Failed to save user");
    }

    router.push("/login");

  } catch (err) {
    console.error("User MongoDB error:", err);
    setError("Account created, but user data could not be saved.");
  }
};
  const handleGoogleRegister = async () => {
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
            Create Account
          </h1>

          <p className="text-slate-400 mt-2">
            Join Digital Life Lessons today.
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-5 space-x-5"
        >

          <Input
            name="name"
            label="Name"
            type="text"
            placeholder="Name"
            variant="bordered"
            required
          />

          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="example@email.com"
            variant="bordered"
            required
          />

          <Input
            name="photo"
            label="Photo URL"
            type="url"
            placeholder="https://example.com/photo.jpg"
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
          <div className="flex flex-col gap-4">
            <Label className="text-white">Subscription plan</Label>
            <RadioGroup defaultValue="user" name="plan-orientation" onChange={(value) => setRole(value)}
              orientation="horizontal">
              <Radio value="admin">
                <Radio.Content className="text-white">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Admin
                </Radio.Content>

              </Radio>
              <Radio selected value="user">
                <Radio.Content className="text-white">
                  <Radio.Control >
                    <Radio.Indicator />
                  </Radio.Control>
                  User
                </Radio.Content>

              </Radio>


            </RadioGroup>
          </div>
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
            Register
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
          onPress={handleGoogleRegister}
        >
          Continue with Google
        </Button>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Login
          </Link>
        </p>


      </Card>
    </div>
  );
}
export default RegisterPage;