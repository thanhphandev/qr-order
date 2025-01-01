import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import connectDB from '@/app/lib/db';
import { User } from '@/app/models/User';
import { compare } from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const email = credentials?.email;
                    const password = credentials?.password;

                    if (!email || !password) {
                        throw new Error("Email and Password are required.");
                    }

                    await connectDB();
                    const user = await User.findOne({ email }).select('+password +role');
                    if (!user) {
                        throw new Error("User not found.");
                    }

                    const isValid = await compare(password, user.password);
                    if (!isValid) {
                        throw new Error("Incorrect Password.");
                    }

                    return { id: user._id, name: user.username, email: user.email, role: user.role };
                } catch (error) {
                    throw new Error(error.message || "Login failed.");
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, token }) {
            if (token?.sub && token?.role) {
                session.user.id = token.sub;
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
    },
    events: {
        async signIn(message) {
            if (!message) {
                throw new Error('Unexpected error during login');
            }
        },
    },
    signIn: async ({ user, account }) => {
        // Logic when signing in with Google
        if (account?.provider === 'google') {
            try {
                const { email, name, image, id } = user;
                await connectDB();

                const alreadyUser = await User.findOne({ email });
                if (!alreadyUser) {
                    // Create a new user if not exists
                    await User.create({
                        email,
                        username: name,
                        authProvider: 'google', // Save the provider as google
                    });
                }
            } catch (error) {
                throw new Error('Error signing in with Google');
            }
        }

        // Logic when signing in with GitHub
        if (account?.provider === 'github') {
            try {
                const { email, name, image, id } = user;
                await connectDB();

                const alreadyUser = await User.findOne({ email });
                if (!alreadyUser) {
                    // Create a new user if not exists
                    await User.create({
                        email,
                        username: name,
                        authProvider: 'github', // Save the provider as github
                    });
                }
            } catch (error) {
                throw new Error('Error signing in with GitHub');
            }
        }

        // Logic for Credentials provider (email/password)
        if (account?.provider === 'credentials') {
            return true;
        } else {
            return false;
        }
    },
});
