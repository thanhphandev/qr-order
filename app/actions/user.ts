'use server';

import { redirect } from "next/navigation";
import connectDB from "../lib/db";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";

const login = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Attempt to sign in
    const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/admin', // After successful login, redirect to /admin
    });

    // Check if the login was successful or if there was an error
    if (result?.error) {
        // Handle error
        return result.error;  // You can customize the error handling as needed
    }

    // If the login was successful, perform the redirect
    redirect('/admin');
}

const logout = async () => {
    // Attempt to sign out
    await signOut({ redirect: false });

    // Redirect to the login page
    redirect('/login');
}

const register = async (formData: FormData) => {
    // Extract form data
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // Validate form fields
    if (!email || !username || !password) {
        throw new Error('Please fill all fields');
    }

    // Connect to the database
    await connectDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await User.create({ email, username, password: hashedPassword });
    console.log('Successfully created user');

    // Redirect to login page
    redirect('/login');
};

export { register, login, logout  };
