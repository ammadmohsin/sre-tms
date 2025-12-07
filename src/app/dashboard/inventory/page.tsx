import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Package,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
} from "lucide-react";

// Mock data
const inventoryItems = [
  {
    id: "1",
    productCode: "COTTON-001",
    name: "Premium Cotton Fabric",
    category: "Raw Materials",
    quantity: 450,
    minLevel: 100,
    unit: "meters",
    purity: 95,
    department: "Production",
    value: "$12,500",
  },
  {
    id: "2",
    productCode: "POLY-042",
    name: "Polyester Thread - White",
    category: "Raw Materials",
    quantity: 85,
    minLevel: 150,
    unit: "kg",
    purity: 92,
    department: "Production",
    value: "$3,200",
  },
  {
    id: "3",
    productCode: "BTN-305",
    name: "Buttons - Assorted Colors",
    category: "Accessories",
    quantity: 5000,
    minLevel: 1000,
    unit: "pieces",
    purity: 98,
    department: "Warehouse",
    value: "$2,100",
  },
  {
    id: "4",
    productCode: "DENIM-220",
    name: "Denim Fabric - Blue",
    category: "Raw Materials",
    quantity: 65,
    minLevel: 200,
    unit: "meters",
    purity: 88,
    department: "Production",
    value: "$5,800",
  },
  {
    id: "5",
    productCode: "ZIP-150",
    name: "Metal Zippers - Standard",
    category: "Accessories",
    quantity: 1200,
    minLevel: 500,
    unit: "pieces",
    purity: 96,
    department: "Warehouse",
    value: "$1,450",
  },
  {
    id: "6",
    productCode: "SILK-088",
    name: "Silk Blend Fabric",
    category: "Raw Materials",
    quantity: 180,
    minLevel: 100,
    unit: "meters",
    purity: 94,
    department: "Production",
    value: "$18,900",
  },
];

export default function InventoryPage() {
  const lowStockItems = inventoryItems.filter(
    (item) => item.quantity < item.minLevel
  );
  const totalValue = inventoryItems.reduce(
    (sum, item) => sum + parseFloat(item.value.replace(/[$,]/g, "")),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Inventory Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Track and manage all inventory items
          </p>
        </div>
        <Button className="gradient-primary text-white shadow-lg">
          <Plus className="mr-2 w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>

        <Card className="glass border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(totalValue / 1000).toFixed(1)}K
            </div>
            <p className="text-xs text-muted-foreground">Current inventory</p>
          </CardContent>
        </Card>

        <Card className="glass border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">
              {lowStockItems.length}
            </div>
            <p className="text-xs text-muted-foreground">Items need restock</p>
          </CardContent>
        </Card>

        <Card className="glass border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Good Stock</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {inventoryItems.length - lowStockItems.length}
            </div>
            <p className="text-xs text-muted-foreground">Healthy levels</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card className="glass border-white/20">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-background/50 border-white/20"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="glass border-white/20">
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>All products across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {inventoryItems.map((item) => {
              const isLowStock = item.quantity < item.minLevel;
              const stockPercentage = (item.quantity / item.minLevel) * 100;
              const isPurityLow = item.purity < 90;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:bg-muted/20"
                >
                  <div className="flex items-start justify-between">
                    {/* Left Side */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{item.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {item.productCode}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.category} • {item.department}
                          </p>
                        </div>
                      </div>

                      {/* Stock Bar */}
                      <div className="mt-3 flex items-center space-x-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Stock Level</span>
                            <span>
                              {item.quantity} / {item.minLevel} {item.unit}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                isLowStock ? "bg-red-500" : "bg-green-500"
                              }`}
                              style={{
                                width: `${Math.min(stockPercentage, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-right min-w-[80px]">
                          <p className="text-xs text-muted-foreground">Value</p>
                          <p className="font-semibold">{item.value}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="ml-4 flex items-center space-x-2">
                      {/* Purity Badge */}
                      <Badge
                        variant={isPurityLow ? "destructive" : "default"}
                        className={
                          !isPurityLow
                            ? "bg-green-500/10 text-green-600 border-green-500/20"
                            : ""
                        }
                      >
                        {item.purity}% Purity
                      </Badge>

                      {/* Stock Status */}
                      {isLowStock ? (
                        <Badge
                          variant="destructive"
                          className="flex items-center space-x-1"
                        >
                          <AlertTriangle className="w-3 h-3" />
                          <span>Low Stock</span>
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-600 border-green-500/20 flex items-center space-x-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Good</span>
                        </Badge>
                      )}

                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
