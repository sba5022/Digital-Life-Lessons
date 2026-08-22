import Stripe from "stripe";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

const client = new MongoClient(
  process.env.MONGODB_URI
);

export async function POST(request) {
  const body = await request.text();

  const signature =
    request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error(
      "STRIPE WEBHOOK SIGNATURE ERROR:",
      error.message
    );

    return new NextResponse(
      "Webhook signature verification failed.",
      { status: 400 }
    );
  }

  try {
    /*
     * Checkout completed successfully
     */
    if (
      event.type ===
      "checkout.session.completed"
    ) {
      const checkoutSession =
        event.data.object;

      const userId =
        checkoutSession.metadata?.userId;

      const userEmail =
        checkoutSession.metadata?.userEmail;

      if (!userId) {
        console.error(
          "No userId found in Stripe metadata."
        );

        return NextResponse.json({
          received: true,
        });
      }

      await client.connect();

      const database =
        client.db("Assignment-10");

      const userCollection =
        database.collection("users");

      const filter = ObjectId.isValid(userId)
        ? {
            _id: new ObjectId(userId),
          }
        : {
            email: userEmail,
          };

      const result =
        await userCollection.updateOne(
          filter,
          {
            $set: {
              isPremium: true,
              plan: "Premium",
              premiumSince: new Date(),
              stripeCustomerId:
                checkoutSession.customer ||
                null,
            },
          }
        );

      console.log(
        "PREMIUM USER UPDATED:",
        result
      );
    }

    return NextResponse.json({
      received: true,
    });

  } catch (error) {
    console.error(
      "STRIPE WEBHOOK ERROR:",
      error
    );

    return new NextResponse(
      "Webhook processing failed.",
      { status: 500 }
    );
  }
}