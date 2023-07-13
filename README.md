
![splash image](images/croppedsplash.png)
# Excuse App

## Index

- [App Description](#app-description)
- [Project Description](#project-description)
  - [Intro](#intro)
  - [Learning Goals](#learning-goals)
  - [Design Process](#design-process)
  - [Reflections](#reflections)
- [Installation](#installation)
- [Running the App](#running-the-api-locally)
- [Testing](#testing)
  - [Testing Framework](#testing-framework)
  - [Running the Tests](#running-the-tests)
  - [Test Coverage](#test-coverage)
- [Technology](#technology)
- [Credits](#credits)

## App Description

Introducing our innovative app, Excuse! Have you ever found yourself in a situation where you needed a clever excuse to gracefully bow out of an event? Look no further! Excuse is here to save the day. With the power of the OpenAI API, our app generates hilarious and quirky excuses tailored to your specific event. But that's not all! We've taken it a step further by incorporating real-time data from NASA's Eonet API. If you're feeling extra creative, Excuse can even weave in a fictional natural disaster to make your excuse truly unforgettable. Whether you need an excuse for a last-minute cancellation or a playful exit strategy, Excuse has got you covered. Say goodbye to awkward moments and hello to ingenious excuses with Excuse!

## Example Excuses

????

## Project Description

### Intro

Excuse is our final Project of [Maker's Academy](https://makers.tech/) Bootcamp. Excuse is an excuse generator mobile app for iOS and Android. This section will describe our goals for the project, our design process and reflections. 

### Learning Goals

- Create a mobile application with React Native
- Learn to use the Open AI API and NASA's EOnet API
- Practice AGILE Development and TDD

### Design Process:

Click on the image below to view our design diagrams more closely:
![diagram](images/Excuse_Excalidraw.png)

We decided on an iterative process:
- V1 (our MVP) is simply a button that generates an excuse when pressed using Open AI.
- V2 adds a text field where the user can describe a specific event they need to get out of that will be incorporated in the excuse generator.
- V3 adds a toggle that can be turned on to incorporate the latest severe weather event from NASA'S EONET

We organized our workflow using a Trello board and created vertical slice tickets for each new feature, along side styling and research tickets. Working pairs used TDD wherever possible, and we reviewed all pull requests together as a team.

### Reflections

Here we can put some reflections.

-- talk about e2e testing here

-- clear plan, simple first iteration made it 

-- power of AI

## Installation

To install the app, copy and paste these instructions into your terminal:

Note: 

```bash
# Clone the repo
git clone https://github.com/JRSkates/excuse
cd excuse

# Install packages in the frontend and api folders.
cd frontend
npm install 

cd ../api
npm install

```

## Running the app using Expo Go

To try the app on your phone, download the `Expo Go` app from the Play Store or App Store. Then input the following commands in your cloned repo:
```bash
cd frontend
npm start
# This will host a development build of the app locally. 
# To run the build on your phone, scan the on-screen QR code using Expo Go.
```

### Running the API locally

Currently the frontend of the app is pointed toward a hosted version of the API on render. __If the render server is down, or you wish to make local edits to the API,__ you will need to locally run the server and change the app to point towards it. 

In `./frontend/App.js`:

Change line 38: 

```
`https://excuse-s1se.onrender.com/excuse`,
```

to:
```
`http://[your-ip-address-here-without-brackets]:3000/excuse`,
```
Your IP address can be found  easily by running `npm start` and copying the IP address under the QR code listed after `Metro waiting on` between the double slashes and the colon.

__You will also need to use your own OpenAI API key.__ Run the following command in your root directory:
```
echo 'OPENAI_API_KEY="your-key-in-here-as-a-string"' >> ./api/.env
```
If you don't have an Open AI API key, you can [make an account here](https://platform.openai.com/) and request one. They currently come with $5.00 free credit.

### [Optional] Removing SSR warning when hosting  with Expo

If you'd like to remove the SSR Provider warning when hosting the app with Expo, navigate to `./frontend/node_modules/native-base/src/core/NativeBaseProvider.tsx` and remove the following code on line 7 (the whole line):

```
import { SSRProvider } from '@react-native-aria/utils';
```

Then, find line 97 (seen below) and remove the  `<SSRProvider></SSRProvider>` tags so that only `{children}` remains:

```
<SSRProvider>{children}</SSRProvider>
```

## Testing

### Testing Framework

We tested our project using:
- Jest with the React Native Testing Library
- Supertest for mocking HTTP requests and responses

### Running the tests

To run the tests from your cloned repo:

```bash
# To run the frontend tests:
cd frontend
jest

# To run the backend tests:
cd backend
jest
```

### Test Coverage

#### Frontend Coverage:

![frontend coverage](images/frontend_testing.png)

#### Backend Coverage

![backend coverage](images/backend_testing.png)

## Technology

[NodeJS](https://nodejs.org/en)
: A JavaScript (JS) runtime environment and package manager.

[React Native](https://reactnative.dev/)
: An  easy cross-platform framework for mobile app development.

[Native Base](https://nativebase.io/)
: a UI component library for React Native that we used for consistent design across platforms.

[Expo Go](https://expo.dev/client)
: A robust set of mobile application dev tools for React Native.

[Axios](https://axios-http.com/)
: A JS library for making HTTP requests with an easy-to-use API.

[Express](https://expressjs.com/)
: A simple web app framework for NodeJS that we used for our API server.

[Jest](https://jestjs.io/)
: A JS testing framework that we used both frontend and backend unit testing.

[OpenAI API](https://platform.openai.com/)
: An API for generative language model AI.  We generate excuses using the OpenAI API Chat 3.5 Turbo model 

[EoNet Nasa API](https://api.nasa.gov/)
: The Earth Observatory Natural Event Tracker API by NASA.

[Render](https://render.com/)
: A cloud hosting service for applications. We've hosted our backend API on Render.

## Credits

- [George Barrett](https://github.com/georgebarrett)
- [Jack Skates](https://github.com/JRSkates)
- [Mergim Berisha](https://github.com/Mergimberisha)
- [Sharmine Sokataly](https://github.com/sharmine-s)
- [Will de Montmollin](https://github.com/awdem)
- Made during [Maker's Academy](https://makers.tech/) Bootcamp
