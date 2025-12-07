# 🚀 Quick Command Reference

## Essential Commands

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Database Commands

```bash
# Generate Prisma Client (run after schema changes)
pnpm db:generate

# Push schema changes to database
pnpm db:push

# Open Prisma Studio (visual database editor)
pnpm db:studio

# Seed database with demo data
pnpm db:seed

# Reset database (⚠️ DELETES ALL DATA)
pnpm db:push --force-reset
pnpm db:seed
```

### Quick Setup (First Time)

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment file
cp .env.example .env
# Edit .env and add your MongoDB connection string

# 3. Setup database
pnpm db:generate
pnpm db:push
pnpm db:seed

# 4. Start app
pnpm dev
```

### Alternative: Use PowerShell Script

```powershell
# Run automated setup (Windows)
.\setup.ps1
```

## Useful Shortcuts

### In Development Server

- `Ctrl + C` - Stop server
- `R` - Restart server (when prompted)

### VS Code

- `Ctrl + Shift + P` - Command palette
- `Ctrl + `` - Toggle terminal
- `Ctrl + B` - Toggle sidebar
- `Ctrl + Shift + F` - Search all files

## Common Tasks

### Add a New Page

```bash
# Create file: src/app/dashboard/[your-page]/page.tsx
# Page will be auto-routed to /dashboard/[your-page]
```

### Add a New Component

```bash
# Create file: src/components/[component-name].tsx
# Import and use in your pages
```

### Add a New tRPC Route

```bash
# Edit: src/server/routers/[router-name].ts
# Add to: src/server/routers/index.ts
```

### Add a New Prisma Model

```prisma
# Edit: prisma/schema.prisma
# Add your model

# Then run:
pnpm db:generate
pnpm db:push
```

## Demo Credentials

| Role       | Email              | Password      |
| ---------- | ------------------ | ------------- |
| Admin      | admin@tms.com      | admin123      |
| Manager    | manager@tms.com    | manager123    |
| Dept Head  | dept.head@tms.com  | dept123       |
| QC Officer | qc@tms.com         | qc123         |
| Commercial | commercial@tms.com | commercial123 |
| Shipping   | shipping@tms.com   | shipping123   |
| Staff      | staff@tms.com      | staff123      |
| Worker     | worker@tms.com     | worker123     |

## Troubleshooting

### Can't connect to database

```bash
# Check .env file has correct DATABASE_URL
# Test connection
pnpm db:studio
```

### Prisma errors

```bash
# Clear cache and regenerate
rm -rf node_modules/.prisma
pnpm db:generate
```

### Build errors

```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

### Port already in use

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID [process-id] /F

# Or use different port
pnpm dev --port 3001
```

## Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to remote
git push

# Create new branch
git checkout -b feature/your-feature

# Switch branches
git checkout main
```

## Environment Variables

```env
# Required
DATABASE_URL="mongodb+srv://..."
NEXTAUTH_SECRET="generate-with-openssl"
NEXTAUTH_URL="http://localhost:3000"

# Optional
REDIS_URL="redis://localhost:6379"
```

## Helpful Links

- **Localhost**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555 (after running `pnpm db:studio`)
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Next.js Docs**: https://nextjs.org/docs

## Quick Checks

### Is everything working?

```bash
# 1. Can you access the app?
curl http://localhost:3000

# 2. Is database connected?
pnpm db:studio

# 3. Any TypeScript errors?
pnpm build

# 4. Any lint errors?
pnpm lint
```

## Package Management

```bash
# Add new package
pnpm add package-name

# Add dev dependency
pnpm add -D package-name

# Remove package
pnpm remove package-name

# Update all packages
pnpm update

# Check outdated packages
pnpm outdated
```

## Performance Checks

```bash
# Analyze bundle size
pnpm build
# Check .next/analyze

# Check for unused dependencies
npx depcheck

# Audit security
pnpm audit
```

---

## 💡 Pro Tips

1. **Keep Prisma Studio open** while developing - it's a great visual DB editor
2. **Use hot reload** - Next.js will auto-reload on file changes
3. **Check browser console** for any frontend errors
4. **Use TypeScript** - it catches errors before runtime
5. **Commit often** - small commits are easier to manage
6. **Read error messages** - they usually tell you exactly what's wrong

---

**Happy Coding! 🎉**
