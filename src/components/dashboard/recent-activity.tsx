"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Package, AlertTriangle, CheckCircle } from "lucide-react";

interface StockItem {
  id: string;
  name: string;
  quantity: number;
  minLevel: number;
  category: string;
}

const mockStockItems: StockItem[] = [
  {
    id: "1",
    name: "Cotton Fabric",
    quantity: 50,
    minLevel: 100,
    category: "Raw Material",
  },
  {
    id: "2",
    name: "Polyester Thread",
    quantity: 150,
    minLevel: 50,
    category: "Thread",
  },
  {
    id: "3",
    name: "Buttons - White",
    quantity: 300,
    minLevel: 200,
    category: "Accessories",
  },
  {
    id: "4",
    name: "Denim Fabric",
    quantity: 80,
    minLevel: 150,
    category: "Raw Material",
  },
  {
    id: "5",
    name: "Zipper - Metal",
    quantity: 250,
    minLevel: 100,
    category: "Accessories",
  },
];

export function RecentActivity() {
  return (
    <Card className="glass border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Stock Levels Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockStockItems.map((item) => {
            const isLow = item.quantity < item.minLevel;
            const percentage = (item.quantity / item.minLevel) * 100;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{item.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isLow ? "bg-red-500" : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {item.quantity} / {item.minLevel}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  {isLow ? (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
