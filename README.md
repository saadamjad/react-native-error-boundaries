# Error Boundary

This repository contains a React Native project that demonstrates the usage of the `react-native-error-boundary` library to handle errors gracefully within your application. The error boundary component provided by this library helps prevent unhandled errors from crashing the entire application and allows you to display fallback UI or error messages to maintain a smoother user experience.

## Getting Started

To run the React Native project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm start` or `yarn start`
5. Run the app on a device or simulator: `npm run android` or `npm run ios`

## Installation

To install the `react-native-error-boundary` library in your project, use the following steps:

1. Open a terminal and navigate to your project directory.
2. Run the following command to install the library:

```shell
npm install react-native-error-boundary
```

or

```shell
yarn add react-native-error-boundary
```

## Usage

To use the `react-native-error-boundary` component in your application, follow these steps:

1. Import the necessary components from the library:

```javascript
import ErrorBoundary from 'react-native-error-boundary';
```

2. Create a custom fallback component to display an error message or fallback UI when an error occurs:

```javascript
const CustomFallback = (props: { error: Error }) => (
  <ErrorScreen errorText={props.error.toString()} />
);
```

3. Wrap the root component or any component where you want to handle errors with the `ErrorBoundary` component:

```javascript
const App = () => (
  <ErrorBoundary FallbackComponent={CustomFallback}>
    <RootNavigation />
  </ErrorBoundary>
);
```

4. In your main component, wrap the `NavigationContainer` component (or any other parent component) with the `ErrorBoundary` component:

```javascript
import { NavigationContainer } from '@react-navigation/native';

export const Routes: React.FC = React.memo(() => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
});
```

5. Customize the `CustomFallback` component as per your requirements to provide a meaningful error message or fallback UI to your users.

## Code Explanation

The provided code demonstrates the usage of the `react-native-error-boundary` library. Here is a breakdown of the code:

- The `ErrorBoundary` component is imported from the `react-native-error-boundary` library.
- A custom fallback component named `CustomFallback` is defined to display an error screen with the error message.
- The `App` component wraps the `RootNavigation` component with the `ErrorBoundary` component and provides the `CustomFallback` component as the `FallbackComponent` prop.
- The `Routes` component wraps the `App` component with the `NavigationContainer` component from `@react-navigation/native`.
- The `Routes` component is exported and can be used as the entry point of your application.

Feel free to customize and extend the provided code as per your application's requirements.