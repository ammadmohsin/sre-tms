# TMS Setup Script for Windows PowerShell

Write-Host "🏭 Textile Management System - Setup Script" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists
if (Test-Path .env) {
    Write-Host "✅ .env file found" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env file not found. Creating from template..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host ""
    Write-Host "📝 Please edit .env file and add your MongoDB connection string" -ForegroundColor Yellow
    Write-Host "   Then run this script again." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Get MongoDB connection string from:" -ForegroundColor Cyan
    Write-Host "   - MongoDB Atlas: https://www.mongodb.com/cloud/atlas" -ForegroundColor Cyan
    Write-Host "   - Or use local: mongodb://localhost:27017/tms" -ForegroundColor Cyan
    exit
}

# Check if DATABASE_URL is set
$envContent = Get-Content .env -Raw
if ($envContent -match "DATABASE_URL=`"mongodb") {
    Write-Host "✅ DATABASE_URL is configured" -ForegroundColor Green
} else {
    Write-Host "❌ DATABASE_URL not properly configured in .env" -ForegroundColor Red
    Write-Host "   Please add your MongoDB connection string" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "🔧 Setting up database..." -ForegroundColor Cyan

# Generate Prisma Client
Write-Host "   Generating Prisma Client..." -ForegroundColor Gray
pnpm db:generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma Client" -ForegroundColor Red
    exit
}

# Push schema
Write-Host "   Pushing schema to database..." -ForegroundColor Gray
pnpm db:push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push schema" -ForegroundColor Red
    exit
}

# Seed data
Write-Host "   Seeding demo data..." -ForegroundColor Gray
pnpm db:seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to seed data" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Run: pnpm dev" -ForegroundColor White
Write-Host "   2. Open: http://localhost:3000" -ForegroundColor White
Write-Host "   3. Login with demo credentials:" -ForegroundColor White
Write-Host ""
Write-Host "      Admin:   admin@tms.com / admin123" -ForegroundColor Yellow
Write-Host "      Manager: manager@tms.com / manager123" -ForegroundColor Yellow
Write-Host "      Worker:  worker@tms.com / worker123" -ForegroundColor Yellow
Write-Host ""
Write-Host "📚 Check GETTING_STARTED.md for more info!" -ForegroundColor Cyan
Write-Host ""
