#!/bin/bash

# This script helps initialize the GitHub repository for the Investment Portfolio App

# Initialize a new Git repository
git init

# Add all files to Git
git add .

# Create the first commit
git commit -m "Initial commit: Investment Portfolio App"

echo "Enter your GitHub username:"
read username

echo "Enter your repository name (default: investment-portfolio-app):"
read repo_name
repo_name=${repo_name:-investment-portfolio-app}

# Add GitHub remote
echo "Adding GitHub remote repository..."
git remote add origin https://github.com/$username/$repo_name.git

echo ""
echo "Repository initialized successfully!"
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub named: $repo_name"
echo "2. Push your code to GitHub with:"
echo "   git push -u origin main"
echo ""
echo "Note: Before pushing, make sure to save the ER diagram image to client/public/images/er_diagram.png" 