import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-mesh p-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or you don't have
            permission to access it.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild className="gradient-primary text-white">
            <Link href="/dashboard">
              <Home className="mr-2 w-4 h-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
