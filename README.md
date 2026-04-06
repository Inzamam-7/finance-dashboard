# Finance Data Processing & Access Control Backend

## 📌 Overview
This project is a backend system for a finance dashboard that manages users, financial records, and role-based access control. It provides APIs for CRUD operations, analytics, and secure access based on user roles.

---

## 🚀 Features

### 🔐 User & Role Management
- Create and manage users
- Assign roles: **Viewer, Analyst, Admin**
- Update user status (active/inactive)
- Role-based access control (RBAC)

---

### 💰 Financial Records Management
- Create, read, update, delete financial records
- Fields:
  - Amount
  - Type (income / expense)
  - Category
  - Date
  - Notes
- Filtering:
  - By type
  - By category
  - By date range

---

### 📊 Dashboard APIs
- Total income
- Total expenses
- Net balance
- Category-wise totals
- Monthly trends

---

### 🔒 Access Control
| Role     | Permissions |
|----------|------------|
| Viewer   | View only |
| Analyst  | View + analytics |
| Admin    | Full access |

---

### ⚙️ Error Handling & Validation
- Centralized error handling
- Custom `AppError` class
- Input validation in service layer
- Consistent API responses

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cookie-based auth

---

## 📁 Project Structure
