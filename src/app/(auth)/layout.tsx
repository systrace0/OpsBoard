export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 antialiased">
      {children}
    </main>
  );
}
