import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "~/components/sidebar";
import { Navbar } from "~/components/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  // Redirect workers to their portal
  if (user.accessLevel === "WORKER") {
    redirect("/portal");
  }

  return (
    <div className="flex min-h-screen gradient-mesh">
      <Sidebar
        accessLevel={user.accessLevel as any}
        userName={user.email?.split("@")[0]}
      />
      <div className="flex-1 flex flex-col">
        <Navbar
          userName={user.email?.split("@")[0]}
          userEmail={user.email || ""}
          role={user.accessLevel}
        />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
