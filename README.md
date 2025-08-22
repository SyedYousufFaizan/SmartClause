# SmartClause (AI powered contract analyzer)
## Overview
SmartClause is an AI-powered contract analyzer that scans uploaded agreements, identifies risky clauses, assigns a risk level (high/medium/low), and suggests improvements. It uses a React frontend with a clean UI and an Express/Node backend to process and analyze the contract text. And uses Mistral's LLM APIs under the hood
## Features
 - Supports unflattened startdard Pdfs, docx, and txt files
 - Extracts contract text and analyzes it for risky clauses.
 - Highlights clauses with low / medium / high risk levels.
 - Provides clear recommendations to make contracts safer.
 - Easily upload and analyze multiple contracts without refreshing.
 - Clean minimal React + tailwind UI

## Techstack
- React
- Tailwind
- Typescript
- NodeJS
- ExpressJS

## Getting Started
Follow these steps to set up and run the application locally



### Clone the repository
fork the repo and clone it
```sh
git clone https://github.com/your-username/SmartClause.git
cd SmartClause
```

### Navigate to the backend directory and install the dependencies
```sh
cd backend
npm install
```

### getting the api key from mistral.ai
Go to https://console.mistral.ai/home, setup an account and get an api key from the  `Workspace > api keys` section on the sidebar
Copy the api key

### setting up the .env file
in the backend directory rename the .envExample file to .env and paste the api key in the mentioned space

### Start the backend server
```sh 
node index.js
```

### Install frontend dependencies and run it locally
```sh
cd ..
cd frontend
npm install
npm run dev
```

### Contributing:
Contributions are welcome! Please open an issue or submit a pull request for any changes.
Feel free to integrate different LLMs.

## License
This project is licensed under CC by NC 4.0 license
