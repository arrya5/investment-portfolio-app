# This script helps initialize the GitHub repository for the Investment Portfolio App

# Initialize a new Git repository
git init

# Add all files to Git
git add .

# Create the first commit
git commit -m "Initial commit: Investment Portfolio App"

Write-Host "Enter your GitHub username:" -ForegroundColor Cyan
$username = Read-Host

Write-Host "Enter your repository name (default: investment-portfolio-app):" -ForegroundColor Cyan
$repo_name = Read-Host
if ([string]::IsNullOrEmpty($repo_name)) {
    $repo_name = "investment-portfolio-app"
}

# Add GitHub remote
Write-Host "Adding GitHub remote repository..." -ForegroundColor Yellow
git remote add origin "https://github.com/$username/$repo_name.git"

Write-Host "`nRepository initialized successfully!" -ForegroundColor Green
Write-Host "`nNext steps:"
Write-Host "1. Create a new repository on GitHub named: $repo_name"
Write-Host "2. Push your code to GitHub with:"
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host "`nNote: Before pushing, make sure to save the ER diagram image to client/public/images/er_diagram.png" -ForegroundColor Magenta 