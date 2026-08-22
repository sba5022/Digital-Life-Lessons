import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

export async function POST(request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in.",
        },
        { status: 401 }
      );
    }

    const user = session.user;

    // Prevent Premium users from paying again
    if (
      user.isPremium === true ||
      user.plan === "Premium"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You are already a Premium user.",
        },
        { status: 400 }
      );
    }

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL;

    const checkoutSession =
      await stripe.checkout.sessions.create({
        mode: "payment",

        customer_email: user.email,

        line_items: [
          {
            price_data: {
              currency: "bdt",

              product_data: {
                name: "Digital Life Lessons Premium",
                description:
                  "Lifetime Premium access",
              },

              // Stripe uses the smallest currency unit.
              // ৳1500 = 150000 paisa.
              unit_amount: 150000,
            },

            quantity: 1,
          },
        ],

        metadata: {
          userId: user.id,
          userEmail: user.email,
        },

        success_url:
          `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${origin}/payment/cancel`,

      });

    return NextResponse.json({
      success: true,
      url: checkoutSession.url,
    });

  } catch (error) {
    console.error(
      "CREATE CHECKOUT SESSION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create Stripe checkout session.",
      },
      { status: 500 }
    );
  }
}