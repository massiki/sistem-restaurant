"use server"

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { isUserRole, ROLE_PATH } from "@/lib/auth-types";

export const loginAction = async (_prevState: { error?: string }, formData: FormData): Promise<{ error?: string }> => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Email dan kata sandi wajib diisi." };
  }

  let redirectTo = "/";

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true },
    });

    if (user && isUserRole(user.role)) {
      redirectTo = ROLE_PATH[user.role];
    }
  } catch {
    return { error: "Tidak dapat terhubung ke server. Coba lagi." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email atau password salah." };
    }

    throw error;
  }

  return {};
}

export const signOutAction = async () => {
  await signOut({ redirectTo: "/login" });
}
