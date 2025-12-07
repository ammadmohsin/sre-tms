"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
  Building2,
  Clock,
  FileText,
  Shield,
  Import,
  ArrowUpFromLine,
  CheckCircle2,
  UserCog,
  ChevronLeft,
  Factory,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { useState } from "react";

type AccessLevel =
  | "ADMIN"
  | "MANAGER"
  | "DEPARTMENT_HEAD"
  | "QUALITY_CONTROL"
  | "COMMERCIAL"
  | "SHIPPING"
  | "DEPARTMENT_STAFF"
  | "WORKER";

interface SidebarProps {
  accessLevel: AccessLevel;
  userName?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  accessLevels: AccessLevel[];
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    accessLevels: [
      "ADMIN",
      "MANAGER",
      "DEPARTMENT_HEAD",
      "QUALITY_CONTROL",
      "COMMERCIAL",
      "SHIPPING",
      "DEPARTMENT_STAFF",
    ],
  },
  {
    title: "Worker Portal",
    href: "/portal",
    icon: Clock,
    accessLevels: ["WORKER"],
  },
  {
    title: "Employees",
    href: "/employees",
    icon: Users,
    accessLevels: ["ADMIN", "MANAGER", "DEPARTMENT_HEAD"],
  },
  {
    title: "Departments",
    href: "/departments",
    icon: Building2,
    accessLevels: ["ADMIN", "MANAGER"],
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: Clock,
    accessLevels: ["ADMIN", "MANAGER", "DEPARTMENT_HEAD"],
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
    accessLevels: [
      "ADMIN",
      "MANAGER",
      "DEPARTMENT_HEAD",
      "QUALITY_CONTROL",
      "DEPARTMENT_STAFF",
    ],
  },
  {
    title: "Quality Control",
    href: "/quality",
    icon: CheckCircle2,
    accessLevels: ["ADMIN", "MANAGER", "QUALITY_CONTROL"],
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
    accessLevels: ["ADMIN", "MANAGER", "DEPARTMENT_STAFF"],
  },
  {
    title: "Shipments",
    href: "/shipments",
    icon: Truck,
    accessLevels: ["ADMIN", "MANAGER", "COMMERCIAL", "SHIPPING"],
  },
  {
    title: "Exports",
    href: "/exports",
    icon: ArrowUpFromLine,
    accessLevels: ["ADMIN", "MANAGER", "COMMERCIAL"],
  },
  {
    title: "Imports",
    href: "/imports",
    icon: Import,
    accessLevels: ["ADMIN", "MANAGER", "COMMERCIAL"],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    accessLevels: ["ADMIN", "MANAGER"],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
    accessLevels: ["ADMIN", "MANAGER", "DEPARTMENT_HEAD"],
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: UserCog,
    accessLevels: ["ADMIN"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    accessLevels: ["ADMIN"],
  },
];

export function Sidebar({ accessLevel, userName }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredNavItems = navigationItems.filter((item) =>
    item.accessLevels.includes(accessLevel)
  );

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 glass-dark border-r border-white/10 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-white">TMS</h2>
                <p className="text-xs text-gray-400">Textile System</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-white/10"
          >
            <ChevronLeft
              className={cn(
                "w-5 h-5 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/5 hover:text-white",
                isCollapsed && "justify-center"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium">{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {userName || "User"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {accessLevel.replace(/_/g, " ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
