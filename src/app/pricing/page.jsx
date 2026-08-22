"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Button, Chip } from "@heroui/react";
import {
  Check,
  X,
  Crown,
  Sparkles,
  ShieldCheck,
  Zap,
  Infinity,
} from "lucide-react";

const comparisonData = [
  {
    feature: "Create life lessons",
    free: "5 lessons",
    premium: "Unlimited",
  },
  {
    feature: "Premium lesson creation",
    free: false,
    premium: true,
  },
  {
    feature: "Ad-free experience",
    free: false,
    premium: true,
  },
  {
    feature: "Priority listing in public lessons",
    free: false,
    premium: true,
  },
  {
    feature: "Access to premium content",
    free: false,
    premium: true,
  },
  {
    feature: "Community badge",
    free: false,
    premium: true,
  },
  {
    feature: "Verified Premium status",
    free: false,
    premium: true,
  },
  {
    feature: "Lifetime access",
    free: false,
    premium: true,
  },
];

export default function PricingPage() {
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = session?.user;

  // Change this if your Better Auth user field
  // is named differently.
  const isPremium =
    user?.isPremium === true ||
    user?.plan === "Premium";

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to start payment."
        );
      }

      if (!data.url) {
        throw new Error(
          "Stripe Checkout URL was not returned."
        );
      }

      // Redirect user to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("UPGRADE ERROR:", error);

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="loading loading-spinner loading-lg" />
          <p className="text-default-500">
            Loading pricing...
          </p>
        </div>
      </div>
    );
  }

  // Only logged-in users can access pricing
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card className="max-w-md w-full p-8 text-center">
          <ShieldCheck
            size={48}
            className="mx-auto mb-4 text-primary"
          />

          <h1 className="text-2xl font-bold">
            Login Required
          </h1>

          <p className="text-default-500 mt-3">
            Please login to view the Premium upgrade plan.
          </p>
        </Card>
      </div>
    );
  }

  // Premium users don't need the pricing page
  if (isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card className="max-w-lg w-full p-8 text-center border border-success-200">
          <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-warning-100 flex items-center justify-center">
            <Crown
              size={32}
              className="text-warning-500"
            />
          </div>

          <Chip
            color="warning"
            variant="flat"
            startContent={<Sparkles size={15} />}
          >
            Premium ⭐
          </Chip>

          <h1 className="text-3xl font-bold mt-5">
            You are already Premium!
          </h1>

          <p className="text-default-500 mt-3">
            You already have lifetime access to all Premium
            features.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">

          <div className="flex justify-center mb-5">
            <Chip
              color="warning"
              variant="flat"
              startContent={<Crown size={16} />}
            >
              Premium Membership
            </Chip>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Unlock the full
            <span className="text-primary">
              {" "}Life Lessons
            </span>
            {" "}experience.
          </h1>

          <p className="text-default-500 mt-5 text-lg">
            Share more lessons, access premium stories,
            and enjoy the community without limitations.
          </p>
        </div>

        {/* Pricing card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

          {/* Free */}
          <Card className="p-7 border border-default-200">

            <p className="text-sm font-semibold uppercase tracking-widest text-default-500">
              Free
            </p>

            <h2 className="text-3xl font-bold mt-3">
              ৳0
            </h2>

            <p className="text-default-500 mt-2">
              Get started with the essential features.
            </p>

            <div className="mt-8 space-y-4">

              <Feature text="Create up to 5 lessons" />

              <Feature
                text="Basic community access"
              />

              <Feature
                text="Public lesson sharing"
              />

              <Feature
                text="Standard listing"
              />

              <Feature
                text="Advertisements"
                included={false}
              />

              <Feature
                text="Premium content"
                included={false}
              />

            </div>
          </Card>

          {/* Premium */}
          <Card className="relative p-7 border-2 border-primary shadow-xl lg:scale-105">

            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Chip
                color="primary"
                variant="solid"
                startContent={<Sparkles size={15} />}
              >
                RECOMMENDED
              </Chip>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Crown
                size={22}
                className="text-warning-500"
              />

              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Premium
              </p>
            </div>

            <div className="flex items-end gap-2 mt-3">
              <h2 className="text-4xl font-bold">
                ৳1500
              </h2>

              <span className="text-default-500 mb-1">
                lifetime
              </span>
            </div>

            <p className="text-default-500 mt-2">
              One-time payment. No monthly subscription.
            </p>

            <div className="mt-8 space-y-4">

              <Feature
                text="Unlimited life lessons"
              />

              <Feature
                text="Create Premium lessons"
              />

              <Feature
                text="Ad-free experience"
              />

              <Feature
                text="Priority public listing"
              />

              <Feature
                text="Access Premium content"
              />

              <Feature
                text="Premium community badge"
              />

              <Feature
                text="Verified Premium status"
              />

              <Feature
                text="Lifetime access"
              />

            </div>

            {error && (
              <div className="mt-6 p-3 rounded-lg bg-danger-50 border border-danger-200 text-danger text-sm">
                {error}
              </div>
            )}

            <Button
              color="primary"
              size="lg"
              radius="lg"
              className="w-full mt-8 font-semibold"
              isLoading={loading}
              onPress={handleUpgrade}
              startContent={
                !loading && <Crown size={19} />
              }
            >
              {loading
                ? "Redirecting..."
                : "Upgrade to Premium"}
            </Button>

            <p className="text-center text-xs text-default-400 mt-4">
              Secure payment powered by Stripe
            </p>

          </Card>

          {/* Benefits */}
          <Card className="p-7 border border-default-200">

            <p className="text-sm font-semibold uppercase tracking-widest text-default-500">
              Why Premium?
            </p>

            <h2 className="text-3xl font-bold mt-3">
              More ways to grow.
            </h2>

            <p className="text-default-500 mt-3">
              Premium is designed for people who want to
              share more and discover more.
            </p>

            <div className="mt-8 space-y-6">

              <Benefit
                icon={<Infinity size={20} />}
                title="Unlimited sharing"
                description="Create and share as many life lessons as you want."
              />

              <Benefit
                icon={<Zap size={20} />}
                title="Priority visibility"
                description="Your public lessons can receive priority placement."
              />

              <Benefit
                icon={<Crown size={20} />}
                title="Premium community"
                description="Stand out with a Premium badge and verified status."
              />

              <Benefit
                icon={<ShieldCheck size={20} />}
                title="Lifetime access"
                description="Pay once and keep Premium access."
              />

            </div>

          </Card>
        </div>

        {/* Comparison */}
        <section className="mt-20">

          <div className="text-center mb-8">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">
              Compare Plans
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Free vs Premium
            </h2>

            <p className="text-default-500 mt-3">
              Everything you get when you upgrade.
            </p>
          </div>

          <Card className="overflow-hidden border border-default-200">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>
                  <tr className="border-b border-default-200">
                    <th className="text-left p-5 font-semibold">
                      Feature
                    </th>

                    <th className="text-center p-5 font-semibold">
                      Free
                    </th>

                    <th className="text-center p-5 font-semibold text-primary">
                      Premium ⭐
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {comparisonData.map(
                    (item, index) => (
                      <tr
                        key={item.feature}
                        className={
                          index !==
                          comparisonData.length - 1
                            ? "border-b border-default-100"
                            : ""
                        }
                      >

                        <td className="p-5 font-medium">
                          {item.feature}
                        </td>

                        <td className="p-5 text-center">
                          <ComparisonValue
                            value={item.free}
                          />
                        </td>

                        <td className="p-5 text-center">
                          <ComparisonValue
                            value={item.premium}
                            premium
                          />
                        </td>

                      </tr>
                    )
                  )}

                </tbody>
              </table>

            </div>
          </Card>
        </section>

        {/* Bottom CTA */}
        <section className="mt-16">
          <Card className="p-8 md:p-12 bg-primary text-primary-foreground text-center">

            <Crown
              size={40}
              className="mx-auto mb-5"
            />

            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to become Premium?
            </h2>

            <p className="mt-3 opacity-80 max-w-xl mx-auto">
              One payment of ৳1500 gives you lifetime
              Premium access.
            </p>

            <Button
              size="lg"
              radius="lg"
              className="mt-7 bg-white text-primary font-semibold"
              onPress={handleUpgrade}
              isLoading={loading}
            >
              {loading
                ? "Redirecting..."
                : "Choose Premium Plan"}
            </Button>

          </Card>
        </section>

      </div>
    </main>
  );
}


/* ----------------------------- */
/* Small Components              */
/* ----------------------------- */

function Feature({
  text,
  included = true,
}) {
  return (
    <div className="flex items-center gap-3">
      {included ? (
        <Check
          size={18}
          className="text-success-500 shrink-0"
        />
      ) : (
        <X
          size={18}
          className="text-danger-400 shrink-0"
        />
      )}

      <span
        className={
          included
            ? "text-default-700"
            : "text-default-400"
        }
      >
        {text}
      </span>
    </div>
  );
}


function Benefit({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex gap-4">

      <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-default-500 mt-1">
          {description}
        </p>
      </div>

    </div>
  );
}


function ComparisonValue({
  value,
  premium = false,
}) {
  if (value === true) {
    return (
      <Check
        size={20}
        className={`mx-auto ${
          premium
            ? "text-primary"
            : "text-success-500"
        }`}
      />
    );
  }

  if (value === false) {
    return (
      <X
        size={20}
        className="mx-auto text-default-300"
      />
    );
  }

  return (
    <span
      className={
        premium
          ? "font-semibold text-primary"
          : "text-default-600"
      }
    >
      {value}
    </span>
  );
}