import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { RegisterForm } from "@/components/auth/register-form";

// TODO: Setup confirmation link/code for registration

export default async function RegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
}
