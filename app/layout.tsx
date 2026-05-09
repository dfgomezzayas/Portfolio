// Minimal root layout required by Next.js App Router.
// The real layout with providers, Navbar and Footer lives in app/[locale]/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
