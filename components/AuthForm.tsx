"use client"

import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { Label } from './ui/label';
import { Input } from '@base-ui/react';
import { CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from './ui/toast';
import { loginUserAction, signUpUserAction } from '@/actions/auth';

type Props = {
  type: "login" | "signup";
}

export default function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const result = isLoginForm
        ? await loginUserAction(email, password)
        : await signUpUserAction(email, password);

      const needsEmailConfirmation = result && "needsEmailConfirmation" in result
        ? result.needsEmailConfirmation
        : false;

      let title, description;
      if (isLoginForm) {
        title = "Logged in";
        description = "You have been successfully logged in.";
      } else if (needsEmailConfirmation) {
        title = "Check your email";
        description = "Confirm your email address before logging in.";
      } else {
        title = "Signed up";
        description = "You have been successfully signed up.";
      }

      if (!result?.errorMessage) {
        toast.add({ title, description, type: "success" })
        router.replace(needsEmailConfirmation ? "/auth/login" : "/")
      } else {
        toast.add({ title: "Error", description: result.errorMessage, type: "danger" })
      }
    })
  }

  return (
    <form action={handleSubmit}>
      <CardContent className="flex flex-col w-full gap-4 max-w-2/3">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="you@example.com" type="email" required disabled={isPending} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="********" type="password" required disabled={isPending} />
        </div>
      </CardContent>
      <CardFooter className="justify-center mt-4 flex flex-col gap-6 text-sm text-muted-foreground">
        <Button type="submit" className="w-full">
          {isPending ? <Loader2 className="animate-spin" /> : (isLoginForm ? "Login" : "Sign Up")}
        </Button>
        <div>
          {isLoginForm ? (
            <>Don&apos;t have an account?&nbsp;<Link href="/auth/sign-up" className="font-medium text-primary hover:underline">Create one</Link></>
          ) : (
            <>Already have an account?&nbsp;<Link href="/auth/login" className="font-medium text-primary hover:underline">Login here</Link></>
          )}
        </div>
      </CardFooter>
    </form>
  )
}
