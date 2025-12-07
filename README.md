# 🏭 Textile Management System (TMS)

A modern, full-stack Enterprise Resource Planning (ERP) system designed specifically for textile manufacturing businesses.

## ✨ Features

### 🎨 Modern Design
- **Vibrant Color Palette**: Eye-catching gradients and colors
- **Glassmorphism UI**: Beautiful frosted glass effects
- **Responsive Layout**: Works seamlessly on all devices
- **Animated Components**: Smooth transitions and interactions

### 🔐 Role-Based Access Control (RBAC)
8 distinct access levels with specific permissions:

1. **ADMIN** - Full system access, user management, system configuration
2. **MANAGER** - All departments, analytics, reports, approvals
3. **DEPARTMENT_HEAD** - Department management, employee oversight, approvals
4. **QUALITY_CONTROL** - Inventory management, quality checks, stock control
5. **COMMERCIAL** - Export/import tracking, shipment management
6. **SHIPPING** - Shipment tracking, delivery management
7. **DEPARTMENT_STAFF** - Basic operations, orders, limited inventory access
8. **WORKER** - Attendance tracking, progress reports

### 📊 Core Modules

#### Employee Management
- Employee profiles with detailed information
- Department assignments
- Shift scheduling
- Attendance tracking
- Leave management

#### Inventory & Stock Management
- Real-time stock levels
- Quality control (purity checks)
- Stock movements (IN/OUT/ADJUSTMENT)
- Low stock alerts
- Multi-department inventory

#### Order Management
- Supply orders (from suppliers)
- Sales orders (to buyers)
- Order status tracking
- Approval workflows

#### Shipment & Logistics
- Shipment tracking
- Export/import management
- Delivery status updates
- Carrier management

#### Analytics & Reports
- Production vs Sales charts
- Stock analytics
- Supply chain metrics
- Custom reports

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: MongoDB via Prisma ORM
- **Auth**: NextAuth.js v5
- **Styling**: Tailwind CSS v4
- **Components**: Shadcn/UI (Radix Primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Notifications**: Sonner
- **Animations**: Framer Motion
- **State Management**: TanStack Query + tRPC

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB database (local or cloud)

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd sre-tms
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your:
- MongoDB connection string
- NextAuth secret (generate with: `openssl rand -base64 32`)
- NextAuth URL

4. **Setup database**
```bash
# Generate Prisma Client
pnpm db:generate

# Push schema to database
pnpm db:push

# Seed demo data
pnpm db:seed
```

5. **Run development server**
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🔑 Demo Credentials

After seeding, use these credentials to login:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@tms.com | admin123 |
| Manager | manager@tms.com | manager123 |
| Dept Head | dept.head@tms.com | dept123 |
| QC Officer | qc@tms.com | qc123 |
| Commercial | commercial@tms.com | commercial123 |
| Shipping | shipping@tms.com | shipping123 |
| Staff | staff@tms.com | staff123 |
| Worker | worker@tms.com | worker123 |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── dashboard/        # Main dashboard (all roles except Worker)
│   ├── portal/           # Worker portal
│   ├── login/            # Login page
│   └── layout.tsx        # Root layout
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── dashboard/        # Dashboard widgets
│   ├── sidebar.tsx       # Navigation sidebar with RBAC
│   └── navbar.tsx        # Top navigation bar
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   ├── redis.ts          # Redis client
│   └── utils.ts          # Utility functions
└── server/
    ├── trpc.ts           # tRPC setup
    └── routers/          # API routers

prisma/
├── schema.prisma         # Database schema
└── seed.ts               # Database seeding script
```

## 🎯 Key Features Implementation

### Glassmorphism Sidebar
```tsx
// Auto-collapses, role-based navigation
<Sidebar accessLevel={user.accessLevel} />
```

### Role-Based Dashboard
Each role sees different widgets and metrics:
- **Manager**: Full analytics, charts, all metrics
- **QC**: Pending inspections, quality metrics
- **Worker**: Large clock-in button with pulse animation

### Vibrant Gradients
Custom CSS classes for colorful UI:
- `.gradient-primary` - Indigo to violet
- `.gradient-secondary` - Teal to cyan
- `.gradient-mesh` - Multi-color mesh background

## 🔧 Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:generate  # Generate Prisma Client
pnpm db:push      # Push schema changes
pnpm db:studio    # Open Prisma Studio
pnpm db:seed      # Seed database with demo data
```

### Database Management

```bash
# View and edit data with Prisma Studio
pnpm db:studio

# Reset database (⚠️ deletes all data)
pnpm db:push --force-reset
pnpm db:seed
```

## 🎨 Design System

### Color Palette
- **Primary**: Indigo/Violet (`hsl(263 70% 50%)`)
- **Secondary**: Teal/Cyan (`hsl(180 65% 55%)`)
- **Accent**: Purple (`hsl(280 70% 60%)`)
- **Success**: Green (`hsl(142 76% 36%)`)
- **Warning**: Orange (`hsl(38 92% 50%)`)
- **Destructive**: Red (`hsl(0 84.2% 60.2%)`)

### Custom Components
All UI components are built with Shadcn/UI and customized with vibrant gradients and glassmorphism effects.

## 📊 Database Schema

Key models:
- **User**: Authentication and access control
- **Employee**: Employee details and relationships
- **Department**: Organizational units
- **Product**: Inventory items
- **Stock**: Stock levels and tracking
- **Order**: Supply and sales orders
- **Shipment**: Logistics and delivery
- **Attendance**: Worker clock-in/out records

## 🔒 Security

- ✅ Secure password hashing with bcryptjs
- ✅ JWT-based authentication with NextAuth.js
- ✅ Middleware-level route protection
- ✅ Role-based access control
- ✅ Input validation with Zod
- ✅ Type-safe API with tRPC

## 🚀 Deployment

### Environment Variables for Production
```env
DATABASE_URL="your-production-mongodb-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://yourdomain.com"
```

### Deploy to Vercel
```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel --prod
```

## 📝 License

MIT License - feel free to use this project for commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for the Textile Industry**
