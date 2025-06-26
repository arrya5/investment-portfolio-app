# GitHub Repository Setup Guide

Follow these steps to upload this project to GitHub and set up the demo.

## 1. Configure Git

If you haven't set up Git yet, configure your identity:

```bash
git config --global user.email "your@email.com"
git config --global user.name "Your Name"
```

## 2. Create a GitHub Repository

1. Go to https://github.com/new
2. Name the repository "investment-portfolio-app"
3. Leave other settings as default
4. Click "Create repository"

## 3. Connect Your Local Repository

Run these commands in your terminal:

```bash
# Initialize Git (already done)
# git init

# Add the GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/investment-portfolio-app.git
# Replace YOUR-USERNAME with your actual GitHub username

# Commit your changes
git commit -m "Initial commit with GitHub Pages demo setup"

# Push to GitHub
git push -u origin main
```

## 4. Deploy to GitHub Pages

To deploy the demo version:

```bash
# Install the GitHub Pages package in the client directory
cd client
npm install gh-pages --save-dev

# Deploy the app
npm run deploy
```

## 5. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Navigate to "Pages" in the sidebar
4. Select "gh-pages" branch as the source
5. Click "Save"

Your site will be published at: https://YOUR-USERNAME.github.io/investment-portfolio-app/

## 6. Update the README

Update the README.md file to include the correct demo URL:

```md
## Live Demo

Visit the [live demo](https://YOUR-USERNAME.github.io/investment-portfolio-app) to see the application in action.
```

Replace `YOUR-USERNAME` with your actual GitHub username. 