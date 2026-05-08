import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { RegisterForm } from "@/components/auth/register-form";

export default async function RegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-semibold text-center mb-8 ">Register</h1>
      <RegisterForm />
    </div>
  );
}
