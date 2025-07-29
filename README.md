# AI-Assistant-EVA

EVA (Enhanced Virtual Assistant) is a modern AI-powered chat interface built with Next.js, TypeScript, and Tailwind CSS. This project provides an intelligent conversational AI experience with a beautiful and responsive user interface.

## Features

- 🤖 **AI-Powered Conversations**: Intelligent chat interface with advanced AI capabilities
- 🎨 **Modern UI**: Beautiful and responsive design using Tailwind CSS and shadcn/ui components
- 📱 **Mobile Responsive**: Optimized for both desktop and mobile devices
- 🔄 **Real-time Chat**: Smooth real-time messaging experience
- 🎯 **Academic Focus**: Specialized flows for academic text summarization and university Q&A
- 🔥 **Firebase Integration**: Backend services for data persistence
- ⚡ **Next.js 14**: Built with the latest Next.js features and App Router

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Firebase
- **AI**: Google AI (Gemini) with Genkit
- **Styling**: PostCSS, Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account (for backend services)
- Google AI API key (for AI features)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/JdCloude/AI-Assistant-EVA.git
cd AI-Assistant-EVA
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your configuration:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Google AI Configuration
GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:9002](http://localhost:9002) in your browser.

## Deployment on Vercel

### 1. Connect to GitHub

1. Push your code to GitHub using the commands below
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository

### 2. Configure Environment Variables

In your Vercel project settings, add the following environment variables:

**Firebase Configuration:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

**Google AI Configuration:**
- `GOOGLE_GENAI_API_KEY`

### 3. Deploy

1. Vercel will automatically detect it's a Next.js project
2. Click "Deploy"
3. Your app will be live at `https://your-project-name.vercel.app`

### Getting API Keys

#### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings > General
4. Scroll down to "Your apps" and click the web icon
5. Register your app and copy the configuration values

#### Google AI Setup
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your environment variables

## Project Structure

```
src/
├── ai/                 # AI flows and configurations
├── app/               # Next.js app router pages
├── components/        # React components and UI library
├── hooks/            # Custom React hooks
└── lib/              # Utility functions and configurations
```

## Features

### AI Flows
- **Academic Text Summarization**: Intelligent summarization of academic content
- **University Q&A**: Specialized responses for university-related questions

### UI Components
- Modern chat interface with LunaChat component
- Responsive design with mobile optimization
- Beautiful animations and transitions
- Comprehensive UI component library

## Troubleshooting

### Common Issues

1. **Firebase not working**: Check that all Firebase environment variables are set correctly
2. **AI features disabled**: Ensure `GOOGLE_GENAI_API_KEY` is configured
3. **Build errors**: Check the console for specific error messages

### Environment Variables

If you see warnings about missing environment variables:
1. Check that all required variables are set in Vercel
2. Redeploy after adding missing variables
3. Verify API keys are valid and have proper permissions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- AI powered by [Google AI](https://ai.google.dev/)

---

Made with ❤️ by [JdCloude](https://github.com/JdCloude)
