# Hostel Management System Documentation

## System Architecture and Components

The project is structured into separate modules, each dedicated to a different aspect of hostel management. Below, we outline the purpose of each folder and file in this project.

| FOLDER/FILE | DESCRIPTION |
|-------------|-------------|
| app.py/ | The main Python script managing application routes, connecting to the database, and implementing backend logic. |
| static/ | Contains all static assets, including CSS, JavaScript, and images. |
| templates/ | Houses the HTML templates for the web pages, allowing Flask to render dynamic content based on the user role. |
| database/ | Contains SQL scripts and schema definitions for the system's relational database. |

The Hostel Management System is organized into a clear folder structure that separates backend logic, static assets, and dynamic templates to facilitate efficient development and maintenance.

The main backend file, app.py, serves as the core of the application. It manages all routes (URLs) for navigating between pages in the system and connects to the SQL database to perform CRUD (Create, Read, Update, Delete) operations. Within app.py, each route is associated with specific logic, including login validation, data submission, and data retrieval. This file utilizes Flask's templating engine to render HTML templates dynamically, allowing data to flow seamlessly from the backend to the frontend and vice versa.

The static/ folder contains essential static files like CSS, JavaScript, and images that are crucial for the visual and interactive aspects of the web application. CSS files provide consistent styling across each HTML page, ensuring a cohesive look and feel, while JavaScript files enhance the user experience by adding interactivity and additional functionality. Any images used in the application for branding or interface elements are also stored here.

## Database Design

The backend uses an SQL-based relational database that organizes hostel data into multiple tables. Below is an overview of the primary tables in the database:

| Table | Purpose |
|-------|---------|
| Login | Manages user credentials and roles for secure access. |
| Attendance | Tracks attendance records of students. |
| Admin | Stores admin information and contact details. |
| Employee | Contains records of hostel employees, their contact information, and emails. |
| Meal | Lists meal plans, including breakfast, lunch, and dinner schedules. |
| Room | Contains two tables for room details, with attributes like room type, capacity, amenities, and status. |
| Student Information | Consists of two tables, one with student demographic and medical information, and the other with contacts. |
| Fee | Tracks fee payments by students, including amounts, completion status, and pending dues. |
| Visitors | Logs visitor details, including name, relationship, visit date, and check-out time. |
| Complaint | Manages complaint records filed by students, with status tracking (pending, resolved, in progress). |
| Request | Records requests submitted by students, such as leave applications or special requests. |

## HTML Template Pages Overview

The HTML templates in templates/ serve as the frontend of the system, offering an interface through which users interact with the database. Below is an overview of each HTML page and its functionality:

| Template | Description |
|----------|-------------|
| index.html | Landing page with navigation links, directing users to sections based on their role. |
| login.html | A login page where users enter credentials. Authenticates users and redirects them to their respective dashboards. |
| student_portal.html | The main dashboard for students, showing attendance, fee status, meal plans, and options to log complaints or submit requests. |
| complaints.html | A form for students to submit complaints about hostel issues. These are stored in the Complaint table for admin review and resolution tracking. |
| fee_payment.html | Displays fee payment status for students, showing pending and completed fees. |
| food.html | Lists the weekly meal schedule, including meal types and special dietary information, providing students an easy view of their meal options. |
| request.html | Allows students to submit requests, such as leave applications. Requests are stored in the Request table for administrative review. |
| visitor.html | Page for students to log visitor details, capturing information like visitor name, relationship, visit date, and check-out time in the Visitors table |

## Application Flow

1. User Login and Role Management:
   > Users access the system through the login.html page, entering credentials.
   > Based on the role (admin, student, or employee), users are directed to different sections of the application.

2. Student Portal and Requests:
   > Students use student_portal.html to navigate and access their personal information.
   > They can log complaints, track attendance, manage fees, check meal schedules, and submit requests.

3. Visitor and Complaint Management:
   > Students use visitor.html to log visitor information.
   > Complaints can be submitted via complaints.html, where they will be tracked in the database.

4. Admin and Employee Access:
   > Admins can view student data, process requests, and handle complaints, overseeing all essential hostel functions.

## FRONTEND:

The **Hostel Management System** is designed to streamline hostel administration by handling essential operations such as student management, fee payments, meal scheduling, visitor logging, and complaint handling. This system utilizes a relational SQL database for backend data management and a Flask-based web application for frontend access and user interaction. The application's main modules cover login and user roles, attendance tracking, meal plans, room assignments, complaint handling, and visitor management. 