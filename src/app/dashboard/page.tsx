import { auth } from "~/lib/auth";
import { StatCard } from "~/components/dashboard/stat-card";
import { ProductionChart } from "~/components/dashboard/production-chart";
import { RecentActivity } from "~/components/dashboard/recent-activity";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Truck,
  DollarSign,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const accessLevel = session?.user?.accessLevel;

  // Admin & Manager Dashboard - Full Analytics
  if (accessLevel === "ADMIN" || accessLevel === "MANAGER") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Welcome to TMS Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Overview of your textile management system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Employees"
            value="156"
            description="8 new this month"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            gradient="from-blue-500 to-cyan-500"
          />
          <StatCard
            title="Active Orders"
            value="48"
            description="12 pending approval"
            icon={ShoppingCart}
            trend={{ value: 8, isPositive: true }}
            gradient="from-purple-500 to-pink-500"
          />
          <StatCard
            title="Inventory Value"
            value="$245K"
            description="Across all departments"
            icon={Package}
            trend={{ value: 5, isPositive: true }}
            gradient="from-green-500 to-emerald-500"
          />
          <StatCard
            title="Monthly Revenue"
            value="$89K"
            description="Target: $100K"
            icon={DollarSign}
            trend={{ value: -3, isPositive: false }}
            gradient="from-orange-500 to-red-500"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-7">
          <div className="md:col-span-4">
            <ProductionChart />
          </div>
          <div className="md:col-span-3">
            <RecentActivity />
          </div>
        </div>
      </div>
    );
  }

  // Department Head Dashboard
  if (accessLevel === "DEPARTMENT_HEAD") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Department Overview
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your department efficiently
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Department Staff"
            value="24"
            description="3 on leave today"
            icon={Users}
            gradient="from-blue-500 to-cyan-500"
          />
          <StatCard
            title="Pending Approvals"
            value="7"
            description="Leave & shift requests"
            icon={AlertTriangle}
            gradient="from-orange-500 to-red-500"
          />
          <StatCard
            title="Department Stock"
            value="$45K"
            description="Current inventory value"
            icon={Package}
            gradient="from-green-500 to-emerald-500"
          />
        </div>

        <RecentActivity />
      </div>
    );
  }

  // Quality Control Dashboard
  if (accessLevel === "QUALITY_CONTROL") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Quality Control Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Inspect and manage inventory quality
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Pending Inspections"
            value="15"
            description="Awaiting quality check"
            icon={AlertTriangle}
            gradient="from-orange-500 to-red-500"
          />
          <StatCard
            title="Passed (>90% Purity)"
            value="142"
            description="This month"
            icon={CheckCircle}
            gradient="from-green-500 to-emerald-500"
          />
          <StatCard
            title="Low Stock Items"
            value="8"
            description="Need restocking"
            icon={Package}
            gradient="from-red-500 to-pink-500"
          />
        </div>

        <RecentActivity />
      </div>
    );
  }

  // Commercial Department Dashboard
  if (accessLevel === "COMMERCIAL") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Commercial Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage exports and imports efficiently
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Active Shipments"
            value="12"
            description="In transit"
            icon={Truck}
            gradient="from-blue-500 to-cyan-500"
          />
          <StatCard
            title="Pending Exports"
            value="8"
            description="Ready to ship"
            icon={TrendingUp}
            gradient="from-green-500 to-emerald-500"
          />
          <StatCard
            title="Expected Imports"
            value="5"
            description="Arriving this week"
            icon={Package}
            gradient="from-purple-500 to-pink-500"
          />
        </div>
      </div>
    );
  }

  // Shipping Dashboard
  if (accessLevel === "SHIPPING") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Shipping Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Track and manage all shipments
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="In Transit"
            value="18"
            description="Active shipments"
            icon={Truck}
            gradient="from-blue-500 to-cyan-500"
          />
          <StatCard
            title="Delivered Today"
            value="7"
            description="On-time deliveries"
            icon={CheckCircle}
            gradient="from-green-500 to-emerald-500"
          />
          <StatCard
            title="Pending Pickup"
            value="4"
            description="Ready to dispatch"
            icon={Package}
            gradient="from-orange-500 to-red-500"
          />
        </div>
      </div>
    );
  }

  // Department Staff Dashboard
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">Your daily overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="My Orders"
          value="5"
          description="Active orders"
          icon={ShoppingCart}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Tasks Today"
          value="12"
          description="8 completed"
          icon={CheckCircle}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Department Stock"
          value="Good"
          description="All items in stock"
          icon={Package}
          gradient="from-purple-500 to-pink-500"
        />
      </div>
    </div>
  );
}
