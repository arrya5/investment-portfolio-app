# Entity Relationship Diagram

## Database Structure

The ER diagram illustrates the database structure of the Investment Portfolio Application, showcasing the relationships between various entities:

1. **Company Profile**: Central entity with information about listed companies
   - Connected to technical signals, fundamental reports, dividend history
   - Has attributes like market cap, paid-up capital, sector information

2. **User**: Represents application users
   - Manages holdings and watchlists
   - Has attributes like username, email, phone

3. **Fundamental Report**: Contains financial metrics
   - Connected to transactions
   - Includes metrics like P/E ratio, ROE, EPS

4. **News**: Contains market news
   - Related to specific companies and sectors
   - Includes source attribution and publication date

5. **Holdings**: User's investment positions
   - Connected to specific company symbols
   - Tracks quantity and value

6. **Watchlist**: User's monitored investments
   - Contains symbols of interest

## Adding the ER Diagram to Your Project

1. Save the ER diagram image from the chat to your computer
2. Name the file `er_diagram.png`
3. Place it in the `client/public/images/` directory
4. The image will now be properly referenced in the README.md file

## Database Relationships

The diagram highlights several key relationships:
- Companies have technical signals and fundamental reports
- Users manage multiple holdings and watchlists
- News items belong to companies and sectors
- Fundamental reports track transactions
- Users can perform actions on fundamental reports 