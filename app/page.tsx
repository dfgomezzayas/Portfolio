// The middleware (middleware.ts) redirects / → /en or /es automatically.
// This file is kept to satisfy Next.js but should never be rendered.
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
