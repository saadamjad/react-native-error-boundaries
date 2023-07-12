/** @format */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from './root';
import ErrorBoundary from 'react-native-error-boundary';
import { ErrorScreen } from '../screens';

const CustomFallback = (props: { error: Error }) => (
	<ErrorScreen errorText={props.error.toString()} />
);

const App = () => (
	<ErrorBoundary FallbackComponent={CustomFallback}>
		<RootNavigation />
	</ErrorBoundary>
);

export const Routes: React.FC = React.memo(() => {
	return (
		<NavigationContainer>
			<App />
		</NavigationContainer>
	);
});
