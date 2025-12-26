# Employee Polls Application

A web application for internal employee use that enables collaboration and transparency through polling. Employees can create "Would You Rather" polls with two options, vote on polls created by others, and compete on a leaderboard based on their participation.

## Features

- User authentication with impersonation (dropdown selection)
- Home page with toggle between answered and unanswered polls
- Poll details page with voting and results
- Create new poll page
- Leaderboard page showing user participation
- Responsive navigation and routing
- 404 page for invalid routes

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **Build Tool:** Vite
- **Data Source:** Provided _Data.js (fake database)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm start` - Start the development server with hot reload
- `npm run dev` - Alternative command to start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm test` - Run the unit tests

## Project Structure

```
src/
├── components/          # React components
│   ├── Home.tsx        # Home page with poll listing
│   ├── Login.tsx       # User login page
│   ├── Nav.tsx         # Navigation bar
│   ├── NewQuestion.tsx # Create new poll page
│   ├── Leaderboard.tsx # Leaderboard page
│   ├── QuestionDetails.tsx # Poll details and voting
│   ├── NotFound.tsx    # 404 page
│   └── ProtectedRoute.tsx # Route protection wrapper
├── features/           # Redux slices
│   ├── authedUserSlice.ts
│   ├── questionsSlice.ts
│   └── usersSlice.ts
├── types.ts            # TypeScript type definitions
├── store.ts            # Redux store configuration
├── _Data.js            # Fake database API
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## Data Structure

The application uses a fake database provided in `_Data.js` with the following structure:

- **Users:** Object with user IDs as keys, containing user info, answers, and questions
- **Questions:** Object with question IDs as keys, containing poll data and votes

## Authentication

Users can log in by selecting their name from a dropdown. The app supports persistent login state across navigation and redirects unauthenticated users to the login page.

## Routing

- `/` - Home page (protected)
- `/login` - Login page
- `/questions/:id` - Poll details (protected)
- `/add` - Create new poll (protected)
- `/leaderboard` - Leaderboard (protected)
- `*` - 404 page

## Development Notes

- The app uses Redux for state management with async thunks for API calls
- Components are modular and reusable
- TypeScript is used for type safety
- The build is optimized with Vite for fast development
