# Excuse

To run the app you need to first download the dependencies using the following commands on your terminal:

```bash
cd frontend
npm install 

cd ../api
npm install
```

## .env API Key 

The OpenAI API key needs to be within a `.env` file in the api directory:

```bash
OPENAI_API_KEY="key-in-here-as-a-string"
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