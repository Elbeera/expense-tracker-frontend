# Expense Tracker Frontend

This is the frontend for an Expense Tracking application, built with **React**, **TypeScript**, and **Apollo Client**. It communicates with a GraphQL backend to support authentication, expense management, and user interactions in a responsive and modern UI.

The frontend is thoughtfully structured for maintainability, scalability, and ease of collaboration, following industry best practices in modern web development.

## Tech Stack

- **React** – Component-based UI framework
- **TypeScript** – Static typing for safer and more predictable code
- **GraphQL** – Efficient and flexible API communication
- **Apollo Client** – Handles GraphQL queries/mutations and client-side cache
- **Vite** – Lightning-fast build tool and development server
- **JWT (via cookies)** – Stateless authentication mechanism

## Features

- User authentication with JWT (login & signup)
- Protected routes using a `PrivateRoute` component
- Expense list view with expandable detail modals
- Add new expenses via a reusable form
- Modular, maintainable component architecture
- GraphQL-powered queries and mutations
- Secure and scalable frontend patterns

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/expense-tracker-frontend.git
   cd expense-tracker-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Future Improvements

- Expense categories and tagging
- Monthly/weekly summaries and insights
- User profile and settings
- Dark mode toggle
- Full test coverage (unit + E2E)

## About

This project was developed as a full stack application, with a focus on clarity, security, and modern best practices. It’s structured with scalability in mind and designed for real-world usage and team collaboration.
