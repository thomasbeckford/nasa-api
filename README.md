# Southern Code Challenge

This is a web application built using React, Next.js v13, and Context API for state management. It allows users to search photos using the NASA API. The application is designed to be responsive and follows good practices of clean code and design patterns. It utilizes custom hooks for managing certain functionalities.

![nasa-api-image](https://github.com/thomasbeckford/nasa-api/assets/28713861/c84ceedf-429c-4f26-9882-c487fdbf7e6e)

## Getting Started

To run the project, follow these steps:

```
Clone the repository: git clone <repository_url>
run in your terminal: mv .env.example .env.local (remember to add your API key)
Install the dependencies: pnpm i
Start the development server: pnpm dev
```

## Environment Variables

NEXT_PUBLIC_NASA_API_KEY=""

You need to set this ENV to make the project work.

## Custom Hooks

The project utilizes custom hooks for certain functionalities. One notable custom hook is used to fetch photos from the NASA API. The hook encapsulates the logic for making API requests and handling the response.

## Testing

The project uses Cypress for testing. The tests are located in the cypress folder. To run the tests, run the following command:

```
pnpm run test
```

## Resources

- React https://reactjs.org/
- Chakra UI https://chakra-ui.com/
- Cypress https://cypress.io/
- Axios https://axios-http.com/
- Nextjs 13 app directory https://nextjs.org/
- NASA API https://api.nasa.gov/
