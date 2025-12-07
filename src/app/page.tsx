import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Redirect based on access level
  if (session.user.accessLevel === "WORKER") {
    redirect("/portal");
  } else {
    redirect("/dashboard");
  }
}
