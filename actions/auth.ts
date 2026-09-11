"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/utils";

export const loginUserAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({ email, password });

    if (error) throw error;

    return { errorMessage: null, needsEmailConfirmation: false };
  } catch (error) {
    return handleError(error);
  }
};

export const logOutUserAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();

    if (error) throw error;
  } catch (error) {
    return handleError(error);
  }

  return { errorMessage: null, needsEmailConfirmation: false };
};

export const signUpUserAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { error, data } = await auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Error Signing up!");

    await prisma.user.create({
      data: {
        id: userId,
        email,
      },
    });

    return {
      errorMessage: null,
      needsEmailConfirmation: !data.session,
    };
  } catch (error) {
    return handleError(error);
  }
};
