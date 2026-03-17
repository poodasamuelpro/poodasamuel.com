#!/bin/bash
# Quick Commands for Portfolio Samuel POODA
# Usage: source quick-commands.sh

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Portfolio Samuel POODA - Quick Commands${NC}"
echo ""

# Development
alias dev='npm run dev'
alias build='npm run build'
alias start='npm start'

# Git shortcuts
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gl='git log --oneline --graph --all'

# Deployment helpers
deploy_vercel() {
    echo -e "${BLUE}📦 Building project...${NC}"
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Build successful!${NC}"
        echo -e "${BLUE}🚀 Ready for Vercel deployment${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Push to GitHub: git push origin main"
        echo "2. Or deploy with Vercel CLI: vercel --prod"
    else
        echo -e "${RED}❌ Build failed. Check errors above.${NC}"
    fi
}

push_github() {
    echo -e "${BLUE}📤 Pushing to GitHub...${NC}"
    git add .
    read -p "Commit message: " msg
    git commit -m "$msg"
    git push origin main
    echo -e "${GREEN}✅ Pushed to GitHub!${NC}"
}

check_status() {
    echo -e "${BLUE}📊 Project Status${NC}"
    echo ""
    echo "Git status:"
    git status -s
    echo ""
    echo "Last 5 commits:"
    git log --oneline -5
    echo ""
    echo "Project size:"
    du -sh .
}

# Show available commands
show_commands() {
    echo -e "${GREEN}Available commands:${NC}"
    echo ""
    echo "  dev              - Start development server"
    echo "  build            - Build for production"
    echo "  start            - Start production server"
    echo "  gs               - Git status"
    echo "  ga               - Git add all"
    echo "  gc 'message'     - Git commit"
    echo "  gp               - Git push"
    echo "  gl               - Git log"
    echo "  deploy_vercel    - Build and prepare for deployment"
    echo "  push_github      - Add, commit and push to GitHub"
    echo "  check_status     - Show project status"
    echo "  show_commands    - Show this help"
    echo ""
}

# Show commands on load
show_commands

export -f deploy_vercel push_github check_status show_commands
