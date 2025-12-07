# 🚀 Quick Setup Guide

## Step 1: Environment Variables

Create a `.env` file in the root directory:

```env
# Database - Replace with your MongoDB connection string
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/tms?retryWrites=true&w=majority"

# NextAuth - Generate secret with: openssl rand -base64 32
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Redis (Optional)
REDIS_URL="redis://localhost:6379"
```

### Getting MongoDB Connection String

**Option 1: MongoDB Atlas (Cloud - Recommended)**

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account & cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string
5. Replace `<password>` with your database password

**Option 2: Local MongoDB**

```env
DATABASE_URL="mongodb://localhost:27017/tms"
```

## Step 2: Install Dependencies

```bash
pnpm install
```

## Step 3: Setup Database

```bash
# Generate Prisma Client
pnpm db:generate

# Push schema to MongoDB
pnpm db:push

# Seed with demo data
pnpm db:seed
```

## Step 4: Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 5: Login with Demo Credentials

| Role    | Email           | Password   |
| ------- | --------------- | ---------- |
| Admin   | admin@tms.com   | admin123   |
| Manager | manager@tms.com | manager123 |
| Worker  | worker@tms.com  | worker123  |

## 🎯 What to Explore

1. **Login as Admin** to see the full dashboard with analytics
2. **Login as Worker** to see the clock-in portal with pulse animation
3. **Try different roles** to see how the sidebar and dashboard change

## 🔧 Troubleshooting

### Database Connection Issues

- Check your MongoDB connection string
- Ensure IP whitelist in MongoDB Atlas (allow all: `0.0.0.0/0`)
- Verify network connectivity

### Prisma Issues

```bash
# Clear Prisma cache and regenerate
rm -rf node_modules/.prisma
pnpm db:generate
```

### NextAuth Issues

- Ensure `NEXTAUTH_SECRET` is set (generate with `openssl rand -base64 32`)
- Check `NEXTAUTH_URL` matches your development URL

## 📚 Next Steps

1. Explore the codebase structure
2. Customize colors in `src/app/globals.css`
3. Add more features to dashboards
4. Implement employee management pages
5. Build inventory management UI
6. Add order processing workflows

## 🆘 Need Help?

- Check the main `README.md` for full documentation
- Review Prisma schema in `prisma/schema.prisma`
- Explore components in `src/components/`
- Check authentication in `src/lib/auth.ts`

---

Happy Coding! 🎉
