"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Truck,
  DollarSign,
  LucideIcon,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Truck,
  DollarSign,
};

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  gradient = "from-primary to-accent",
}: StatCardProps) {
  const Icon = iconMap[icon];

  if (!Icon) {
    return null;
  }
  return (
    <Card className="glass border-white/20 overflow-hidden relative group hover:shadow-xl transition-all duration-300">
      <div
        className={cn(
          "absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
          gradient
        )}
      />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("p-2 rounded-lg bg-gradient-to-br", gradient)}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              vs last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
