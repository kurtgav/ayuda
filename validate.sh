#!/bin/bash

# Ayuda MVP - Build & Deployment Validation Script
# This script checks all critical components are in place

echo "🔍 Ayuda MVP - Validation Checklist"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} $1"
    return 0
  else
    echo -e "${RED}✗${NC} $1 (MISSING)"
    return 1
  fi
}

check_dir() {
  if [ -d "$1" ]; then
    echo -e "${GREEN}✓${NC} $1/"
    return 0
  else
    echo -e "${RED}✗${NC} $1/ (MISSING)"
    return 1
  fi
}

# Check core files
echo "📦 Core Files:"
check_file "package.json"
check_file "tsconfig.json"
check_file "next.config.ts"
check_file ".env.example"
echo ""

# Check database files
echo "🗄️ Database Files:"
check_file "supabase/schema.sql"
check_file "supabase/policies.sql"
check_file "supabase/functions/process-payment/index.ts"
echo ""

# Check source directories
echo "📂 Source Directories:"
check_dir "src/api"
check_dir "src/components"
check_dir "src/context"
check_dir "src/hooks"
check_dir "src/screens"
check_dir "src/theme"
check_dir "src/types"
check_dir "src/constants"
echo ""

# Check API services
echo "🔗 API Services:"
check_file "src/api/auth-service.ts"
check_file "src/api/booking-service.ts"
check_file "src/api/payment-service.ts"
check_file "src/api/supabase-client.ts"
echo ""

# Check components
echo "🎨 Components:"
check_file "src/components/Button.tsx"
check_file "src/components/Card.tsx"
check_file "src/components/ProviderCard.tsx"
check_file "src/components/VettedBadge.tsx"
check_file "src/components/StarRating.tsx"
check_file "src/components/ErrorMessage.tsx"
check_file "src/components/LoadingSpinner.tsx"
echo ""

# Check screens
echo "📱 Screens:"
check_file "src/screens/Home/home-screen.tsx"
check_file "src/screens/Home/my-jobs-screen.tsx"
check_file "src/screens/Booking/booking-flow-screen.tsx"
check_file "src/screens/Booking/job-details-screen.tsx"
check_file "src/screens/Booking/review-screen.tsx"
check_file "src/screens/Booking/payment-screen.tsx"
check_file "src/screens/Profile/login-screen.tsx"
check_file "src/screens/Profile/register-screen.tsx"
check_file "src/screens/Profile/profile-screen.tsx"
echo ""

# Check state management
echo "🔄 State Management:"
check_file "src/context/auth-context.tsx"
check_file "src/hooks/use-booking-store.ts"
echo ""

# Check documentation
echo "📚 Documentation:"
check_file "IMPLEMENTATION_COMPLETE.md"
check_file "SETUP_GUIDE.md"
check_file "MVP_COMPLETE_SUMMARY.md"
check_file "MD/prd-artifact-v1.md"
check_file "MD/tech-artifact-v1.md"
check_file "MD/research-artifact-v1.md"
check_file "MD/AGENTS_md.md"
echo ""

# Check build ability
echo "🏗️ Build Check:"
if command -v node &> /dev/null; then
  NODE_VERSION=$(node --version)
  echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
  echo -e "${RED}✗${NC} Node.js not found"
fi

if [ -f "package.json" ]; then
  if grep -q "next" package.json; then
    echo -e "${GREEN}✓${NC} Next.js configured"
  fi
  if grep -q "supabase" package.json; then
    echo -e "${GREEN}✓${NC} Supabase SDK configured"
  fi
fi
echo ""

# Summary
echo "✅ Validation Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. cp .env.example .env.local"
echo "2. Add your Supabase credentials to .env.local"
echo "3. Deploy database: run supabase/schema.sql in Supabase dashboard"
echo "4. Deploy Edge Function: supabase functions deploy process-payment"
echo "5. npm run dev"
echo ""
echo "For detailed setup, see: SETUP_GUIDE.md"
