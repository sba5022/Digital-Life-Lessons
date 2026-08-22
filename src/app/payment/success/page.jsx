"use client";

import { Card, Button, Chip } from "@heroui/react";
import {
  CheckCircle,
  Crown,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">

      <Card className="max-w-lg w-full p-8 md:p-10 text-center">

        <div className="w-16 h-16 mx-auto rounded-full bg-success-100 flex items-center justify-center">
          <CheckCircle
            size={34}
            className="text-success-500"
          />
        </div>

        <Chip
          color="warning"
          variant="flat"
          className="mt-6"
          startContent={<Crown size={15} />}
        >
          Premium
        </Chip>

        <h1 className="text-3xl font-bold mt-5">
          Payment Successful!
        </h1>

        <p className="text-default-500 mt-3 leading-7">
          Thank you for upgrading. Your Premium membership
          is being activated.
        </p>

        <p className="text-sm text-default-400 mt-3">
          Your account will be updated automatically after
          Stripe confirms the payment.
        </p>

        <Button
          as={Link}
          href="/dashboard"
          color="primary"
          size="lg"
          className="mt-7"
          endContent={
            <ArrowRight size={18} />
          }
        >
          Go to Dashboard
        </Button>

      </Card>

    </main>
  );
}