/** @format */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/navigation-routes';
import { Category, ErrorScreen, NewsDetails } from '../screens';
const { Screen, Navigator } = createStackNavigator();

export const RootNavigation = () => {
	return (
		<Navigator>
			<Screen
				name={ROUTES.HOME}
				component={Category}
				options={{
					headerShown: false,
				}}
			/>
			<Screen
				name={ROUTES.PRODUCT_DESCRIPTION}
				component={NewsDetails}
				options={{
					headerShown: false,
				}}
			/>
		</Navigator>
	);
};
