# TicketBlaster 🎟️

### Full Stack Project

Welcome to TicketBlaster, a dynamic MERN project that delves into the fusion of front-end and back-end technologies. 🚀

## Features ✨

- Efficiently manage events, including QR code ticket scanning 📋🎫
- Streamline image uploads with drag-and-drop functionality 🖼️✨
- Admin and user roles offer versatile user management 🕵️‍♂️👩‍🔧

## Setup 🛠️

While the project offers exciting prospects, there are a few steps to ensure a smooth setup, especially as some details may still require fine-tuning. 🕊️

Begin by following these steps:

Create a `config.json` file in the `ticketBlaster/server/pkg/config` directory, structuring it as follows:

```json
{
  "development": {
    "port": 5000
  },
  "mailer": { "functionality": "STILL_NOT_ACTIVE" },
  "db": {
    "username": "YOUR_MONGODB_USERNAME",
    "password": "YOUR_MONGODB_PASSWORD",
    "url": "YOUR_MONGODB_URL"
  },
  "services": {
    "proxy": { "port": 10000 },
    "events": { "port": 4999 },
    "users": { "port": 4998 },
    "storage": { "port": 4997 },
    "ecommerce": { "port": 4996 }
  },
  "security": {
    "jwt_secret": "YOUR_JWT_SECRET_KEY"
  }
}
```

Install dependencies with `npm i` to ensure a well-equipped environment.

Launch the project by opening two separate consoles: one for the front-end and another for the back-end services. This step ensures a synchronized experience.

Navigate to the client directory within the ticketBlaster folder and run `npm run dev` to start the React app.

While thee React app is running, navigate to the server folder and run `npm run startwin` to set the back-end services in motion. 🌟🧙‍♂️
