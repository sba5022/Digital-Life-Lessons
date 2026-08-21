"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  Button,
  Card,
  Input,
  Chip,
} from "@heroui/react";

import {
  ShieldCheck,
  Mail,
  User,
  Camera,
  Save,
  BookOpen,
  CheckCircle2,
  Star,
  Activity,
} from "lucide-react";

const UpdateProfile = () => {
  // ==============================
  // Better Auth Session
  // ==============================

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const user = session?.user;


  // ==============================
  // Form State
  // ==============================

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);


  // ==============================
  // Load Current User
  // ==============================

  useEffect(() => {
    if (!user) return;

    setName(user.name || "");
    setImage(user.image || "");
  }, [user]);


  // ==============================
  // Update Profile
  // ==============================

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setSaving(true);

      const { data, error } =
        await authClient.updateUser({
          name: name.trim(),
          image: image.trim() || undefined,
        });

      if (error) {
        console.error("UPDATE ERROR:", error);

        toast.error(
          error.message || "Failed to update profile"
        );

        return;
      }

      console.log("UPDATED USER:", data);

      toast.success(
        "Profile updated successfully!"
      );

    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong!"
      );

    } finally {
      setSaving(false);
    }
  };


  // ==============================
  // Loading
  // ==============================

  if (isPending) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">

          <div className="
            w-10
            h-10
            border-2
            border-white/20
            border-t-white
            rounded-full
            animate-spin
            mx-auto
            mb-4
          " />

          <p className="text-white/40">
            Loading profile...
          </p>

        </div>
      </main>
    );
  }


  // ==============================
  // Not Logged In
  // ==============================

  if (!user) {
    return (
      <main className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      ">

        <Card className="
          bg-zinc-950
          border
          border-white/10
          p-8
          text-center
        ">

          <ShieldCheck
            size={40}
            className="mx-auto mb-4 text-white/40"
          />

          <h2 className="text-xl font-semibold">
            Please Login
          </h2>

          <p className="text-white/40 mt-2">
            You need to login to view your profile.
          </p>

        </Card>

      </main>
    );
  }


  return (
    <main className="
      min-h-screen
      bg-black
      text-white
      px-4
      py-8
      md:px-8
      lg:px-10
    ">

      <div className="max-w-6xl mx-auto">


        {/* =========================================
            HEADER
        ========================================== */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-white
              text-black
              flex
              items-center
              justify-center
            ">
              <ShieldCheck size={21} />
            </div>

            <div>

              <p className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-white/40
              ">
                Administration
              </p>

              <h1 className="
                text-3xl
                md:text-4xl
                font-bold
              ">
                Admin Profile
              </h1>

            </div>

          </div>

          <p className="
            text-white/40
            mt-4
            max-w-xl
          ">
            Manage your administrator profile,
            account information and activity.
          </p>

        </div>


        {/* =========================================
            MAIN GRID
        ========================================== */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        ">


          {/* =====================================
              PROFILE CARD
          ====================================== */}

          <Card className="
            bg-zinc-950
            border
            border-white/10
            text-white
            p-7
            rounded-2xl
          ">

            <div className="
              flex
              flex-col
              items-center
              text-center
            ">


              {/* Avatar */}

              <div className="relative">

                <Avatar
                  src={image || undefined}
                  name={name || "Admin"}
                  className="
                    w-32
                    h-32
                    text-3xl
                    ring-4
                    ring-white/10
                  "
                />

                <div className="
                  absolute
                  bottom-1
                  right-1
                  w-9
                  h-9
                  rounded-full
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                ">
                  <Camera size={17} />
                </div>

              </div>


              {/* Name */}

              <h2 className="
                text-2xl
                font-bold
                mt-5
              ">
                {name || "Admin"}
              </h2>


              {/* Admin Badge */}

              <Chip
                color="secondary"
                variant="flat"
                startContent={
                  <ShieldCheck size={15} />
                }
                className="mt-3"
              >
                Administrator
              </Chip>


              {/* Email */}

              <div className="
                flex
                items-center
                gap-2
                text-white/40
                text-sm
                mt-4
              ">

                <Mail size={15} />

                <span>
                  {user.email}
                </span>

              </div>

            </div>


            <div className="
              h-px
              bg-white/10
              my-7
            " />


            {/* Account Information */}

            <div className="space-y-5">

              <div className="
                flex
                justify-between
                items-center
              ">

                <span className="
                  text-sm
                  text-white/40
                ">
                  Account Status
                </span>

                <span className="
                  text-xs
                  px-3
                  py-1
                  rounded-full
                  bg-emerald-500/10
                  text-emerald-400
                ">
                  Active
                </span>

              </div>


              <div className="
                flex
                justify-between
              ">

                <span className="
                  text-sm
                  text-white/40
                ">
                  Role
                </span>

                <span className="font-medium">
                  Admin
                </span>

              </div>


              <div className="
                flex
                justify-between
              ">

                <span className="
                  text-sm
                  text-white/40
                ">
                  Access
                </span>

                <span className="font-medium">
                  Full Access
                </span>

              </div>

            </div>

          </Card>


          {/* =====================================
              EDIT PROFILE
          ====================================== */}

          <Card className="
            lg:col-span-2
            bg-zinc-950
            border
            border-white/10
            text-white
            p-7
            md:p-9
            rounded-2xl
          ">


            {/* Heading */}

            <div className="
              flex
              items-center
              gap-3
              mb-8
            ">

              <div className="
                w-10
                h-10
                rounded-xl
                bg-white/5
                flex
                items-center
                justify-center
              ">
                <User size={19} />
              </div>

              <div>

                <h2 className="
                  text-xl
                  font-semibold
                ">
                  Profile Information
                </h2>

                <p className="
                  text-sm
                  text-white/40
                  mt-1
                ">
                  Update your administrator information.
                </p>

              </div>

            </div>


            <div className="space-y-6">


              {/* Name */}

              <Input
                label="Display Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                variant="bordered"
                startContent={
                  <User
                    size={17}
                    className="text-white/40"
                  />
                }
              />


              {/* Email */}

              <Input
                label="Email Address"
                value={user.email || ""}
                isReadOnly
                variant="bordered"
                startContent={
                  <Mail
                    size={17}
                    className="text-white/40"
                  />
                }
              />


              {/* Image URL */}

              <div>

                <Input
                  label="Profile Image URL"
                  placeholder="https://example.com/profile.jpg"
                  value={image}
                  onChange={(e) =>
                    setImage(e.target.value)
                  }
                  variant="bordered"
                  startContent={
                    <Camera
                      size={17}
                      className="text-white/40"
                    />
                  }
                />

                <p className="
                  text-xs
                  text-white/30
                  mt-2
                ">
                  Paste a publicly accessible image URL.
                </p>

              </div>


              {/* Image Preview */}

              {image && (
                <div className="
                  border
                  border-white/10
                  rounded-xl
                  bg-black
                  p-5
                ">

                  <p className="
                    text-sm
                    text-white/40
                    mb-4
                  ">
                    Image Preview
                  </p>

                  <div className="
                    flex
                    items-center
                    gap-5
                  ">

                    <Avatar
                      src={image}
                      name={name || "Admin"}
                      className="
                        w-20
                        h-20
                        text-xl
                      "
                    />

                    <div>

                      <p className="font-medium">
                        {name || "Admin"}
                      </p>

                      <p className="
                        text-sm
                        text-white/30
                        mt-1
                      ">
                        This image will be saved
                        to your Better Auth profile.
                      </p>

                    </div>

                  </div>

                </div>
              )}


              {/* Save */}

              <div className="
                flex
                justify-end
                pt-3
              ">

                <Button
                  onPress={handleUpdate}
                  isLoading={saving}
                  className="
                    bg-white
                    text-black
                    font-semibold
                    px-7
                    rounded-xl
                  "
                >

                  {!saving && (
                    <Save size={17} />
                  )}

                  {saving
                    ? "Saving..."
                    : "Save Changes"}

                </Button>

              </div>

            </div>

          </Card>

        </div>


        {/* =========================================
            ACTIVITY SUMMARY
        ========================================== */}

        <Card className="
          mt-6
          bg-zinc-950
          border
          border-white/10
          text-white
          p-7
          md:p-9
          rounded-2xl
        ">

          <div className="
            flex
            items-center
            gap-3
            mb-7
          ">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-white/5
              flex
              items-center
              justify-center
            ">
              <Activity size={19} />
            </div>

            <div>

              <h2 className="
                text-xl
                font-semibold
              ">
                Activity Summary
              </h2>

              <p className="
                text-sm
                text-white/40
              ">
                Overview of administrator activity.
              </p>

            </div>

          </div>


          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
          ">


            {/* Moderated */}

            <div className="
              bg-black
              border
              border-white/10
              rounded-xl
              p-5
            ">

              <div className="
                flex
                justify-between
              ">

                <div>

                  <p className="
                    text-sm
                    text-white/40
                  ">
                    Lessons Moderated
                  </p>

                  <p className="
                    text-3xl
                    font-bold
                    mt-2
                  ">
                    24
                  </p>

                </div>

                <BookOpen
                  size={20}
                  className="text-white/30"
                />

              </div>

            </div>


            {/* Reviewed */}

            <div className="
              bg-black
              border
              border-white/10
              rounded-xl
              p-5
            ">

              <div className="
                flex
                justify-between
              ">

                <div>

                  <p className="
                    text-sm
                    text-white/40
                  ">
                    Reviewed
                  </p>

                  <p className="
                    text-3xl
                    font-bold
                    mt-2
                  ">
                    18
                  </p>

                </div>

                <CheckCircle2
                  size={20}
                  className="text-white/30"
                />

              </div>

            </div>


            {/* Featured */}

            <div className="
              bg-black
              border
              border-white/10
              rounded-xl
              p-5
            ">

              <div className="
                flex
                justify-between
              ">

                <div>

                  <p className="
                    text-sm
                    text-white/40
                  ">
                    Featured
                  </p>

                  <p className="
                    text-3xl
                    font-bold
                    mt-2
                  ">
                    7
                  </p>

                </div>

                <Star
                  size={20}
                  className="text-white/30"
                />

              </div>

            </div>


            {/* Actions */}

            <div className="
              bg-black
              border
              border-white/10
              rounded-xl
              p-5
            ">

              <div className="
                flex
                justify-between
              ">

                <div>

                  <p className="
                    text-sm
                    text-white/40
                  ">
                    Total Actions
                  </p>

                  <p className="
                    text-3xl
                    font-bold
                    mt-2
                  ">
                    49
                  </p>

                </div>

                <Activity
                  size={20}
                  className="text-white/30"
                />

              </div>

            </div>

          </div>

        </Card>


      </div>

    </main>
  );
};

export default UpdateProfile;