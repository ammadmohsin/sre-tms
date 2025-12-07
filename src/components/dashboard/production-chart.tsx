"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", production: 4000, sales: 2400 },
  { month: "Feb", production: 3000, sales: 1398 },
  { month: "Mar", production: 2000, sales: 9800 },
  { month: "Apr", production: 2780, sales: 3908 },
  { month: "May", production: 1890, sales: 4800 },
  { month: "Jun", production: 2390, sales: 3800 },
];

export function ProductionChart() {
  return (
    <Card className="glass border-white/20">
      <CardHeader>
        <CardTitle>Production vs Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="production"
              stroke="hsl(263 70% 50%)"
              strokeWidth={3}
              dot={{ fill: "hsl(263 70% 50%)", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="hsl(180 65% 55%)"
              strokeWidth={3}
              dot={{ fill: "hsl(180 65% 55%)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
