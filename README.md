## Excuse

```bash
cd frontend
npm install 

cd api
npm install
```

# .env API Key 

The OpenAI API key needs to be within a `.env` file in the api directory:

```bash
OPENAI_API_KEY="key-in-here-as-a-string"
```

# .env IP address

In order to connect with the backend server successfully on your mobile phone using the Expo Go app, you will need to create a `.env` file in the root of the frontend folder using this syntax:

```bash
IP="http://192.x.x.x:3000"
```