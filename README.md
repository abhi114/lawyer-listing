# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## App Screens & Features

This app includes three main screens, accessible via bottom tabs:

- **Home Screen**: Displays a list of lawyers fetched from a remote API (Mock API). Features:
  - Pull-to-refresh: Swipe down to refresh the lawyer list.
  - Search/filter: Quickly find lawyers by name or specialization using the search bar.
- **Lawyer Profile Screen**: Shows detailed information about a selected lawyer, including their experience, languages, rating, and an option to start a chat.
- **Chat Screen**: Allows users to chat with a lawyer. Features:
  - Persist chat history: Conversations are saved using AsyncStorage and loaded per lawyer.
  - Typing indicator: Shows when the lawyer is typing a response.

## Navigation

The app uses bottom tab navigation for easy access to Home, Chat, and Profile screens.

## State Management

The app uses [Zustand](https://github.com/pmndrs/zustand) for global state management. Zustand is used to store and access user and lawyer data across screens, making it easy to manage and share state in a scalable way.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
