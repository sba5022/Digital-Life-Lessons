import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
    user: {
      additionalFields: {
        role: {
          // type: String,
          default: "user",
        },
    },
  plan: {
   type: "string",
  defaultValue: "Free",
  }
  }
});
// console.log("MONGODB:", !!process.env.MONGODB_URI);
// console.log("GOOGLE CLIENT ID:", !!process.env.GOOGLE_CLIENT_ID);
// console.log("GOOGLE CLIENT SECRET:", !!process.env.GOOGLE_CLIENT_SECRET);
// console.log("BETTER AUTH URL:", process.env.BETTER_AUTH_URL);
// console.log(
//   "BETTER AUTH SECRET:",
//   !!process.env.BETTER_AUTH_SECRET
// );
