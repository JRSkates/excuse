# Excuse

Introducing our innovative app, Excuse! Have you ever found yourself in a situation where you needed a clever excuse to gracefully bow out of an event? Look no further! Excuse is here to save the day. With the power of the OpenAI API, our app generates hilarious and quirky excuses tailored to your specific event. But that's not all! We've taken it a step further by incorporating real-time data from NASA's Eonet API. If you're feeling extra creative, Excuse can even weave in a fictional natural disaster to make your excuse truly unforgettable. Whether you need an excuse for a last-minute cancellation or a playful exit strategy, Excuse has got you covered. Say goodbye to awkward moments and hello to ingenious excuses with Excuse!

## Installation

To run the app you need to first download the dependencies using the following commands on your terminal:

```bash
cd frontend
npm install 

cd ../api
npm install
```

## Visualising the app using Expo
To test the app on your phone, download the `Expo Go` app from the Play Store or App Store. Then do a `cd frontend` and run `npm start` on your terminal after completing the above, and then scan the QR code on your phone.

## Clear warning on Expo

If you'd like to remove the SSR Provider warning when running the app on Expo, navigate to `./frontend/node_modules/native-base/src/core/NativeBaseProvider.tsx` and remove line 7 which says:

```
import { SSRProvider } from '@react-native-aria/utils';
```

and replace the following in line 97:

```
<SSRProvider>{children}</SSRProvider>
```

with simply `{children}` without the SSRProvider tags

## Using a local backend

Currently, the backend server used is a render link that has been deployed, which automatically re-deploys each time the `main` branch is updated. In order to test any edits to the backend that are on another branch you're using, you will need to edit line 38 in `App.js` and change the following:

```
`https://excuse-s1se.onrender.com/excuse`,
```

to:

```
`http://x.x.x.x:3000/excuse`,
```

replacing the x's with your local IP address. This can be found by running `npm start` and taking the IP address under the QR code listed as `Metro waiting on` between the double slashes and the colon.

You will also need to sign up for an OpenAI API key. You'll need to create a `.env` file in the api directory and use this format:

```bash
OPENAI_API_KEY="key-in-here-as-a-string"
```