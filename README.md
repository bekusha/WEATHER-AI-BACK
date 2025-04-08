<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS AI Backend

This is the NestJS backend for the Weather + AI travel advisor application.
It receives weather data from the frontend, processes it, and generates AI-driven travel advice.

# 📦 Modules

AppModule: Root module that includes global config and AI module

AiModule: Handles all AI-related logic and endpoints

# 🧱 Tech Stack

NestJS

Axios (for making HTTP requests to OpenAI)

OpenAI API

ConfigModule for managing environment variables

#🚀 Getting Started

git clone https://github.com/bekusha/WEATHER-AI-BACK.git
cd backend
npm install

# Add your API key in a .env file
OPENAI_API_KEY=openai_api_key

# 🧪 Run Dev Server

npm run start:dev

# 🔐 Environment Variables

OPENAI_API_KEY=your_api_key_here

# 📁 Folder Structure

src/
├── ai/
│   ├── ai.controller.ts
│   ├── ai.service.ts
│   └── ai.module.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts

# 📫 API Endpoint

POST /ai/ai-advice

Body:

{
  "forecast": { "city": { ... }, "list": [ ... ] }
}

Response: AI-generated text with travel recommendations

✅ Author & License

Made by [Beka Jorjikia - beka.jorjikia@gmail.com]