import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import { register } from '@/app/actions/user';

const Register = async () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg">
        <CardHeader className="space-y-2 text-center p-0">
          <h2 className="text-3xl font-bold text-orange-500">QR SwiftFood</h2>
          <p className="text-gray-500">Create your account</p>
        </CardHeader>
        
        <CardContent className="space-y-6 p-0">
          <form className="space-y-4" action={register}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input 
                id="email"
                placeholder="Enter your email"
                type="email"
                name="email"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input 
                id="username"
                placeholder="Enter your username"
                type="text"
                name="username"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input 
                id="password"
                placeholder="••••••••"
                type="password"
                name="password"
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Sign up
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <IconBrandGithub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" className="w-full">
              <IconBrandGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>

        <CardFooter className="text-center text-sm text-gray-500 p-0">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium ml-1">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;