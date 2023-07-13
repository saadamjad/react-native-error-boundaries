/**
 * eslint-disable react/no-multi-comp
 *
 * @format
 */

// TODO: remove multiple JSX component
import React from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import reduxStore from './state/store/index';

import AppConfigLoader from './components/app-config-loader';

export const { store, persistor } = reduxStore();

const App = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<StatusBar
				barStyle={'dark-content'}
				translucent={false}
				backgroundColor='transparent'
			/>
			<Provider store={store}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={{ flex: 1 }}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}>
					<AppConfigLoader />
				</KeyboardAvoidingView>
			</Provider>
		</SafeAreaView>
	);
};

export default App;
