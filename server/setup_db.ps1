# Create stock database if it doesn't exist
mysql -u root -p123456789 -e "CREATE DATABASE IF NOT EXISTS stock;"

# Run the setup script
node setup_database.js 