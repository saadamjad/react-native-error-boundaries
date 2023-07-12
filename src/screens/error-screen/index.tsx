/** @format */

import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

const ErrorScreen: React.FC<any> = React.memo(({ errorText }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.icon}> Error🐛</Text>
			<Text style={styles.text}> {errorText}</Text>
		</View>
	);
});

ErrorScreen.defaultProps = {
	errorText: 'somethingwrong',
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20,
		backgroundColor: '#ecf0f1',
		padding: 8,
		textAlign: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	icon: {
		fontSize: 48,
	},
	text: {
		marginVertical: 16,
	},
});

export default ErrorScreen;
