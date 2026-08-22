"use client";

import { Card, Button } from "@heroui/react";
import { XCircle, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">

      <Card className="max-w-lg w-full p-8 md:p-10 text-center">

        <div className="w-16 h-16 mx-auto rounded-full bg-danger-100 flex items-center justify-center">
          <XCircle
            size={34}
            className="text-danger-500"
          />
        </div>

        <h1 className="text-3xl font-bold mt-6">
          Payment Cancelled
        </h1>

        <p className="text-default-500 mt-3 leading-7">
          Your payment was cancelled or was not completed.
          No Premium membership has been activated.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">

          <Button
            as={Link}
            href="/pricing"
            color="primary"
            startContent={
              <CreditCard size={18} />
            }
          >
            Try Again
          </Button>

          <Button
            as={Link}
            href="/"
            variant="bordered"
            startContent={
              <ArrowLeft size={18} />
            }
          >
            Back Home
          </Button>

        </div>

      </Card>

    </main>
  );
}