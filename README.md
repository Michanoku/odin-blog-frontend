# Michanoku Blog Frontend

Frontend application for The Odin Project Blog project, built with **React** and **Vite**.

## Overview

The frontend provides the user interface for interacting with the Michanoku Blog API.

It includes:

* User registration and JWT-based login
* Viewing and filtering blog posts
* Reading individual posts
* Creating, editing, and deleting comments
* User profile management
* Light and dark themes
* Responsive layout

## Technology

* React
* React Router
* Vite
* JavaScript
* CSS
* Lucide React

## Project Structure

```text
├── src/
│   ├── api/            # API communication
│   ├── components/     # React components
│   ├── styles/         # Application and component stylesheets
│   ├── App.jsx         # Root application component
│   └── main.jsx        # Application entry point
└── index.html          # HTML entry point
```

## Authentication

The application uses JWTs provided by the backend API for authenticated requests.

The frontend interfaces use protected routes and display functionality based on the authenticated user's permissions.

## Development

Start the Vite development server with:

```bash
npm run dev
```

The backend API URL and other environment-specific settings are configured through Vite environment variables.
