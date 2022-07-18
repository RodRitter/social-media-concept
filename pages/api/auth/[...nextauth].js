import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise, { connectToDatabase } from "/lib/mongodb";

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const { db } = await connectToDatabase();

                const demoUser = await db
                    .collection("users")
                    .findOne({ email: "john.doe@ritter.co.za" });

                // Guest/Demo Auth
                if (demoUser) {
                    return demoUser;
                } else {
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        async session({ session, token, user }) {
            const { db } = await connectToDatabase();

            const userData = await db
                .collection("users")
                .findOne({ email: session.user.email });

            let expandedUser = { ...session.user };
            if (expandedUser) {
                expandedUser = { ...userData };
            }

            session.user = expandedUser;

            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token;
        },
    },
});
