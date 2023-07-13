# Excuse

Introducing our innovative app, Excuse! Have you ever found yourself in a situation where you needed a clever excuse to gracefully bow out of an event? Look no further! Excuse is here to save the day. With the power of the OpenAI API, our app generates hilarious and quirky excuses tailored to your specific event. But that's not all! We've taken it a step further by incorporating real-time data from NASA's Eonet API. If you're feeling extra creative, Excuse can even weave in a fictional natural disaster to make your excuse truly unforgettable. Whether you need an excuse for a last-minute cancellation or a playful exit strategy, Excuse has got you covered. Say goodbye to awkward moments and hello to ingenious excuses with Excuse!

## Design Process:
Click on the image below to view our diagram more closely:
![diagram](Excuse_Excalidraw.png)

## Installation

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
To test the app on your phone, download the `Expo Go` app from the Play Store or App Store. Then:
```bash
# Navigate to  your cloned repo
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
`http://[your-ip-address-here]:3000/excuse`,
```
Your IP address can be found  easily by running `npm start` and copying the IP address under the QR code listed after `Metro waiting on` between the double slashes and the colon.

__You will also need to use your own OpenAI API key.__ 

From your root directory:
```
echo 'OPENAI_API_KEY="key-in-here-as-a-string"' >> ./api/.env
```
If you don't have an Open AI API key, you can make an account here (https://platform.openai.com/) and request one. They currently come with $5.00 free credit.
### Remove SSR warning when hosting  with Expo

If you'd like to remove the SSR Provider warning when hosting the app woth Expo, navigate to `./frontend/node_modules/native-base/src/core/NativeBaseProvider.tsx` and remove line 7 which says:

```
import { SSRProvider } from '@react-native-aria/utils';
```

and replace line 97:

```
<SSRProvider>{children}</SSRProvider>
```

with:
```
{children}
```
## Testing

We tested our project using:
- Jest with the React Native Testing Library
- Supertest for mocking HTTP requests and responses

To run the tests from your cloned repo:

```bash
# To run the frontend tests:
cd frontend
jest

# To run the backend tests:
cd backend
jest
```

## Technology

- React Native
- Native Base
- Expo
- Axios
- Express
- OpenAI
- EoNet Nasa API

## Credits

- [George Barrett](https://github.com/georgebarrett)
- [Jack Skates](https://github.com/JRSkates)
- [Mergim Berisha](https://github.com/Mergimberisha)
- [Sharmine Sokataly](https://github.com/sharmine-s)
- [Will de Montmollin](https://github.com/awdem)
- Made a part of [Maker's Academy](https://makers.tech/) Bootcamp